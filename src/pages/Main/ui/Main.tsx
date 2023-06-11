import {FC, useEffect} from "react";
import {selectInitializedStatus, useAppDispatch, useAppSelector} from "app/services";
import {makeHeaderNormal, makeHeaderTransparent} from "app/services/withCommonLayout/model/slice";
import {useTranslation} from "react-i18next";
import {
    Container,
    getTranslationIndexCreator,
    Stack,
    useOnScrollPagination, usePaginationAndSorting, useTabTile
} from "shared";
// @ts-ignore
import promo from './image 6.png'

import {
    useGetAdsMutation, useGetHistoryElsMutation,
    useGetHistoryQuery,
} from "entities/Advertisement";
import {AdvertisementSlider} from "features/AdvertisementSlider";
import {selectAuthStatus} from "entities/User/model/selectors";
import {AdvertisementsList} from "widgets/AdvertisementsList";
import {MainPageBanner} from "features/MainPageBanner/ui/MainPageBanner";
import {RenderContent} from "./RenderContent";
import {PreTestModal} from "features/Test";

export const MainPage: FC = () => {
    const d = useAppDispatch()
    const initStatus = useAppSelector(selectInitializedStatus)

    useEffect(() => {
        d(makeHeaderTransparent())
        return () => {
            d(makeHeaderNormal())
        }
    }, [d])
    const {t} = useTranslation()
    useTabTile(t('pages.main'))

    const authStatus = useAppSelector(selectAuthStatus)
    const {data: ads, isLoading} = useGetHistoryQuery({}, {skip: !authStatus})
    // const {data: recommendedAds = [], isLoading: recommendationsLoading} = useGetRecommendationsQuery({},{ skip: !authStatus })
    const [getAds, {data: recentAds, isLoading: recentAdsLoading}] = useGetAdsMutation()

    const [getHistoryEls, {data: historyEls = []}] = useGetHistoryElsMutation()


    const {limit, page, setPage, skeletonLoading} = usePaginationAndSorting()

    useEffect(() => {
        if (!authStatus && initStatus) {
            getHistoryEls()
        }
    }, [authStatus, initStatus])

    useEffect(() => {
        if (initStatus)
            getAds({sort: 'start_date', filters: null, page, limit})
    }, [authStatus, page, initStatus])


    const {elements: recent} = useOnScrollPagination({
        data: recentAds?.results,
        loading: recentAdsLoading,
        sort: null,
        limit,
        page,
        count: recentAds?.count || 0,
        onPagination: setPage
    })


    const getMainIndex = getTranslationIndexCreator('main')
    const loadingStatus = isLoading
    const history = authStatus ? (ads || []) : (historyEls?.results || [])

    return <Container position={"top-middle"}>
        <Stack spacing={0} size={'container'} hAlign={'center'}>
            <MainPageBanner/>
            <Container max_w={'1200px'}>
                <Stack size={'width'} spacing={5} hAlign={'center'}>
                    {<>
                        <RenderContent title={getMainIndex("history")}>
                            <AdvertisementSlider data={history}
                                                 countOfVisible={5}
                                                 loading={loadingStatus}/>
                        </RenderContent>
                    </>}
                    <RenderContent title={getMainIndex('recent')}>
                        <AdvertisementsList data={recent as any}
                                            loading={skeletonLoading && recentAdsLoading}
                                            fetching={recentAdsLoading}
                                            cols={5}
                                            withFavourites
                                            carType={'small'}

                        />
                    </RenderContent>
                </Stack>
            </Container>
        </Stack>
        <PreTestModal/>
    </Container>
}