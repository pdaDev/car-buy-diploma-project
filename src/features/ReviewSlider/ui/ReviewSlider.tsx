import React, {FC} from "react";
import {useAppNavigate} from "app/services";
import {
    Card,
    getCarQuery,
     ICarNameWithId,
    IServerReviewListItem, Label,
    Slider
} from "shared";
import {useTranslation} from "react-i18next";
import {ReviewCard} from 'entities/Review'

interface IProps {
    data?: IServerReviewListItem[]
    loading: boolean
    countOfVisibleItems?: number
    car?: Partial<ICarNameWithId>
    totalCountOfReviews?: number
}

export const ReviewSlider: FC<IProps> = ({
                                             data,
                                             loading,
                                             countOfVisibleItems = 3,
                                             car,
                                             totalCountOfReviews
                                         }) => {
    const n = useAppNavigate()

    const list = data || []
    const {t} = useTranslation()

    const goToReviewsSearch = () => car &&
        n(p => p.reviews, getCarQuery(car))
    const excessiveReviews = totalCountOfReviews ? totalCountOfReviews - list.length : 0

    return <Slider data={list}
                   loading={loading}
                   width={'full'}
                   elMargin={16}
                   spacing={16}
                   countVisibleItems={countOfVisibleItems}
                   lastPage={excessiveReviews > 0 && car && <Card
                       width={'220px'}
                       paddings={4}
                       height={'320px'}
                       onClick={goToReviewsSearch}
                       contentAlign={'center'}>
                       <Label label={`${t("review.read_extra")} ${excessiveReviews}`}
                              weight={'medium'}
                              align={'center'}
                              level={3}/>
                   </Card>}
                   renderEl={(data: IServerReviewListItem, loadingStatus) => <ReviewCard
                       onClick={() => data && n(p => p.reviews._key_(data.review_id))}
                       data={data}
                       loading={loadingStatus}
                       type={'small'}/>}
    />
}