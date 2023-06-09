import React, {FC, ReactNode} from 'react'

import s from './List.module.scss'
import {SpaceLevel} from "../../types";
import {Stack, Container, Grid} from "../Layout";
import {Label} from "../Label/Label";

import {useTranslation} from "react-i18next";
import {Loader} from "../Loader/Loader";



interface IProps {
    loading: boolean
    fetching?: boolean
    renderEl: (...args: any[]) => ReactNode
    data: any[] | null | undefined
    cols: number
    rows?: number
    countOfLoadingRows?: number
    gap?: SpaceLevel
    emptyKey: string
}

export const DataGrid: FC<IProps> = ({
                                         data,
                                         renderEl,
                                         loading,
                                         cols,
                                         rows,
                                         fetching,
                                         countOfLoadingRows = 3,
                                         emptyKey,
                                         gap = 4
                                     }) => {

    const {t} = useTranslation()

    return <Grid rows={rows} cols={cols} container gap={gap} size={'container'}>
        {!loading && data && data.length > 0 && data.map(el => renderEl(el))}
        {loading && [...new Array(countOfLoadingRows * cols)].map(_ => renderEl(null, loading))}
        {!loading && (!data || (data && data.length === 0)) &&
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
        {fetching && !loading && <Container contentAlign={'center'}>
            <Loader type={'circle'} size={'medium'}/>
        </Container>}
    </Grid>
}
