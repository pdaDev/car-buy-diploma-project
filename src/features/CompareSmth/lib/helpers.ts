// @ts-nocheck
import {isObject} from "shared";

const flatObjectLevel = (obj: object, level: number, maxLevel?: number) => {
    return Object.keys(obj)
        .reduce((acc, key) => {
            if (isObject(obj[key]) && (maxLevel ? level < maxLevel : true)) {
                acc = {...acc, ...flatObjectLevel(obj[key], level + 1, maxLevel)}
            } else {
                acc[key] = obj[key]
            }
            return acc
        }, {})
}

export const flatObject = (obj: object, level?: number) => {
    return flatObjectLevel(obj, 0, level)
}
