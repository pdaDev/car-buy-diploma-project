import {FC} from 'react'

import s from './CarPropBlock.module.scss'
import * as NS from '../../namespace'
import {Grid, Label, Stack, useMultiLanguageHandbooks} from "../../../../shared";
import {useTranslation} from "react-i18next";
import {InfoModal} from "../../../../features/InfoModal";
import {CAR_PROP_DESCRIPTION} from "../../lib/constants";


export const CarPropBlock: FC<NS.IServerCarProps> = (props) => {
    const headers = Object.keys(props)
    const { t } = useTranslation()
    const { getHandbookItemName, getHandbookItemDescription } = useMultiLanguageHandbooks()
    const allProps = headers.reduce<object>((acc ,header,) =>  {
        acc = {
            [header]: t(`car.props.headers.${header}`),
            ...props[header as keyof NS.IServerCarProps]
        }
        return acc
    }, {})
    const p = Object.keys(allProps)
    const index = p.length / 2
    const isHandbook = (value: object | number | string) => {
        return typeof value === 'object'
            && value !== null
            && ['ru_name', 'eng_name', 'ru_description', 'eng_description'].every(key => Object.keys(value).includes(key))
    }
    const renderColumn = (keys: string[]) => {
        return <Stack spacing={3}>
            {
                keys.map(key => {
                    const propValue = allProps[key as keyof typeof allProps]

                    if (headers.includes(key))
                        return <Label label={propValue}/>
                    return <Stack spacing={4} size={'container'}>
                        <Stack direction={'row'} spacing={3}>
                            <Label label={t(`car.props.${key}.title`)}/>
                            {Object.keys(CAR_PROP_DESCRIPTION).includes(key) &&
                                // @ts-ignore
                                <InfoModal title={CAR_PROP_DESCRIPTION[key].title}
                                           // @ts-ignore
                                           message={CAR_PROP_DESCRIPTION[key].message}
                                           closeBehavior={'blur'}
                                           behavior={'click'}/>}
                        </Stack>
                        <Stack direction={'row'} spacing={3}>
                            <Label label={isHandbook(propValue) ? getHandbookItemName(propValue) : propValue}/>
                            {isHandbook(propValue) && getHandbookItemDescription(propValue) &&
                                <InfoModal title={getHandbookItemName(propValue)}
                                           message={getHandbookItemDescription(propValue)!}
                                           closeBehavior={'blur'}
                                           behavior={'click'}/>
                            }
                        </Stack>
                    </Stack>
                })
            }
        </Stack>
    }
    return <Grid cols={2}>
        { renderColumn(p.slice(0, index)) }
        { renderColumn(p.slice(index, p.length - 1)) }
    </Grid>
}
