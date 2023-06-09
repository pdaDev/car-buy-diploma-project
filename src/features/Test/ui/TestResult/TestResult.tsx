import {FC, useMemo} from "react";
import * as NS from '../../namespace'
import {
    Box, Button,
    Container, createOptions, formatNumber,
    getCarQuery,
    getObjectKeys,
    getTranslationIndexCreator,
    Grid,
    ICarNameWithId, IOption,
    Label,
    Stack, useMultiLanguageHandbooks
} from "../../../../shared";

import {DESIRES, MIN_MAX_CRITERIA, MULTIPLE_VALUES_CRITERIA} from "../../namespace";
import {useGetTestDataQuery} from "../../api";
import {CarCard} from "../CarCard/CarCard";
import {selectBrends, selectHandbooks, useAppNavigate, useAppSelector} from "../../../../app/services";
import {useTranslation} from "react-i18next";
import {useTestResults} from "../../lib/hooks";
import {useAuthorize} from "../../../../entities/User/lib/hooks";

interface IProps {
    data: NS.TestData
    steps: NS.Step[]
}

export const TestResult: FC<IProps> = ({data, steps}) => {

    const results = useMemo(() => {
        const getType = (key: NS.AllCriteria): NS.CriteriaType => {
            if (MIN_MAX_CRITERIA.includes(key as NS.MinMaxCriteria)) {
                return 'min_max'
            }
            if (MULTIPLE_VALUES_CRITERIA.includes(key as NS.MultipleValueCriteria)) {
                return 'mutliple'
            }
            return 'single'
        }

        const getFewValuesArray = (value: string | number, count: number) => {
            return new Array(count).fill(value)
        }

        const makeMakeLibrary = (array: (string | number)[]) => {
            const lib = array.reduce<any>((acc, v) => {
                acc[v] = (acc[v] || 0) + 1
                return acc
            }, {})
            // @ts-ignore
            return getObjectKeys(lib).sort((a: string, b: string) => lib[b] - lib[a])
        }



        const summedCriteria = getObjectKeys(data).reduce<any>((acc, key) => {
            const isArrayValueType = Array.isArray(data[key])

            const currentStep = steps.find(step => step.code === key)!

            currentStep.elements
                .filter(el => {
                    if (isArrayValueType) {
                        return (data[key] as string[]).includes(el.code)
                    } else {
                        return data[key] === el.code
                    }
                })
                .forEach(el => {
                    const rec = el.recommendations
                    const weight = el.weight || currentStep.weight
                    getObjectKeys(rec).forEach(k => {
                        if (!Object.keys(acc).includes(k)) {
                            if (getType(k as any) === 'min_max') {
                                acc[k] = {
                                    min: getFewValuesArray((rec[k] as NS.MinMax).min, weight),
                                    max: getFewValuesArray((rec[k] as NS.MinMax).max, weight),
                                }
                            } else {
                                acc[k] = Array.isArray(rec[k])
                                    ? (rec[k] as any[]).map(x => getFewValuesArray(x, weight)).flat()
                                    : getFewValuesArray(rec[k] as string | number, weight)
                            }
                        } else {
                            if (getType(k as any) === 'min_max') {
                                acc[k] = {
                                    min: [...acc[k].min, ...getFewValuesArray((rec[k] as NS.MinMax).min, weight)],
                                    max: [...acc[k].max, ...getFewValuesArray((rec[k] as NS.MinMax).max, weight)],
                                }
                            } else {
                                acc[k] = Array.isArray(rec[k])
                                    ? [...acc[k], ...(rec[k] as any[]).map(x => getFewValuesArray(x, weight)).flat()]
                                    : [...acc[k], ...getFewValuesArray(rec[k] as string | number, weight)]
                            }
                        }
                    })
                })
            return acc
        }, {})
        console.log(JSON.stringify(summedCriteria))
        getObjectKeys(summedCriteria).forEach(key => {
            const type = getType(key as any)
            if (type === 'min_max') {
                summedCriteria[key as any].min = Math.round(summedCriteria[key as any].min.reduce((sum: number, v: number) => sum + v, 0) / summedCriteria[key].min.length)
                summedCriteria[key as any].max = Math.round(summedCriteria[key as any].max.reduce((sum: number, v: number) => sum + v, 0) / summedCriteria[key].max.length)
            } else if (type === 'mutliple') {
                summedCriteria[key] = makeMakeLibrary(summedCriteria[key]).slice(0, 3)
            } else {
                if (typeof summedCriteria[key as any][0] === 'number') {
                    summedCriteria[key as any] = Math.round(summedCriteria[key as any].reduce((sum: number, v: number) => sum + v, 0) / summedCriteria[key].length)
                } else {
                    summedCriteria[key] = makeMakeLibrary(summedCriteria[key])[0]
                }
            }
        })
        return summedCriteria
    }, [data, steps])

    const {data: testDataCars} = useGetTestDataQuery(results, {skip: !results})
    const testCarsList = testDataCars || []
    const brends = useAppSelector(selectBrends)
    const {carBodyTypes, carDrive, engineTypes} = useAppSelector(selectHandbooks)

    const n = useAppNavigate()
    const goToAdsSearch = (car: ICarNameWithId) => n(p => p.search, getCarQuery(car))
    const {t} = useTranslation()
    const getIndex = getTranslationIndexCreator('test.result')

    const runTestAgain = () => n(p => p.test)

    const {saveTestResults} = useTestResults()
    const saveTest = async () => {
        await saveTestResults(data as any)
    }
    const {getHandbookItemName, getHandbookOptions} = useMultiLanguageHandbooks()

    const optionsStorage: Partial<Record<NS.AllCriteria, IOption[]>> = {
        brend: createOptions(brends, 'brend_id', "name"),
        drive: getHandbookOptions(carDrive),
        car_body_type: getHandbookOptions(carBodyTypes),
    }

    const getRecLabelByKey = (key: NS.AllCriteria) => {
        const data = results
        if (key === 'engine') {
            return getHandbookItemName(engineTypes.find(t => t.code === data[key]))
        }
        if (key === 'desire') {
            return data[key].map((d: string) => t(`test.steps.desires.elements.${d}.title`)).join(', ')
        }
        if (MIN_MAX_CRITERIA.includes(key as any)) {
            return `${formatNumber(data[key].min)} ... ${formatNumber(data[key].max)}`
        }
        if (MULTIPLE_VALUES_CRITERIA.includes(key as any)) {
            return data[key].map((c: string) => optionsStorage[key] !== undefined ? (optionsStorage[key]?.find(h => h.value == c)?.label || "NONE") : c).join(', ')
        }
        return data[key]
    }

    const isEmptyList = testCarsList.length === 0
    return <Stack size={'width'} hAlign={'center'}>
        <Container max_w={'900px'}>
            <Stack size={'content'} spacing={4}>
                <Stack direction={'row'} spacing={4}>
                    <Label label={t(getIndex('label'))} weight={'medium'} level={1}/>
                    <Stack direction={'row'} spacing={3}>
                        {!isEmptyList && <Button type={'primary'}
                                                 label={t(getIndex('save')) as string}
                                                 onClick={saveTest}
                        />}
                        <Button type={'secondary'}
                                onClick={runTestAgain}
                                label={t(getIndex('run_test_again')) as string}
                        />
                    </Stack>
                </Stack>
                <Label label={t(getIndex('recommendations.title'))} level={2} weight={'medium'}/>
                <Grid container cols={2} gap={4}>
                    {getObjectKeys(results).map(key => {


                        return <>
                            <Stack direction={'row'} spacing={3} size={'width'}>
                                <Label label={t(`test.result.recommendations.${key as string}`)}
                                       weight={'regular'}
                                       level={4}
                                       type={'secondary'}/>
                                <Label label={getRecLabelByKey(key as any)}
                                       weight={'medium'}
                                       level={4}
                                />
                            </Stack>
                        </>
                    })}
                </Grid>
                {
                    isEmptyList &&
                    <Label label={t(getIndex('empty_list'))} type={'secondary'} weight={'medium'} level={2}/>
                }

                <Grid container cols={3} gap={4}>
                    {testCarsList.map(car => <CarCard data={car}
                                                      onClick={() => goToAdsSearch(car.name)}/>
                    )}
                </Grid>

            </Stack>
        </Container>
    </Stack>
}