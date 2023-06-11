import React, {FC} from "react";
import {
    Card,
    getCarName,
    getTimeAccordingNow,
    getYear,
    ICarNameWithId, Label,
    Slider,
    useMultiLanguageHandbooks
} from "shared";
import {IAdvertisementListItem} from "entities/Advertisement/namespace";
import {useAppNavigate} from "app/services";
import {useTranslation} from "react-i18next";
import {AdvertisementCard, NS} from "entities/Advertisement";
import {AddRemoveToFavourites} from "../../OperateWithAdvertisementFavourites";
import {useAuthorize} from "entities/User/lib/hooks";


interface IProps {
    data?: IAdvertisementListItem[]
    loading: boolean
    withFavourites?: boolean
    countOfVisible?: number
    totalCountOfAdvertisements?: number
    car?: Partial<ICarNameWithId>
}

export const AdvertisementSlider: FC<IProps> = ({
                                                    data,
                                                    countOfVisible,
                                                    loading,
                                                    withFavourites = true,
                                                    car,
                                                    totalCountOfAdvertisements
                                                }) => {
    const {authStatus: isAuth} = useAuthorize()
    const {getHandbookItemName} = useMultiLanguageHandbooks()
    const n = useAppNavigate()
    const {t, i18n} = useTranslation()
    const goToAdvertisementPage = (id: number) => n(d => d.advertisement._key_(id))
    const list = data || []

    const refactoredAdvertisements = list.map(ad => {
        const {
            engine: {fuel, hp, volume},
            drive,
            transmission,
            equipment_name,
            name,
            date_of_production,
            start_date,
            address,
            price,
            photos,
            mileage,
            car_body_type,
            owner,
            advertisement_id
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
            address: address ? `г. ${address.name}` : null,
            mileage: `${mileage} ${t("metrics.kilometer")}`,
            equipment: equipment_name,
            owner,
            advertisement_id
        }
        return advertisementCardData
    }) as NS.IAdvertisementCardData[]

    let query = 'car='
    query = car?.brend ? query.concat(`brend_id*${car.brend.id}`) : query
    query = car?.model ? query.concat(`%model_id*${car.model.id}`) : query
    query = car?.generation ? query.concat(`%generation_id*${car.generation.id}`) : query
    const goToAdsSearch = () => car &&
        n(p => p.search, query)
    const excessiveReviews = totalCountOfAdvertisements ? totalCountOfAdvertisements - list.length : 0

    return <Slider data={refactoredAdvertisements}
                   loading={loading}
                   width={'full'}
                   spacing={16}
                   countVisibleItems={countOfVisible || 3}
                   lastPage={excessiveReviews > 0 && car && <Card
                       width={'220px'}
                       paddings={5}
                       height={'100%'}
                       onClick={goToAdsSearch}
                       contentAlign={'center'}>
                       <Label label={`${t("advertisement.show_other")} ${excessiveReviews}`}
                              weight={'medium'}
                              align={'center'}
                              level={3}/>
                   </Card>}
                   renderEl={(data: NS.IAdvertisementCardData, loadingStatus) => <AdvertisementCard
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
                       loading={loadingStatus}
                   />
                   }
    />
}
