// @ts-nocheck
import {FC} from "react";
import {CarPropType, cn, Container, flatCarProps, Grid, isHandbook, Label, Stack} from "../../../../shared";
import * as NS from '../../namespace'
import {useTranslation} from "react-i18next";
import {CarPropLine} from "../../../../entities/Car/ui/CarPropLine/CarPropLine";
import {CarPropWithInfo} from "../../../../entities/Car/ui/CarPropWithInfo/CarPropWithInfo";
import styled from "styled-components";
import s from './CompareCharacteristics.module.scss'

interface IProps {
    data: NS.IServerCompareItem[]
    showDifferences: boolean
}

const StyledCharacteristicsGrid = styled.div<{ cols: number }>`
  display: grid;
  column-gap: var(--space-4);
  grid-template-columns: repeat(${props => props.cols}, 250px);
  transform: translateY(-5px);
`

export const CompareCharacteristics: FC<IProps> = ({data, showDifferences}) => {
    const {t} = useTranslation()
    const sampleCharacteristics = data[0]?.characteristics || {}
    const keys = Object.keys(sampleCharacteristics)
    const exceptions = ['engine_id']
    return <StyledCharacteristicsGrid cols={data.length + 1}>
        {
            keys.map((key, i) => {
                // @ts-ignore
                let ks = Object.keys(sampleCharacteristics[key])
                ks = ks.filter(k => !data.every(el => el.characteristics[key][k] === null))
                ks = ks.filter(k => !exceptions.includes(k))

                ks = showDifferences ? ks.filter(k => {
                    // @ts-ignore
                    const isHandbookProp = isHandbook(data[0].characteristics[key][k])
                    // @ts-ignore
                    return data.some((el, index, arr) => isHandbookProp ? (el.characteristics[key][k].code !== arr[0].characteristics[key][k].code) : (el.characteristics[key][k] !== arr[0].characteristics[key][k]))
                }) : ks

                if (ks.length === 0)
                    return <></>
                return (
                    <>
                        <Container pb={3} pt={3}>
                            <Label label={t(`car.props.categories.${key}`)} weight={'medium'} level={3}/>
                        </Container>
                        {data.map((_, index) => <div className={cn(s.prop_wrapper,
                        )}/>)}
                        {ks.map((k, ii) => <>
                            <CarPropWithInfo type={'title'}
                                             infoIconPos={'right'}
                                             value={t(`car.props.${k}.title`) as string}
                                             code={k}/>
                            {data.map(el => <div className={cn(s.prop_wrapper,
                                i === keys.length - 1 && ii === ks.length - 1 && s.down,
                            )}>
                                {/** @ts-ignore */}
                                <CarPropWithInfo type={'value'}
                                                 infoIconPos={'right'}
                                                 value={el.characteristics[key][k]}/>
                            </div>)}

                        </>)}
                    </>)
            })
        }
    </StyledCharacteristicsGrid>
}