import React, {FC, ReactNode} from 'react'

import s from './List.module.scss'
import {SpaceLevel} from "../../types";
import {Stack, Container} from "../Layout";
import { Label } from "../Label/Label";
import {Simulate} from "react-dom/test-utils";
import load = Simulate.load;
import {useTranslation} from "react-i18next";
import {Loader} from "../Loader/Loader";


interface IProps<T extends object> {
    loading: boolean
    fetching?: boolean
    renderListEl: (data: T, loading: boolean, index: number, isLastElement: boolean) => ReactNode
    data: T[] | null | undefined
    spacing?: SpaceLevel | string
    countOfLoadingEls?: number
    emptyKey: string
}
export function List<T extends object>({
    data,
    renderListEl,
    loading,
    spacing= 4,
    fetching,
    countOfLoadingEls = 5,
    emptyKey
}: IProps<T>) {

    const { t } = useTranslation()

    const dataLoading = loading || fetching

    return <Stack spacing={spacing} size={'width'} vAlign={'start'}>
        { !loading && data && data.length > 0 && data.map((el, i) => renderListEl(el, false, i, i === data.length - 1)) }
        { loading && [...new Array(countOfLoadingEls)].map((_, index) => renderListEl(null as any, loading, index, false))}
        { !loading && (!data || (data && data.length === 0)) &&
            <Container mt={4} mb={4}>
                <Stack size={'container'} hAlign={'center'}>
                    <Label label={t(emptyKey)}
                           level={2}
                           weight={'medium'}
                           type={'secondary'}
                    />
                </Stack>
            </Container>
        }
        { fetching && !loading && <Container contentAlign={'center'}>
            <Loader type={'circle'} size={'medium'} />
        </Container> }
    </Stack>
}
