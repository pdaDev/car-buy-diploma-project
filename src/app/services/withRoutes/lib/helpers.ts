import {keyParam, pathParam} from "../model/routeTree";
import {getObjectKeys} from "shared";

type ObjectWithGetKey = { getKey: () => string }
type Tree<T extends object> = {[P in Exclude<keyof T,typeof pathParam>]: P extends typeof keyParam ? (key?: string | number) => T[P] extends object ? ObjectWithGetKey & Tree<T[P]> : ObjectWithGetKey :T[P] extends object ? ObjectWithGetKey & Tree<T[P]> : ObjectWithGetKey }

export function getRoutePath<T extends Readonly<{ [key: string]: object & { [pathParam]?: string } | null; }>>(tree: T, path: string) {

    function concatPath(key: string | number) {
        return `${path}/${key}`
    }

    return  Object.keys(tree).reduce<Tree<T>>((acc, key) => {
        const isKey = key === keyParam
        let truePath = tree[key as keyof T]
            // @ts-ignore
            ? getObjectKeys(tree[key as keyof T]).includes(pathParam) ? tree[key][pathParam] as string : key
            : key

        truePath = isKey ? `:${truePath}` : truePath
        const params = (p: string | number) => typeof tree[key as keyof T] === 'object' && tree[key as keyof T] !== null
            ? getRoutePath(tree[key as keyof T] as any, concatPath(p))
            : {}

        if (isKey) {
            acc[key as keyof Tree<T>] = ((k?: string | number) => ({
                getKey: () => concatPath(k || truePath),
                ...params(k || truePath),
            })) as any
        } else {
            acc[key as keyof Tree<T>] = {
                getKey: () => concatPath(truePath),
                ...params(truePath),
            } as any
        }
        return acc
    }, {} as any)
}