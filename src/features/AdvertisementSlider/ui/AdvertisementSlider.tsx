import React, {FC} from "react";
import { getCarName, getTimeAccordingNow, getYear, Slider, useMultiLanguageHandbooks } from "../../../shared";
import {IAdvertisementListItem} from "../../../entities/Advertisement/namespace";
import {useAppNavigate, useAppSelector} from "../../../app/services";
import {selectors as userSelectors} from "../../../entities/User";
import {useTranslation} from "react-i18next";
import {AdvertisementCard, NS} from "../../../entities/Advertisement";
import {AddRemoveToFavourites} from "../../OperateWithAdvertisementFavourites";


interface IProps {
    data: IAdvertisementListItem[]
    loading: boolean
    withFavourites?: boolean
}

export const AdvertisementSlider: FC<IProps> = ({
                                                    data,
                                                    loading,
                                                    withFavourites = true
                                                }) => {
    const isAuth = useAppSelector(userSelectors.selectAuthStatus)
    const userId = useAppSelector(userSelectors.selectUserId)
    const {getHandbookItemName} = useMultiLanguageHandbooks()
    const n = useAppNavigate()
    const {t, i18n} = useTranslation()
    const goToAdvertisementPage = (id: number) => n(d => d.advertisement._key_(id))
    const list = data || []

    const refactoredAdvertisements = list.map(ad => {
        const {
            engine: {fuel, hp, volume}, drive, transmission, equipment_name,
            name, date_of_production, start_date, price, photos, mileage, car_body_type, owner, advertisement_id
        } = ad
        const advertisementCardData: NS.IAdvertisementCardData = {
            drive: getHandbookItemName(drive),
            transmission: getHandbookItemName(transmission),
            engine: `${volume} ${t("metrics.liter")} /${hp} ${t("metrics.hp")} /${getHandbookItemName(fuel)}`,
            name: getCarName(name),
            yearOfProduction: getYear(date_of_production),
            startDate: getTimeAccordingNow(start_date, i18n.language),
            carBodyType: getHandbookItemName(car_body_type),
            price,
            photos,
            mileage: `${mileage} ${t("metrics.kilometer")}`,
            equipment: equipment_name,
            owner,
            advertisement_id
        }
        return advertisementCardData
    }) as NS.IAdvertisementCardData[]

    return <Slider data={refactoredAdvertisements}
                   loading={loading}
                   renderEl={(data: NS.IAdvertisementCardData, loadingStatus?: boolean) => <AdvertisementCard
                       data={data}
                       type={'small'}
                       extra={{
                           favoriteButton: data && isAuth && withFavourites
                               ? <AddRemoveToFavourites withTransparentBackground
                                                        advertisementId={data?.advertisement_id}
                               />
                               : undefined,
                       }
                       }
                       onClick={() => data && goToAdvertisementPage(data.advertisement_id)}
                       loading={loadingStatus || false}
                   />
                   }
    />
}
