// @ts-nocheck

import * as NS from '../namespace'
import {STEPS} from "widgets/TestQuestinsBlock/lib/constants";
import {isObject} from "shared";

export const getData = (data: NS.TestData) => {
    const total = {}
    Object.keys(data).forEach(key => {
        const el = data[key as keyof NS.TestData]
        if (Array.isArray(el)) {
            (el as string[]).forEach(code => {
                const step = STEPS.find(step => step.code === key)!
                const stepElement = step.elements.find(elem => elem.code === code)!
                Object.keys(stepElement.recommendations).forEach(k => {
                    const recommendation = stepElement.recommendations[k]
                    const isMaxMin = isObject(recommendation) && Object.keys(recommendation).every(q => ['min', 'max'].includes(q))
                    const d = isMaxMin ? {

                    } : {}
                    if (!total[k]) {
                        total[k] = {
                        }
                    } else {

                    }
                })
            })
        }
    })
    return total
}