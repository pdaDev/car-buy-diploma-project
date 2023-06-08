import {FC} from 'react'

import s from './CarPropBlock.module.scss'
import * as NS from '../../namespace'
import {Container, flatCarProps, Grid, Label, Stack} from "../../../../shared";
import {useTranslation} from "react-i18next";

import {CarPropLine} from "../CarPropLine/CarPropLine";


export const CarPropBlock: FC<NS.IServerCarProps> = (props) => {
    const { t } = useTranslation()
    const { headers, allProps, allPropsKeys } = flatCarProps(props, t)
    const index = allPropsKeys.length / 2
    const renderColumn = (keys: string[]) => {
        return <Stack spacing={3}>
            {
                keys.filter(key => allProps[key as keyof typeof allProps] !== null )
                    .map(key => {
                    const propValue = allProps[key as keyof typeof allProps]
                    if (headers.includes(key)) {
                        return <Container mt={1} mb={2}>
                            <Label label={propValue} weight={'medium'}/>
                        </Container>
                    }
                    if (propValue === null)
                        return null
                    return <CarPropLine title={t(`car.props.${key}.title`)} value={propValue} code={key}/>
                })
            }
        </Stack>
    }
    return <Grid cols={2} container gap={6}>
        { renderColumn(allPropsKeys.slice(0, index)) }
        { renderColumn(allPropsKeys.slice(index, allPropsKeys.length)) }
    </Grid>
}
