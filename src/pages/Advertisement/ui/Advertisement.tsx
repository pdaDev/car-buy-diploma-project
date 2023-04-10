import {FC, useState} from "react";
import {useParams, useSearchParams} from "react-router-dom";
import {selectors} from 'entities/User'
import {
    AdvertisementDescriptionBLock,
    AdvertisementTitleBlock,
    useGetAdvertisementQuery,
    AdvertisementCarPropsBlock,
    NS, usePatchAdMutation
} from "../../../entities/Advertisement";
import {
    Button,
    Container,
    FormMode, getCarName,
    ImageSlider,
    Stack,
    useClassState,
    useQueryParamsFormMode,
    useTabTile
} from "../../../shared";
import {useAppNavigate, useAppSelector} from "../../../app/services";
import {AddRemoveToFavourites} from "../../../features/OperateWithAdvertisementFavourites";
import {
    AdvertisementControlPanel,
    ContactWithOwnerBlock
} from "../../../features/OperateWithAdvertisement";
import {useTranslation} from "react-i18next";
import {ReviewScoreBlock} from "../../../entities/Review";


export const Advertisement: FC = () => {
    const {id} = useParams()
    const advertisement_id = Number(id) as number

    const userId = useAppSelector(selectors.selectUserId)
    const {isLoading, data} = useGetAdvertisementQuery(advertisement_id)
    const isUserAdvertisement = userId && data && data.owner.id === userId

    const initEditData = {id: advertisement_id}
    const {formMode, editData, setEditData, edit} = useQueryParamsFormMode<NS.IAdvertisementPatchPayload>(initEditData)
    const editAdvertisement = () => edit(patch)
    const carProps = data ? {
        ...data.car_characteristics,
        mileage: data.mileage,
        rate: data.rate,
        date_of_production: data.date_of_production,
        color: data.color
    } : null


    const [patch, {isLoading: isPatchLoading}] = usePatchAdMutation()
    const {t} = useTranslation()
    const tabTitle = data
        ? `${t('advertisement.tabTitle.buy')} ${getCarName(data.name)} ${t("advertisement.tabTitle.price")} ${data.price.latest}`
        : t("advertisement.loading")
    useTabTile(tabTitle)
    const n = useAppNavigate()

    const goToReviewPage = () => n(p => p.reviews._key_(data?.review?.review_id || -1))

    return <Container max_w={'900px'}>
        <Stack size={'container'} vAlign={'start'} spacing={4}>
            <AdvertisementTitleBlock loading={isLoading || isPatchLoading}
                                     price={data?.price}
                                     startDate={data?.start_date}
                                     car={data?.name}
                                     mode={formMode}
                                     editData={editData}
                                     onChange={setEditData}
                                     favouriteButton={!isUserAdvertisement ? <AddRemoveToFavourites
                                         advertisementId={data?.advertisement_id || -1}
                                     /> : null}/>
            {
                isUserAdvertisement || isLoading
                    ? <AdvertisementControlPanel
                        loading={isLoading}
                        editAdvertisement={editAdvertisement}
                        advertisementId={data?.advertisement_id || -1}
                    />
                    : <ContactWithOwnerBlock {...data?.owner} />
            }

            <Stack direction={'row'} spacing={4}>
                <AdvertisementCarPropsBlock data={carProps}
                                            mode={formMode}
                                            loading={isLoading}
                                            buttonsBlock={<Stack>
                                                <Button type={'primary'}
                                                        size={'medium'}
                                                        label={t("advertisement.read_info") as string}/>
                                            </Stack>}
                />
                <Container min_w={"580px"} max_w={"550px"} min_h={"450px"}>
                    <ImageSlider images={data?.photos || []}/>
                </Container>

            </Stack>
            <AdvertisementDescriptionBLock loading={isLoading}
                                           description={data?.description || null}
                                           mode={formMode}
                                           onChange={setEditData}
                                           editData={editData}
            />
            {data?.review && <ReviewScoreBlock {...data.review} extra={
                {
                    Button: <Button type={'primary'}
                                    label={t("advertisement.review_read") as string}
                                    onClick={goToReviewPage}/>
                }}
            />}
        </Stack>
    </Container>
}