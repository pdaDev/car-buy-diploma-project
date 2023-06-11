import React, {FC, ReactNode} from 'react'

import * as NS from '../../namespace'
import {Box, ColorMark, Container, FormMode, Label, Stack, useMultiLanguageHandbooks} from "shared";
import {useTranslation} from "react-i18next";
import s from './AdvertisementCarPropsBlock.module.scss'
import {CarPropLine} from "../../../Car/ui/CarPropLine/CarPropLine";
import {CarPropWithInfo} from "../../../Car/ui/CarPropWithInfo/CarPropWithInfo";

interface IProps {

    data: Pick<NS.IServerAdvertisement, 'rate' | 'color' | 'mileage' | 'date_of_production'> & NS.IServerCarCharacteristic | null
    buttonsBlock?: ReactNode
    mode: FormMode
    loading: boolean

}

export const AdvertisementCarPropsBlock: FC<IProps> = ({
                                                           mode,
                                                           loading,
                                                           data, buttonsBlock
                                                       }) => {
    const {t} = useTranslation()

    const {getHandbookItemName} = useMultiLanguageHandbooks()
    const yearOfProduction = data ? new Date(data?.date_of_production).getFullYear() : 0
    const engineData = `${data?.engine?.volume}${t("metrics.liter")} ${getHandbookItemName(data?.engine?.fuel)}`
    return <div className={s.wrapper}>
        <Stack vAlign={'start'} spacing={3}>
            {data?.rate && <Stack direction={'row'} vAlign={'center'} hAlign={'start'} spacing={3}>
                <Box figure={'circle'}
                     measure={'px'}
                     background={"primary"}
                     w={36}>
                    <Container contentAlign={'center'} pb={0}>
                        <Label label={data?.rate} weight={'regular'} color={'fnt-black'}
                               size={'12px'} level={6}/>
                    </Container>
                </Box>
                <Label label={t("advertisement.rate")} weight={'regular'} level={3}/>
            </Stack>}
            <CarPropLine title={t('car.date_of_production')} value={yearOfProduction} code={'date_of_production'} loading={loading}/>
            <CarPropLine title={t('car.mileage')} value={data?.mileage} code={'mileage'} loading={loading}/>
            <CarPropLine title={t('car.car_body_type')} value={data?.car_body_type} code={'car_body_type'} loading={loading}/>
            <Stack spacing={4} direction={'row'} size={'width'}>
                <CarPropWithInfo type={'title'}
                                 value={t('car.color') as string}
                                 code={'color'}
                                 loading={loading}
                                 textType={'secondary'}
                                 infoIconPos={'right'}
                />
                <ColorMark name={getHandbookItemName(data?.color)} color={data?.color.color || ''}/>
            </Stack>
            <CarPropLine title={t('car.transmission')} value={data?.transmission} code={'transmission'} loading={loading}/>
            <CarPropLine title={t('car.engine.label')} value={engineData} code={'engine'} loading={loading}/>
            <CarPropLine title={t('car.car_drive_type')} value={data?.drive} code={'drive_type'} loading={loading}/>
        </Stack>
        {buttonsBlock}
    </div>
}
