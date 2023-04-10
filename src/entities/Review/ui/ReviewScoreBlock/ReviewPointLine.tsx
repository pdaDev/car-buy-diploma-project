import {FC, ReactNode} from "react";
import * as NS from '../../namespace'
import {Container, getPercents, ReviewPoints, Stack} from "shared";
import {Label} from "../../../../shared";
import {useTranslation} from "react-i18next";
import s from './ReviewScoreBlock.module.scss'

interface IProps {
    point: keyof ReviewPoints
    data: ReviewPoints


}


export const ReviewPointLine: FC<IProps> = ({
                                                point,
                                                data,
                                            }) => {
    const {t} = useTranslation()
    const maxPoint = 5
    console.log(getPercents(data[point]! / maxPoint * 100))
    if (data[point] !== null) {
        return <Stack size={'container'} direction={'row'} spacing={4}>
            <Label level={4} label={t(`review.points.${point}`) as string}/>
            <Stack direction={'row'} size={'container'} spacing={4} vAlign={"center"}>
                <div className={s.point_line}>
                    <div className={s.line} style={{width: getPercents(data[point]! / maxPoint * 100)}}/>
                    <div className={s.background_line}/>
                </div>
                <Label level={3} weight={'medium'} label={data[point]}/>
            </Stack>
        </Stack>
    }
    return null
}