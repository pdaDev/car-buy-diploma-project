import React, {FC, useEffect, useState} from "react";
import {selectHandbook, useAppDispatch, useAppSelector} from "app/services";
import {selectors} from 'entities/User'
import {useGetAdsMutation, useGetMyAdsQuery} from "../../../entities/Advertisement/api/queryAPI";
import {AdvertisementsList} from "../../../widgets/AdvertisementsList";
import {MotivationBlock} from "../../../shared/ui/MotivationBlock/MotivationBlock";
import {useTranslation} from "react-i18next";
import {openModal} from "../../../app/services/withPopupProvider";
import {
    Container,
    IHandbookItem,
    sortList,
    Label,
    Stack,
    useMultiLanguageHandbooks,
    useTabTile,
    IOption, Switcher, sorter, CircleDiagram, useNavigationPermission
} from "../../../shared";

import {SortBLock} from "../../../features/SortBlock";
import {IAdvertisementListItem} from "../../../entities/Advertisement/namespace";
import {useAuthorize} from "../../../entities/User/lib/hooks";
import {AuthMotivation} from "../../../features/Auth/ui/AuthMotivation/AuthMotivation";
import {AdvertisementsAnalyze} from "./AdvertisementsAnalyze";

export const Garage: FC = () => {
    const {authStatus} = useAuthorize()
    const {t} = useTranslation()
    useTabTile(t("pages.garage") as string)
    const statuses = useAppSelector(selectHandbook('adStatus'))
    const {getHandbookOptions} = useMultiLanguageHandbooks()
    const statusesOptions: IOption[] = getHandbookOptions(statuses as IHandbookItem[])
    const switcherOptions = [
        {value: 'all', label: t("advertisement.all")},
        ...statusesOptions
    ]

    const {isLoading, data, refetch} = useGetMyAdsQuery()
    const [status, setStatus] = useState('all')
    useEffect(() => {
        refetch()
    }, [authStatus, refetch])


    let ads = data || []

    if (!isLoading && ads.length === 0 && authStatus) {
        return <MotivationBlock handleAction={() => {
        }}
                                buttonLabel={t("motivate.garage.createAd.button") as string}
                                message={t("motivate.garage.createAd.message") as string}
        />
    }


    ads = status !== 'all' ? ads.filter(ad => ad.status_code.code === status) : ads

    return <AuthMotivation translationKey={'garage'}>
        <Container max_w={'800px'}>
            <Stack spacing={4} vAlign={'start'} size={'container'}>
                <Label label={t("pages.garage")} level={1} weight={'medium'}/>
                <AdvertisementsAnalyze advertisements={data || []}
                                       loading={isLoading}
                                       statuses={statusesOptions}/>
                <AdvertisementsList data={ads}
                                    loading={isLoading}
                                    withAdvertisementManagement
                                    withStatusMark
                                    sort={{
                                        sortKeys: ['price', 'start_date'],
                                        withFrontSideSorting: true
                                    }}
                                    extraOptions={
                                        <Switcher options={switcherOptions}
                                                  activeOptions={status}
                                                  onChange={setStatus}/>
                                    }
                />
            </Stack>
        </Container>
    </AuthMotivation>

}