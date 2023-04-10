import React, {FC, useState} from "react";
import {
    CardType,
    getCarName,
    getTimeAccordingNow,
    getYear,
    List,
    Stack,
    useMultiLanguageHandbooks
} from "../../../shared";
import {IAdvertisementListItem} from "../../../entities/Advertisement/namespace";
import {AdvertisementCard} from "../../../entities/Advertisement";
import {AddRemoveToFavourites} from "../../../features/OperateWithAdvertisementFavourites";
import {useTranslation} from "react-i18next";
import {NS} from 'entities/Advertisement'
import {useAppNavigate, useAppSelector} from "../../../app/services";
import {selectors as userSelectors} from "../../../entities/User";
import {SortBLock} from "../../../features/SortBlock";
import {AdvertisementManagementPanel} from "../../../features/ManagemenentPanel";
import {ChangeAdvertisementType} from "../../../features/ChangeADvertisementType";


interface IProps {
    data: IAdvertisementListItem[]
    withDifferentAdCardType?: boolean
    loading: boolean
    carType?: 'mini-card' | 'base-card' | 'search-card'
    sort?: Omit<Parameters<typeof SortBLock>[0], 'sortKeys'> & { sortKeys?: string[] }
    withFavourites?: boolean
    withAdvertisementManagement?: boolean
}

export const AdvertisementsList: FC<IProps> = ({
                                                   data,
                                                   sort,
                                                   loading,
                                                   withAdvertisementManagement,
                                                   withFavourites,
                                                   withDifferentAdCardType= false,
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
    const defaultSortKeys = ['price', 'date_of_production', 'mileage']
    const keysForSorting = sort?.sortKeys ?? defaultSortKeys
    const [cardType, setCardType] = useState<CardType>('large')
    const isSmallCard = cardType === 'small'


    return <Stack spacing={4} vAlign={'start'} size={'container'}>
        <Stack direction={'row'} size={'container'}>
            {sort && keysForSorting.length > 0 &&
                <SortBLock currentSortKey={sort!.currentSortKey} sortKeys={keysForSorting} onSort={sort!.onSort}/>}
            { withDifferentAdCardType && <ChangeAdvertisementType onChange={setCardType} activeType={cardType}/> }
        </Stack>
        <List data={refactoredAdvertisements}
              loading={loading}
              renderListEl={(data: NS.IAdvertisementCardData, loadingStatus?: boolean) =><AdvertisementCard data={data}
                                         type={cardType}
                                         extra={{
                                             favoriteButton: data && isAuth && withFavourites
                                                 ? <AddRemoveToFavourites withTransparentBackground={isSmallCard}
                                                                          advertisementId={data?.advertisement_id}
                                                 />
                                                 : undefined,
                                             managementPanel: data && isAuth && data.owner.id === userId && withAdvertisementManagement
                                                 ?
                                                 <AdvertisementManagementPanel advertisementId={data?.advertisement_id}/>
                                                 : null
                                         }
                                         }
                                         onClick={() => data && goToAdvertisementPage(data.advertisement_id)}
                                         loading={loadingStatus || false}
                      />
              }
        />
    </Stack>
}
