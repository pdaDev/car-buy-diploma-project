import {FC} from 'react'

import * as NS from '../../namespace'
import {Container, flatCarProps, Grid, Label, Stack} from "shared";
import {useTranslation} from "react-i18next";

import {CarPropLine} from "../CarPropLine/CarPropLine";

interface IProps {
    loading?: boolean
}


export const CarPropBlock: FC<NS.IServerCarProps & IProps> = (props) => {
    const { t } = useTranslation()
    const { loading, ...carData} = props
    const { headers, allProps, allPropsKeys } = flatCarProps(carData, t)
    const index = allPropsKeys.length / 2
    const renderColumn = (keys: string[]) => {
        return <Stack spacing={3} size={'width'}>
            {
                keys.filter(key => allProps[key as keyof typeof allProps] !== null )
                    .map(key => {
                    const propValue = allProps[key as keyof typeof allProps]
                    if (headers.includes(key)) {
                        return <Container mt={1} mb={2}>
                            <Label label={propValue}
                                   level={3}
                                   loading={loading}
                                   loadingWidth={350}
                                   weight={'medium'}/>
                        </Container>
                    }
                    if (propValue === null)
                        return null
                    return <CarPropLine title={t(`car.props.${key}.title`)}
                                        value={propValue}
                                        loading={loading}
                                        code={key}/>
                })
            }
        </Stack>
    }
    return <Grid cols={2} container gap={6}>
        { renderColumn(allPropsKeys.slice(0, index)) }
        { renderColumn(allPropsKeys.slice(index, allPropsKeys.length)) }
    </Grid>
}
