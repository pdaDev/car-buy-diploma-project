import React, {FC, useMemo, useState} from "react";
import {withPopup} from "../../../../app/services/withPopupProvider/lib/hocs";
import {IBaseModelProps, IComparePayload} from "../../../../app/services/withPopupProvider/namespace";
import {
    Button,
    Card,
    Container, getCarName, getTimeAccordingNow, getTranslationIndex,
    getTranslationIndexCreator, getYear,
    Label,
    Slider,
    Stack, Table,
    useMultiLanguageHandbooks, useOpenStatus
} from "../../../../shared";
import s from './CompareResultsModals.module.scss'
import {useTranslation} from "react-i18next";
import {CompareElCard} from "./CompareElCard";
import * as NS from './../../namespace'
import {AddRemoveToFavourites, useAdvertisementsFavourites} from "../../../OperateWithAdvertisementFavourites";
import {useAppNavigate, useAppSelector} from "../../../../app/services";
import {selectors as userSelectors} from "../../../../entities/User";
import {characteristicsForCompare} from "../../lib/constants";
import {CompareBestCard} from "./CompareBestCard";
import {useStartChat} from "../../../../entities/Chat";

type Props = IBaseModelProps & IComparePayload

export const Modal: FC<Props> = ({onClose, currentKey, data, marks, type, total}) => {

    const [isFullCompareDataVisible, , toggleFullCompareDataVisible] = useOpenStatus(false)
    const getIndex = getTranslationIndexCreator('compare.results')
    const maxBall = Math.max(...total)
    const best = total.map((v, i) => v === maxBall ? i : null).filter(v => v !== null) as number[]
    const bestVariants = data.filter((_, i) => best.includes(i))
    const bestMarks = total.filter((_, i) => best.includes(i))
    const isOneBest = bestMarks.length === 1

    const {t} = useTranslation()

    const tableData = useMemo(() => {
        return marks.map((m, i) => m.reduce<object>((acc, x, index) => {
            // @ts-ignore
            acc[index + 1] = x
            return acc
        }, {
            criteria: t(`car.props.${characteristicsForCompare[i].key}.title`).split(',')[0]
        }))
    }, [marks, characteristicsForCompare])

    const tableHeaders = useMemo(() => {
        const headers = [{id: 'criteria', accessor: 'criteria', header: t('compare.criteria')}]

        total.forEach((_, i) => {
            const num = (i + 1).toString()
            headers.push({
                id: num,
                accessor: num,
                header: t("compare.mark") + '-' + num
            })
        })
        return headers
    }, [characteristicsForCompare, total])


    return <Container max_w={'800px'} min_h={'100%'}>
        <div className={s.card}>
            <Stack spacing={4} vAlign={'start'} hAlign={'start'} size={'container'}>
                <Label label={t(getIndex('label'))} level={2} size={6} weight={'medium'}/>
                <Container contentAlign={'center'}>
                    <Slider data={data}
                            spacing={16}
                            countVisibleItems={3}
                            renderEl={(data: NS.IServerCompareItem, loadingStatus, index) =>
                                <CompareElCard
                                    mark={total[index!]}
                                    data={data}
                                    type={type}
                                />
                            }
                    />
                </Container>
               <Stack spacing={3} size={'width'} hAlign={'center'}>
                   <Button type={'underline'}
                           onClick={toggleFullCompareDataVisible}
                           label={t(getIndex('show_full')) as string}
                   />
                   {isFullCompareDataVisible &&
                       <Table data={tableData}
                              withHorizontalSeparator
                              withVerticalSeparator
                              columns={tableHeaders as any}

                       />}
               </Stack>
                <Stack size={'width'} hAlign={'start'}>
                    <Label label={t(getIndex(isOneBest ? 'best' : 'best_few'))}
                           level={3}
                           size={5}
                           weight={'medium'}
                           width={'100%'}
                           align={'start'}
                    />
                    <Container contentAlign={'center'} size={'container'}>
                        <Slider data={bestVariants}
                                countVisibleItems={2}
                                spacing={16}
                                renderEl={(data: NS.IServerCompareItem, loadingStatus, index) =>
                                    <CompareBestCard
                                        total={bestMarks[index!]}
                                        data={data}
                                    />
                                }
                        />
                    </Container>
                </Stack>
            </Stack>

        </div>
    </Container>
}


export const CompareResultsModal = withPopup('compare')(Modal)