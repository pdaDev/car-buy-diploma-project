import {useNavigate} from "react-router-dom";
import {appPathTree, keyParam, pathParam, routeTree} from "../model/routeTree";
import {FC} from "react";

type TreeWithoutPathFields<T extends object> = { [P in Exclude<keyof T, typeof pathParam>]: P extends typeof keyParam ? (key?: string | number) => T[P] extends object ? TreeWithoutPathFields<T[P]> : T[P] : T[P] extends object ? TreeWithoutPathFields<T[P]> : T[P] }
type Callback = (tree: TreeWithoutPathFields<typeof routeTree>, args?: Array<string | number>) => any


export const useAppNavigate = (): (callback: Callback, query?: object | string) => void => {
    const navigate = useNavigate()
    return (callback, query) => {
        let path = callback(appPathTree as any).getKey()
        path = query ?

            typeof query === 'string'
                ? `${path}?${query}`
                : `${path}?${
                    Object.keys(query).map(key => `${key}=${query[key as keyof typeof query]}`).join('&')
                }` : path
        console.log(path)
        navigate(path)
    }
}

