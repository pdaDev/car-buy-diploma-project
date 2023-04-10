import React, {FC, ReactNode} from 'react'

import * as NS from '../../namespace'
import {Box, Container, FormMode, Label, Stack, useMultiLanguageHandbooks} from "../../../../shared";
import {useTranslation} from "react-i18next";
import s from './AdvertisementCarPropsBlock.module.scss'
import {CarPropLine} from "../../../Car/ui/CarPropLine/CarPropLine";

interface IProps {

    data: Pick<NS.IServerAdvertisement, 'rate' | 'color' | 'mileage' | 'date_of_production'> & NS.IServerCarCharacteristic | null
    buttonsBlock?: ReactNode
    mode: FormMode
    loading: boolean

}

export const AdvertisementCarPropsBlock: FC<IProps> = ({
                                                           mode,
                                                           data, buttonsBlock
                                                       }) => {
    const { t } = useTranslation()

    const getLabel = (key: string, root: string ) => t(`${root}.${key}`) + ":"


    const { getHandbookItemName } = useMultiLanguageHandbooks()
    const yearOfProduction = data ? new Date(data?.date_of_production).getFullYear() : 0
    const engineData = `${data?.engine?.volume}${t("metrics.liter")} ${getHandbookItemName(data?.engine?.fuel)}`
    return <div className={s.wrapper}>
                <Stack vAlign={'start'} spacing={3}>
                    {data?.rate && <Stack direction={'row'} vAlign={'center'} hAlign={'start'} spacing={3}>
                        <Box figure={'circle'}
                             measure={'px'}
                             background={"primary"}
                             w={36}>
                            <Container contentAlign={'center'} pb={2}>
                                <Label label={data?.rate} weight={'regular'} size={'12px'} level={6}/>
                            </Container>
                        </Box>
                        {t("advertisement.rate")}
                    </Stack>}
                    <CarPropLine title={t('car.date_of_production')} value={yearOfProduction} code={'date_of_production'} />
                    <CarPropLine title={t('car.mileage')} value={data?.mileage} code={'mileage'} />
                    <CarPropLine title={t('car.car_body_type')} value={data?.car_body_type} code={'car_body_type'} />
                    <CarPropLine title={t('car.color')} value={data?.color} code={'color'}/>
                    <CarPropLine title={t('car.transmission')} value={data?.transmission} code={'transmission'} />
                    <CarPropLine title={t('car.engine.label')} value={engineData} code={'engine'}/>
                    <CarPropLine title={t('car.car_drive_type')} value={data?.drive} code={'drive_type'}/>

                </Stack>
                { buttonsBlock }
          </div>
}
