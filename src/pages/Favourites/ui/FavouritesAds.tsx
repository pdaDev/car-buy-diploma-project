import {FC, MouseEventHandler, ReactNode, useEffect, useState} from "react";
import {useAppDispatch, useAppNavigate, useAppSelector} from "app/services";
import {selectors} from 'entities/User'
import {AdvertisementsList} from "../../../widgets/AdvertisementsList";
import {useGetFavouriteAdsQuery} from "../../../entities/Advertisement/api/queryAPI";
import {Box, Button, Container, HeartIcon, Stack, Text, useTabTile} from "../../../shared";
import {useTranslation} from "react-i18next";
import {openModal} from "../../../app/services/withPopupProvider";
import {MotivationBlock} from "../../../shared/ui/MotivationBlock/MotivationBlock";
import {selectors as favSelectors} from 'features/OperateWithAdvertisementFavourites'
import {IAdvertisementListItem} from "../../../entities/Advertisement/namespace";

export const FavouritesAds: FC = () => {
    const authStatus = useAppSelector(selectors.selectAuthStatus)
    const [sort, setSort] = useState<string | null>(null)
    const favouritesIds = useAppSelector(favSelectors.selectIdsList)

    const limit = 10
    const offset = 0
    console.log(favouritesIds.length)
    const {isLoading, data, refetch } = useGetFavouriteAdsQuery({sort, limit, offset})
    useEffect(() => {
        refetch()
    }, [sort, refetch, authStatus])
    const ads = data?.results || []
    const filteredAds = ads.filter((ad: IAdvertisementListItem) => favouritesIds.includes(ad.advertisement_id))
    const isEmptyList = !isLoading && ads.length === 0
    const n = useAppNavigate()
    const {t} = useTranslation()
    const goToSearch = () => n(s => s.init)
    useTabTile(t("pages.favourites") as string)
    const d = useAppDispatch()
    const openLoginForm = () => d(openModal({ key: 'auth' }))

    if (!authStatus) {
        return <MotivationBlock handleAction={openLoginForm}
                                message={t("motivate.favourites.authorize.message") as string}
                                buttonLabel={t("motivate.favourites.authorize.button")}
        />
    }

        if (isEmptyList)
            return <MotivationBlock handleAction={goToSearch} buttonLabel={t("motivate.favourites.addFavourite.button") as string}>
                <Stack direction={'row'}>
                    <Text content={t("motivate.favourites.addFavourite.message") as string}/>
                    <img src={HeartIcon}/>
                </Stack>
            </MotivationBlock>

    return <Container max_w={'700px'}>
        <AdvertisementsList sort={
            {
                sortKeys: [],
                currentSortKey: sort,
                onSort: setSort as any
            }
        }
                            withFavourites
                            data={filteredAds}
                            loading={isLoading}
        />
    </Container>
}


