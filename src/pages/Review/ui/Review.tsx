import {Card, Container, FormMode, Label, Slider, Stack, Text, useQueryParamsFormMode} from "../../../shared";
import {FC, useState} from "react";
import {useGetReviewQuery, NS, useEditReviewMutation, ReviewScoreBlock, ReviewCard} from "../../../entities/Review";
import {useParams, useSearchParams} from "react-router-dom";
import {CarTitle} from "../../../entities/Car/ui/CarTitle/CarTitle";
import {UserBlock} from "../../../shared/ui/User/UserBlock/UserBlock";
import {useTranslation} from "react-i18next";
import {useAppNavigate} from "../../../app/services";

export const Review: FC = () => {
    const {id} = useParams()
    const review_id = Number(id)
    const [searchParams, setSearchParams] = useSearchParams()
    const { formMode, setViewMode, setEditMode, editData, setEditData, resetEditData, edit
    } = useQueryParamsFormMode<NS.IReviewPatchPayload>({id: review_id})

    const [patch, {isLoading: patchingLoading}] = useEditReviewMutation()
    const editReview = () => edit(patch)

    const {data, isLoading} = useGetReviewQuery(review_id)
    const loadingStatus = isLoading
    const {t} = useTranslation()
    const n = useAppNavigate()
    const goToReviewsSearch = () => data && n(p => p.reviews, { generations: [data.car.generation.id] })
    const excessiveReviews = data ? data.other_reviews.count - data.other_reviews.results.length : 0
    return <Container>
        <CarTitle data={data?.car || null}/>
        <Card width={'100%'} contentDirection={'column'} contentGap={5}>
            <Stack direction={'row'} vAlign={'center'}>
                <Label label={data?.title} level={1} weight={'bold'} loading={loadingStatus}/>
                <Label label={data?.date} level={4} type={'secondary'}/>
            </Stack>
            <Text content={data?.message}/>
        </Card>
        {data && <ReviewScoreBlock {...data?.score_point} />}
        {data && <Card>
            <UserBlock user={data.owner}/>
        </Card>}
        {data && data.other_reviews.results.length > 0 && <>
            <Label label={t("review.read_another_reviews")} level={3} weight={'medium'}/>
            <Slider data={data.other_reviews.results}
                    lastElement={excessiveReviews > 0 && <Card
                        width={'220px'}
                        paddings={5}
                        height={'320px'}
                        onClick={goToReviewsSearch}
                        contentAlign={'center'}>
                        <Label label={`${t("review.read_extra")} ${excessiveReviews}`} weight={'medium'} level={3}/>
                        </Card>}
                    renderEl={(data: NS.IServerReviewListItem) => <ReviewCard
                onClick={() => data && n(p => p.reviews._key_(data.review_id))}
                data={data}
                type={'small'} /> }
                /></>}
    </Container>
}