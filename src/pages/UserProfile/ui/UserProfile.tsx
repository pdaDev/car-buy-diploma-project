import React, {FC, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../app/services";
import {getAnotherUserProfileData, getUserName, selectors} from 'entities/User'
import {useParams} from "react-router-dom";
import {ProfileUserCard} from "../../../entities/User/ui/ProfileUserCard/ProfileUserCard";
import {Container, Stack, Switcher, useTabTile} from "../../../shared";
import {AdvertisementsList} from "../../../widgets/AdvertisementsList";
import {useTranslation} from "react-i18next";
export const UserProfile: FC = () => {
    const d = useAppDispatch()
    const { id } = useParams()
    const data = useAppSelector(selectors.selectAnotherUser)
    const loading = useAppSelector(selectors.selectUserDataLoadingStatus)
    const [loadingStatus, setLoadingStatus] = useState(true)
    const { t } = useTranslation()

    useEffect(() => {
        if (id) {
            // @ts-ignore
            d(getAnotherUserProfileData(id as any))
        }
    },[id])

    useEffect(() => {
        if (data.data.firstName && !loading) {
            setLoadingStatus(false)
        } else {
            setLoadingStatus(true)
        }
    }, [data, loading])

    useTabTile(t("pages.profile") + getUserName('full', data.data.firstName, data.data.secondName), )

    return <Container max_w={'800px'}>
        <Stack spacing={4} size={'container'}>
            <ProfileUserCard  type={'another'}
                              loading={loadingStatus}
                              {...data.data}/>
            { data && data.advertisements.length === 0 && !loadingStatus ? null :  <AdvertisementsList data={data.advertisements}
                                                                     loading={loadingStatus}
                                                                     sort={{
                                                                         sortKeys: ['price', 'start_date'],
                                                                         withFrontSideSorting: true
                                                                     }}
            /> }
        </Stack>
    </Container>
}
