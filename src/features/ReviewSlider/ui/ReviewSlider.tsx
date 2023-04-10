import React, {FC} from "react";
import {useAppNavigate, useAppSelector} from "../../../app/services";
import {selectors as userSelectors} from "../../../entities/User";
import {getCarName, getTimeAccordingNow, getYear, Slider, useMultiLanguageHandbooks} from "../../../shared";
import {useTranslation} from "react-i18next";
import {AdvertisementCard} from "../../../entities/Advertisement";
import {AddRemoveToFavourites} from "../../OperateWithAdvertisementFavourites";
import {IAdvertisementListItem} from "../../../entities/Advertisement/namespace";
import {NS, ReviewCard} from 'entities/Review'

interface IProps {
    data: NS.IServerReviewListItem[]
    loading: boolean
}

export const ReviewSlider: FC<IProps> = ({
                                             data,
                                             loading,
                                         }) => {
    const n = useAppNavigate()
    const goToReviewPage = (id: number) => n(d => d.advertisement._key_(id))
    const list = data || []


    return <Slider data={list}
                   loading={loading}
                   renderEl={(data: NS.IServerReviewListItem, loadingStatus?: boolean) => <ReviewCard
                       data={data}
                       type={'small'}
                       onClick={() => data && goToReviewPage(data.review_id)}
                       loading={loadingStatus || false}
                   />
                   }
    />
}