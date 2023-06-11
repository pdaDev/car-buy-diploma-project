import {
    Card,
    Container,
    getCarNameFromObjectWithId, getTimeWithoutSeconds,
    UserBlock,
    Label, Loader,
    Stack,
    Text,
    useQueryParamsFormMode, useTabTile
} from "shared";
import {FC} from "react";
import {useGetReviewQuery, NS, useEditReviewMutation, ReviewScoreBlock} from "entities/Review";
import {useParams, useSearchParams} from "react-router-dom";
import {CarTitle} from "entities/Car/ui/CarTitle/CarTitle";
import {selectors} from 'entities/User'
import {useTranslation} from "react-i18next";
import {useAppNavigate, useAppSelector} from "app/services";
import {ReviewCreateForm} from "widgets/ReviewCreateForm";
import {ReviewManagementBlock} from "features/ReviewManagementBlock";
import {ReviewPhotoViewer} from "features/ReviewPhotoViewer";
import {ReviewSlider} from "features/ReviewSlider";

export const Review: FC = () => {
    const {id} = useParams()
    const review_id = Number(id)
    const [searchParams, setSearchParams] = useSearchParams()
    const {
        formMode, setViewMode, setEditMode, editData,
    } = useQueryParamsFormMode<NS.ReviewPatchPayload>({id: review_id})

    const [patch, {isLoading: patchingLoading}] = useEditReviewMutation()
    const editReview = async (data: FormData) => {
        await patch({id: review_id, data}).unwrap()
        setViewMode()
    }

    const {data, isLoading} = useGetReviewQuery(review_id)
    const userId = useAppSelector(selectors.selectUserId)
    const isOwner = data ? data.owner.id === userId : false
    const loadingStatus = isLoading
    const {t} = useTranslation()
    const tabTitle = data ? `${data.title} - ${t('review.review_from_owner')} ${getCarNameFromObjectWithId(data.car)}` : 'loading'
    useTabTile(tabTitle)
    const n = useAppNavigate()

    if (formMode === 'edit' && isLoading) {
        return <Container>
            <Loader type={'line'} size={'medium'}/>
        </Container>
    }

    const dateOFReview = data ? new Date(data?.date) : new Date()
    return <>
        {formMode === 'edit'
            ? <Container max_w={'800px'}><ReviewCreateForm loading={patchingLoading}
                                                           onSubmit={editReview}
                                                           defaultData={data}

            /></Container>
            : <>
                <Container max_w={'800px'} zi={2}>
                    <Stack size={'width'} hAlign={'center'} spacing={4}>
                        <CarTitle data={data?.car || null} loading={loadingStatus}/>
                        {isOwner && <ReviewManagementBlock id={+review_id}/>}
                        <Card width={'100%'}
                              zIndex={2}
                              contentDirection={'column'}
                              contentGap={5} paddings={4}>
                            <Stack direction={'row'} spacing={4} vAlign={'center'}>
                                <Label label={data?.title} level={1}
                                       loadingWidth={380}
                                       weight={'bold'} loading={loadingStatus}/>
                            </Stack>
                            { isLoading ? <Stack size={'width'} spacing={3}>
                                {[...new Array(10)].map(() => <Label label={''} width={'100%'} level={5} loading={loadingStatus}/>)}
                            </Stack> : <Text content={data?.message}
                                             size={3}
                                             loading={loadingStatus}
                                             lineHeight={'24px'}/> }
                        </Card>
                    </Stack>
                </Container>
                {data && data.photos && data.photos.length > 0 &&
                    <ReviewPhotoViewer photos={data.photos.map(p => p.photo)}/>}
                <Container max_w={'800px'} mt={4}>
                    <Stack spacing={4} size={'width'}>
                       <ReviewScoreBlock data={data?.score_point} loading={loadingStatus} />
                       <Stack size={'width'} direction={'row'} spacing={4} hAlign={'start'}>
                            <Card>
                                <UserBlock user={data?.owner || null} loading={loadingStatus} nameRenderType={'with-short-last-name'}/>
                            </Card>
                            <Card height={'100%'} paddings={4}>
                                <Container contentAlign={'center'}>
                                    <Label
                                        label={`${dateOFReview.toLocaleDateString()} ${getTimeWithoutSeconds(dateOFReview)}`}
                                        level={4}
                                        size={4}
                                        loading={loadingStatus}
                                        loadingWidth={140}
                                        weight={'regular'}
                                    />
                                </Container>
                            </Card>
                        </Stack>
                        {data && data.other_reviews.results.length === 0 && !isLoading ? null :
                            <Stack size={'width'} direction={'column'} hAlign={'start'}>
                                <Label label={t("review.read_another_reviews")}
                                       loadingWidth={250}
                                       loading={isLoading} level={3} weight={'medium'}/>
                               <Container contentAlign={'center'}>
                                   <ReviewSlider data={data?.other_reviews.results}
                                                 totalCountOfReviews={data?.other_reviews.count}
                                                 car={data?.car}
                                                 loading={isLoading}
                                   />
                               </Container>

                            </Stack>}
                    </Stack></Container>

            </>
        }
    </>
}