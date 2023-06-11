import * as NS from "features/Test/namespace";

type ELement = NS.Step['elements'][0]

export function getStepElementsFromArray(array: string[], recomendationKey: NS.AllCriteria): ELement[] {
    return array.map(x => ({
        code: x,
        recommendations: {
            [recomendationKey]: x
        }
    }))
}

export function getStepElementsFromEntities<T extends { name?: string } |{  ru_name?: string, eng_name?: string | null }>(array: T[],codeKey: keyof T, recommendationKey: NS.AllCriteria, imageCode?: keyof T): ELement[] {
    return array.map(x => ({
        code: x[codeKey]?.toString() as string,
        recommendations: {
            [recommendationKey]: x[codeKey]
        },
        // @ts-ignore
        ru_name: x.ru_name || x.name,
        // @ts-ignore
        eng_name: x.eng_name || x.name,
        image: imageCode ? x[imageCode] as string : undefined
    }))
}