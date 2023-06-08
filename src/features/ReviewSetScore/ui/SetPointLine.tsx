import {FC} from "react";
import { NS } from 'entities/Review'
import {Label, RangeInput, ReviewPoints, Stack} from "../../../shared";
import {useTranslation} from "react-i18next";

interface IProps {
    point: keyof ReviewPoints
    value: number
    onChange: Function
}
export const SetPointLine: FC<IProps> = ({ point, value, onChange }) => {

    const { t } = useTranslation()
    return <Stack spacing={3} size={'container'} direction={'row'} vAlign={'center'}>
        <Label level={4} label={t(`review.points.${point}`) as string}/>
        <RangeInput min={0} max={5} step={1} current={value} type={'single'} onChange={onChange as any}></RangeInput>
    </Stack>
}