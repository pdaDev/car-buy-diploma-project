import {FC, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "app/services";
import {selectors} from 'entities/User'
import {useGetAdsMutation, useGetMyAdsQuery} from "../../../entities/Advertisement/api/queryAPI";
import {AdvertisementsList} from "../../../widgets/AdvertisementsList";
import {MotivationBlock} from "../../../shared/ui/MotivationBlock/MotivationBlock";
import {useTranslation} from "react-i18next";
import {openModal} from "../../../app/services/withPopupProvider";
import {Container, useTabTile} from "../../../shared";

export const Garage: FC = () => {
    const authStatus = useAppSelector(selectors.selectAuthStatus)
    const {t} = useTranslation()
    const d = useAppDispatch()
    const openLoginForm = () => d(openModal({key: 'auth'}))
    useTabTile(t("pages.garage") as string)
    const [sort, setSort] = useState<string | null>(null)
    const limit = 10
    const offset = 0
    const {isLoading, data, refetch} = useGetMyAdsQuery({limit, offset, sort})
    useEffect(() => {
        refetch()
    }, [authStatus, refetch, sort])

    if (!authStatus) {
        return <MotivationBlock handleAction={openLoginForm}
                                buttonLabel={"motivate.garage.authorize.button"}
                                message={t("motivate.garage.authorize.message") as string}
        />
    }
    const ads = data?.results || []
    if (!isLoading && ads.length === 0) {
        return <MotivationBlock handleAction={() => {}}
                                buttonLabel={t("motivate.garage.createAd.button") as string}
                                message={t("motivate.garage.createAd.message") as string}
        />
    }


    return <Container max_w={'700px'}>
        <AdvertisementsList data={ads} sort={{
            currentSortKey: sort,
            onSort: setSort,
            sortKeys: []
        }}
                            loading={isLoading}
                            withAdvertisementManagement
        />
    </Container>

}