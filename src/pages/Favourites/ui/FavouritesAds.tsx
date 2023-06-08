import {FC, MouseEventHandler, ReactNode, useEffect, useState} from "react";
import {useAppDispatch, useAppNavigate, useAppSelector} from "app/services";
import {selectors} from 'entities/User'
import {AdvertisementsList} from "../../../widgets/AdvertisementsList";
import {useGetFavouriteAdsQuery} from "../../../entities/Advertisement/api/queryAPI";
import {
    Box,
    Button,
    Container,
    HeartIcon,
    Label,
    Stack,
    Text,
    useNavigationPermission, useOnScrollPagination, usePaginationAndSorting,
    useTabTile
} from "../../../shared";
import {useTranslation} from "react-i18next";
import {openModal} from "../../../app/services/withPopupProvider";
import {MotivationBlock} from "../../../shared/ui/MotivationBlock/MotivationBlock";
import {selectors as favSelectors} from 'features/OperateWithAdvertisementFavourites'
import {IAdvertisementListItem} from "../../../entities/Advertisement/namespace";
import {useAuthorize} from "../../../entities/User/lib/hooks";
import {AuthMotivation} from "../../../features/Auth";
import {SortBLock} from "../../../features/SortBlock";

export const FavouritesAds: FC = () => {
    const {authStatus} = useAuthorize()
    const { limit, sort, page, setPage, onSort, skeletonLoading } = usePaginationAndSorting()

    const favouritesIds = useAppSelector(favSelectors.selectIdsList)

    const {isLoading, data, currentData, isFetching, refetch} = useGetFavouriteAdsQuery({sort, limit, offset: page})
    useEffect(() => {
        refetch()
    }, [sort, refetch, authStatus])

    const {elements: advertisements, reset} = useOnScrollPagination<IAdvertisementListItem>({
        page,
        limit,
        count: data?.count || 0,
        sort,
        onPagination: setPage,
        data: data?.results,
        loading: isLoading
    })
    const filteredAds = advertisements.filter((ad: IAdvertisementListItem) => favouritesIds.includes(ad.advertisement_id))
    const isEmptyList = !isLoading && currentData?.length === 0
    const n = useAppNavigate()
    const {t} = useTranslation()
    const goToSearch = () => n(s => s.search)
    useTabTile(t("pages.favourites") as string)



    if (isEmptyList && authStatus)
        return <MotivationBlock handleAction={goToSearch}
                                buttonLabel={t("motivate.favourites.addFavourite.button") as string}>
            <Stack direction={'row'}>
                <Text content={t("motivate.favourites.addFavourite.message") as string}/>
                <img src={HeartIcon}/>
            </Stack>
        </MotivationBlock>

    const loadingStats = isLoading || isFetching
    return <AuthMotivation translationKey={'favourites'}>
        <Container max_w={'700px'}>
            <Stack size={'width'} vAlign={'start'} spacing={4}>
                <Stack direction={'row'} vAlign={'center'}>
                    <Label label={t("pages.favourites")} level={1} weight={'medium'}/>
                    <SortBLock sortKeys={[ 'price', 'date']}
                               currentSortKey={sort}
                               onSort={onSort}
                               />
                </Stack>
                <AdvertisementsList
                    withFavourites
                    fetching={loadingStats}
                    data={filteredAds}
                    loading={loadingStats && skeletonLoading}
                />
            </Stack>
        </Container>
    </AuthMotivation>
}


