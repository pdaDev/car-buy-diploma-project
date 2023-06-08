import {FC, useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {useAppDispatch, useAppNavigate, useAppSelector} from "../../../app/services";
import {cleanCompareData, getCompareList, NS, selectors, setCompareLoadingStatus} from "../../../features/CompareSmth";
import {
    Button,
    Checkbox,
    Container,
    createMultiLanguageOptions,
    Label,
    Loader,
    Stack,
    Switcher,
    useTabTile
} from "../../../shared";
import {useTranslation} from "react-i18next";
import {CompareBlock} from "../../../widgets/CompareBlock";
import {MotivationBlock} from "../../../shared/ui/MotivationBlock/MotivationBlock";
import {flatObject} from "../../../features/CompareSmth/lib/helpers";
import {openModal} from "../../../app/services/withPopupProvider";
import {CompareResultsModal} from "../../../features/CompareSmth/ui/CompareResultsModal/CompareResultsModal";
import {characteristicsForCompare} from "../../../features/CompareSmth/lib/constants";
import {useAuthorize} from "../../../entities/User/lib/hooks";

export const Compare: FC = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const compareType: NS.CompareType = searchParams.get('type') as NS.CompareType || 'ad'
    const [params] = useSearchParams()
    const equipments = params.toString().replace('type=model', '')
    const setCompareType = (type: NS.CompareType) => {
        setSearchParams({type})
    }
    const {data, loading} = useAppSelector(selectors.selectCompareData)
    let list = data || []
    useTabTile('Сравнить')


    const d = useAppDispatch()
    const {authStatus} = useAuthorize()


    useEffect(() => {
        d(getCompareList({type: compareType as unknown as NS.CompareType, equipments}))
    }, [d, getCompareList, compareType, authStatus, equipments])

    useEffect(() => {
        return () => {
            d(cleanCompareData())
        }
    }, [])

    useEffect(() => {
        d(setCompareLoadingStatus(true))
    }, [d, compareType])


    const {t} = useTranslation()
    const compareTypeOptions = createMultiLanguageOptions(['ad', 'model'], t, 'compare.type')
    const n = useAppNavigate()
    const goToSearch = () => n(p => p.search)
    const motivationMessage = t(`motivate.compare.empty.${compareType}.message`)
    const motivationButtonLabel = t(`motivate.compare.empty.${compareType}.button`)
    const [showDifferences, setShowDifferences] = useState<boolean>(false)


    const getValuesForCompare = (key: string, data: object[], accessor?: NS.FieldAccessor) => {
        return data.map(obj => +(accessor ? accessor(obj[key as keyof typeof obj]) : obj[key as keyof typeof obj]))
    }

    const rangesCompare: NS.CompareOperationFunction<NS.CompareRangesConfig[]> = (key, data, config, accessor) => {
        return getValuesForCompare(key, data, accessor).map(v => config ? config.find(c => c.min < v && c.max >= v)?.mark || 100 : 100)
    }

    const pointsCompare: NS.CompareOperationFunction<NS.ComparePointsConfig[]> = (key, data, config, accessor) => {
        return getValuesForCompare(key, data, accessor).map(v => {
            if (config) {
                const r = (config).filter(c => {
                        if (Array.isArray(c.value)) {
                            return c.value.includes(v)
                        } else {
                            return c.value === v
                        }
                    }
                )
                if (r.length > 0) {
                    return r[0].mark
                } else {
                    return 100
                }
            }
            return 100
        })
    }

    const proposional_compare_max: NS.CompareOperationFunction = (key, data, config, accessor) => {
        const values = data.map(obj => +(accessor ? accessor(obj[key as keyof typeof obj]) : obj[key as keyof typeof obj]))
        const max = Math.max(...values)
        return values.map(v => Math.ceil(v / max * 100))
    }


    const proposional_compare_min: NS.CompareOperationFunction = (key, data, config, accessor) => {
        const values = data.map(obj => +(accessor ? accessor(obj[key as keyof typeof obj]) : obj[key as keyof typeof obj]))
        const min = Math.min(...values)
        const max = Math.max(...values)
        return values.map(v => (v - min) / (max - min)).map(q => ((1 - q) * 100))
    }

    const getOperationByName = (name: NS.CompareOperation, key: string, config: NS.CompareConfig | undefined, accessor: NS.FieldAccessor | undefined, list: any[]) => {
        switch (name) {
            case "dispersed_max":
                return proposional_compare_max(key, list, config, accessor)
            case 'dispersed_min':
                return proposional_compare_min(key, list, config, accessor)
            case "points":
                return pointsCompare(key, list, config as NS.ComparePointsConfig[], accessor)
            case "ranges":
                return rangesCompare(key, list, config as NS.CompareRangesConfig[], accessor)
        }
    }


    const compare = () => {
        if (list.length > 1) {
            const flattedObjects = list.map(obj => flatObject(obj, 2))
            const marks = characteristicsForCompare.map(cfc => {
                return typeof cfc.operation === 'function'
                    // @ts-ignore
                    ? cfc.operation(cfc.key, flattedObjects, cfc.compareConfig, cfc.accessor)
                    : getOperationByName(cfc.operation, cfc.key, cfc.compareConfig, cfc.accessor, flattedObjects)
            })
            const sumWeight = characteristicsForCompare.reduce((acc, cfc) => acc + cfc.weight, 0)
            const total = list.map((_, index) =>
                marks.reduce((acc, m, i) =>
                        Math.round(acc + m[index] * (characteristicsForCompare[i].weight / sumWeight)),
                    0))

            d(openModal({
                key: "compare", payload: {
                    data: list,
                    marks,
                    total,
                    type: compareType
                }
            }))
        }
    }

    return <Container max_w={'1200px'}>
        <Stack spacing={4} vAlign={'start'} size={'container'}>
            <Stack direction={'row'} spacing={3} hAlign={'start'} vAlign={'center'}>
                <Label label={t("compare.title")} level={1} weight={'medium'}/>
                { authStatus &&   <Switcher options={compareTypeOptions}
                                            activeOptions={compareType as any}
                                            onChange={setCompareType}/> }
                {list.length > 1 &&
                    <><Checkbox checked={showDifferences}
                                onChange={setShowDifferences}
                                title={t("compare.show_different")}
                    />
                    {
                        list.length > 1 && compareType === 'ad' && <Button type={'primary'}
                                                                           label={t("advertisement.compare") as string}
                                                                           onClick={compare}
                        />
                    }
                    </>
                }
            </Stack>
            {loading
                ? <Container contentAlign={'center'} min_h={'100%'}>
                    <Loader type={'circle'} size={'medium'}/>
                </Container>
                : list.length > 0
                    ? <CompareBlock data={list}
                                    loading={loading}
                                    showDifferences={showDifferences}/>
                    : <Stack size={'container'}
                             hAlign={'center'}>
                        <MotivationBlock handleAction={goToSearch}
                                         message={motivationMessage}
                                         buttonLabel={motivationButtonLabel}/>
                    </Stack>
            }

        </Stack>
        <CompareResultsModal/>
    </Container>
}