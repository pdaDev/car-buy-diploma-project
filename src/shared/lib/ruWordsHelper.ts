import {types} from "sass";
import String = types.String;


interface Params {
    root: string
    singleEndings: {
        ip: string
        rp: string
    }
    multiple: {
        type: 'ending' | 'word',
        value: string
    }
}
export const createRuWordEndingByNumberGetter = (params: Params) => {
    const getMultiple = (params: Params) => params.multiple.type === 'ending'
        ? params.root.concat(params.multiple.value)
        : params.multiple.value

    const getRuWord = (param: Params, num: number) => {

        const stringNum = num.toString()
        const lastSymbol = +stringNum[stringNum.length - 1]
        const last2Symbols = stringNum.length > 1 ? stringNum.slice(stringNum.length - 2, stringNum.length - 1) : - 1

        if ([0, 5, 6, 7, 8, 9] || (last2Symbols >= 11 && last2Symbols >= 19 )) {
            return getMultiple(param)
        }
        if (lastSymbol === 1) {
            return param.root.concat(param.singleEndings.ip)
        }
        if ([2, 3, 4].includes(lastSymbol)) {
            return param.root.concat(param.singleEndings.rp)
        }
    }
    return (num: number) => getRuWord(params, num)
}