import React, {FC, ReactNode, useState} from "react";
import {
    CardType, Container, DataGrid, formatNumber,
    getCarName,
    getTimeAccordingNow,
    getYear, Grid, Label,
    List, sorter,
    Stack,
    useMultiLanguageHandbooks
} from "../../../shared";
import {IAdvertisementListItem} from "../../../entities/Advertisement/namespace";
import {AdvertisementCard} from "../../../entities/Advertisement";
import {AddRemoveToFavourites} from "../../../features/OperateWithAdvertisementFavourites";
import {useTranslation} from "react-i18next";
import {NS} from 'entities/Advertisement'
import {selectHandbook, useAppNavigate, useAppSelector} from "../../../app/services";

import {SortBLock} from "../../../features/SortBlock";
import {AdvertisementManagementPanel} from "../../../features/ManagemenentPanel";
import {ChangeAdvertisementType} from "../../../features/ChangeADvertisementType";
import {getEngineCharacteristicsLabel} from "../../../entities/Advertisement/lib/helpers";
import {useAuthorize} from "../../../entities/User/lib/hooks";


interface IProps {
    data: (IAdvertisementListItem)[]
    withDifferentAdCardType?: boolean
    loading: boolean
    fetching?: boolean
    carType?: Parameters<typeof AdvertisementCard>[0]['type']
    sort?: {
        sortKeys?: string[],
        withFrontSideSorting?: boolean
        currentSortKey?: string | null
        onSort?: (sort: string | null) => void
    }
    withFavourites?: boolean
    withAdvertisementManagement?: boolean
    withStatusMark?: boolean
    extraOptions?: ReactNode
    cols?: number
}

export const AdvertisementsList: FC<IProps> = ({
                                                   data,
                                                   sort,
                                                   cols,
                                                   carType: defaultCardType,
                                                   loading,
                                                   fetching,
                                                   withAdvertisementManagement,
                                                   withFavourites,
                                                   withDifferentAdCardType = false,
                                                   withStatusMark = false,
                                                   extraOptions
                                               }) => {
    const {userId, authStatus: isAuth} = useAuthorize()
    const {getHandbookItemName} = useMultiLanguageHandbooks()
    const n = useAppNavigate()
    const {t, i18n} = useTranslation()
    const [selfSort, setSelfSort] = useState<null | string>(null)

    const goToAdvertisementPage = (id: number) => n(d => d.advertisement._key_(id))
    let list = (data || []) as (NS.IAdvertisementListItemWithStatus[])
    list = sort && sort.withFrontSideSorting ? sorter(list, selfSort, '-') : list
    const refactoredAdvertisements = list.map((ad) => {
        const {
            engine, drive, transmission, equipment_name,
            name, date_of_production, start_date, price, photos, mileage, car_body_type, owner, advertisement_id,
            address
        } = ad
        const status = withStatusMark ? {
            status: {
                code: ad.status_code.code as NS.StatusCode,
                name: getHandbookItemName(ad.status_code)
            }
        } : {}
        const advertisementCardData: NS.IAdvertisementCardData = {
            drive: getHandbookItemName(drive),
            transmission: getHandbookItemName(transmission),
            engine: getEngineCharacteristicsLabel(engine, t, getHandbookItemName),
            name: getCarName(name),
            yearOfProduction: +date_of_production,
            startDate: getTimeAccordingNow(start_date, i18n.language),
            carBodyType: getHandbookItemName(car_body_type),
            price,
            photos,
            mileage: `${formatNumber(mileage)} ${t("metrics.kilometer")}`,
            equipment: equipment_name || '',
            owner,
            advertisement_id,
            address: address ? `г. ${address.name}` : null,
            ...status
        }
        return advertisementCardData
    }) as NS.IAdvertisementCardData[]
    const defaultSortKeys = ['price', 'date_of_production', 'mileage', 'start_date']
    const keysForSorting = sort?.sortKeys ?? defaultSortKeys
    const [cardType, setCardType] = useState<CardType>(defaultCardType || 'large')
    const isSmallCard = cardType === 'small'
    const sortHandler = (value: string | null) => {
        if (sort) {
            if (sort.withFrontSideSorting) {
                setSelfSort(value)
            } else {
                sort.onSort && sort.onSort(value)
            }
        }
    }
    const currentSortKey = sort ? sort.withFrontSideSorting ? selfSort : sort.currentSortKey || null : null

    return <Stack spacing={4} vAlign={'start'} size={'width'}>
        {(withDifferentAdCardType || sort) && <Stack wrap direction={'row'} vAlign={'center'} size={'width'}>
            {sort && keysForSorting.length > 0 &&
                <SortBLock currentSortKey={currentSortKey} sortKeys={keysForSorting} onSort={sortHandler}/>}
            {withDifferentAdCardType && <ChangeAdvertisementType onChange={setCardType} activeType={cardType}/>}
            {extraOptions}
        </Stack>}
        {isSmallCard ?
            <DataGrid loading={loading}
                      fetching={fetching}
                      renderEl={data => <AdvertisementCard data={data}
                                                           type={'small'}
                                                           extra={{
                                                               favoriteButton: data && isAuth && withFavourites
                                                                   ?
                                                                   <AddRemoveToFavourites
                                                                       withTransparentBackground={isSmallCard}
                                                                       advertisementId={data?.advertisement_id}
                                                                   />
                                                                   : undefined,
                                                           }
                                                           }
                                                           onClick={() => data && goToAdvertisementPage(data.advertisement_id)}
                                                           loading={loading || false}/>
                      }
                      data={refactoredAdvertisements}
                      cols={cols || 3}
                      emptyKey={'advertisement.empty'}
            />

            : <List data={refactoredAdvertisements}
                    loading={loading}
                    fetching={fetching}
                    emptyKey={'advertisement.empty'}
                    renderListEl={(data: NS.IAdvertisementCardData, loadingStatus?: boolean) => <AdvertisementCard
                        data={data}
                        type={cardType}
                        withStatus
                        extra={{
                            favoriteButton: data && isAuth && withFavourites
                                ?
                                <AddRemoveToFavourites
                                    withTransparentBackground={isSmallCard}
                                    advertisementId={data?.advertisement_id}
                                />
                                : undefined,
                            managementPanel: data && isAuth && data.owner.id === userId && withAdvertisementManagement
                                ?
                                <AdvertisementManagementPanel
                                    status={data?.status?.code || 'O'}
                                    advertisementId={data?.advertisement_id}/>
                                : null
                        }
                        }
                        onClick={() => data && goToAdvertisementPage(data.advertisement_id)}
                        loading={loadingStatus || false}
                    />
                    }
            />
        }
    </Stack>
}
