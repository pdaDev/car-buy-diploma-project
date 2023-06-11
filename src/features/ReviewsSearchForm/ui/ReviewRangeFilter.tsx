import {FC} from "react";
import {Label, RangeInput, Stack} from "shared";
import {useTranslation} from "react-i18next";
import { NS } from 'entities/Review'
interface IProps {
    rangeFilter: any
    data: NS.IReviewSearchData
    filterKey: keyof NS.IReviewSearchData

}
export const ReviewRangeFilter: FC<IProps> = ({ rangeFilter, data, filterKey }) => {
    const { t } = useTranslation()
    return <Stack spacing={4} direction={'row'} size={'width'} vAlign={'start'}>
        <Label level={4} label={t(`review.points.${filterKey}`)}/>
        <RangeInput min={0}
                    max={5}
                    step={0.1}
                    type={'multiple'}
                    onChange={rangeFilter(filterKey) as any}
                    />
    </Stack>
}