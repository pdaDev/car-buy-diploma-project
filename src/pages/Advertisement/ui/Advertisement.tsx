import React, {FC, useEffect, useState} from "react";
import {useParams, useSearchParams} from "react-router-dom";
import {selectors} from 'entities/User'
import {
    AdvertisementDescriptionBLock,
    AdvertisementTitleBlock,
    useGetAdvertisementQuery,
    AdvertisementCarPropsBlock,
    NS, usePatchAdMutation, AdvertisementFullscreenImageBanner
} from "../../../entities/Advertisement";
import {
    Button, Card,
    Container,
    FormMode, getCarName, getCarNameFromModelWithId,
    ImageSlider,
    Stack,
    useClassState,
    useQueryParamsFormMode,
    useTabTile
} from "../../../shared";
import {useAppDispatch, useAppNavigate, useAppSelector} from "../../../app/services";
import {AddRemoveToFavourites} from "../../../features/OperateWithAdvertisementFavourites";
import {
    AdvertisementControlPanel,
    ContactWithOwnerBlock
} from "../../../features/OperateWithAdvertisement";
import {useTranslation} from "react-i18next";
import {ReviewScoreBlock} from "../../../entities/Review";
import {saveAdvertisementToHistory} from "../../../entities/Advertisement/api/historyAPI";
import {addToCompare, removeFromCompare, useContentCompare} from "../../../features/CompareSmth";
import {selectCompareAds} from "../../../features/CompareSmth/model/selectors";
import {AdvertisementForm} from "../../../widgets/AdvertisementCreateForm";
import {StatusCode} from "../../../entities/Advertisement/namespace";
import {openModal} from "../../../app/services/withPopupProvider";
import {useAuthorize} from "../../../entities/User/lib/hooks";


export const Advertisement: FC = () => {
    const {id} = useParams()
    const advertisement_id = Number(id) as number
    const { authStatus } = useAuthorize()

    useEffect(() => {
        if (authStatus)
            saveAdvertisementToHistory(advertisement_id)
    }, [advertisement_id, authStatus])

    const userId = useAppSelector(selectors.selectUserId)
    const {isLoading, data} = useGetAdvertisementQuery(advertisement_id)
    const isUserAdvertisement = userId && data && data.owner.id === userId

    const initEditData = {id: advertisement_id}
    const {
        formMode,
        editData,
        setEditData,
        isEditMode,
        setEditMode,
        setViewMode,
        setMode
    } = useQueryParamsFormMode<NS.IAdvertisementPatchPayload>(initEditData)
    const editAdvertisement = async (data: any) => {
        if (id) {
            await patch({data, id: +id}).then(setViewMode)
        }
    }
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
        ? `${t('advertisement.tabTitle.buy')} ${getCarNameFromModelWithId(data.name)} ${t("advertisement.tabTitle.price")} ${data.price.latest}`
        : t("advertisement.loading")
    useTabTile(tabTitle)
    const n = useAppNavigate()

    const goToReviewPage = () => n(p => p.reviews._key_(data?.review?.review_id || -1))
    const goToCarCharacteristicsPage = () => n(p => p.car.technical, {generation: data?.name?.generation_variant || 0})
    const d = useAppDispatch()
    const compare = useContentCompare('ad', advertisement_id)
    const compareButtonTitle = compare.isCompared ? t("compare.remove") : t("compare.title")

    const onImageClick = (index: number) => {
        if (data) {
            d(openModal({
                key: 'image', payload: {
                    currentImageIndex: index,
                    images: data.photos.map(i => i.photo),
                    extra: <AdvertisementFullscreenImageBanner
                        car={data.name}
                        price={data.price.latest}
                        mileage={data.mileage}
                        engine={data.car_characteristics.engine}
                        dateOfProduction={data.date_of_production}
                    />
                }
            }))
        }
    }

    if (isEditMode) {
        return <AdvertisementForm defaultData={data}
                                  mode={'edit'}
                                  loading={isPatchLoading}
                                  changeFormMode={setMode}
                                  onSubmit={editAdvertisement}
        />
    }

    return <Container max_w={'900px'}>
        <Stack size={'container'} vAlign={'start'} spacing={4}>
            <AdvertisementTitleBlock loading={isLoading || isPatchLoading}
                                     price={data?.price}
                                     startDate={data?.start_date}
                                     car={data?.name}
                                     mode={'view'}
                                     editData={editData}
                                     onChange={setEditData}
                                     favouriteButton={!isUserAdvertisement && authStatus ? <AddRemoveToFavourites
                                         advertisementId={data?.advertisement_id || -1}
                                     /> : null}/>
            {
                isUserAdvertisement || isLoading
                    ? <AdvertisementControlPanel
                        loading={isLoading}
                        status={data?.status_code.code as StatusCode}
                        advertisementId={data?.advertisement_id || -1}
                    />
                    : <ContactWithOwnerBlock owner={data!.owner}
                                             advertisement_id={data!.advertisement_id}
                                             name={data!.name}/>
            }

            <Stack direction={'row'} spacing={4}>
                <AdvertisementCarPropsBlock data={carProps}
                                            mode={'view'}
                                            loading={isLoading}
                                            buttonsBlock={<Stack spacing={3}>
                                                {!isUserAdvertisement && <Button type={'primary'}
                                                                                 size={'medium'}
                                                                                 label={compareButtonTitle}
                                                                                 onClick={compare.switchCompare}
                                                />}
                                                <Button type={'primary'}
                                                        size={'medium'}
                                                        onClick={goToCarCharacteristicsPage}
                                                        label={t("advertisement.read_info") as string}/>
                                            </Stack>}
                />
                <Container min_w={"580px"} max_w={"550px"} min_h={"450px"}>
                    <ImageSlider images={data?.photos.map(p => p.photo) || []}
                                 onImageClick={onImageClick}
                    />
                </Container>

            </Stack>
            <AdvertisementDescriptionBLock loading={isLoading}
                                           description={data?.description || null}
            />
            {data?.review && <ReviewScoreBlock {...data.review.score_point} extra={
                {
                    Button: <Button type={'primary'}
                                    label={t("advertisement.review_read") as string}
                                    onClick={goToReviewPage}/>
                }}
            />}
        </Stack>
    </Container>
}