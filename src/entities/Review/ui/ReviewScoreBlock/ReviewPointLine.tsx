import {FC, ReactNode} from "react";
import * as NS from '../../namespace'
import {Container, getPercents, ReviewPoints, Stack} from "shared";
import {Label} from "../../../../shared";
import {useTranslation} from "react-i18next";
import s from './ReviewScoreBlock.module.scss'
import styled from "styled-components";

interface IProps {
    point: keyof ReviewPoints
    data: ReviewPoints
    loading?: boolean


}

const StyledPointLine = styled.div<{ w: string }>`
  position: absolute;
  height: 6px;
  border-radius: var(--space-3);
  background: var(--clr-primary);
  left: 0;
  top: 0;
  background: var(--clr-primary);
  z-index: 3;
  width: ${props => props.w};
  transition: .3s;
  animation: show 1s ;
  @keyframes show  {
    from {
      width: 0;
    }
    50% {
      width: ${props => {

        return  '50%'
      }
      }
    }
`


export const ReviewPointLine: FC<IProps> = ({
                                                point,
                                                data,
    loading,
                                            }) => {
    const {t} = useTranslation()
    const maxPoint = 5

    if (data[point] !== null) {
        return <Stack size={'width'} direction={'row'} spacing={4}>
            <Label level={4}
                   loading={loading}
                   label={t(`review.points.${point}`) as string}/>
            <Stack direction={'row'} size={'container'} spacing={4} vAlign={"center"}>
                <div className={s.point_line}>
                    <StyledPointLine w={getPercents(data[point]! / maxPoint * 100)}/>
                    <div className={s.background_line}/>
                </div>
                { !loading &&  <Label level={3} weight={'medium'} label={data[point]}/> }
            </Stack>
        </Stack>
    }
    return null
}