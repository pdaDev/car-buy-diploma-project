import React, {FC, useEffect, useMemo, useState} from "react";
import {selectHandbooks, selectSearchGeoLocation, useAppSelector} from "../../../app/services";
import {SearchBlock} from "../../../widgets/SearchBlock/ui/SearchBlock";
import {
    BaseSearchData, Container, createRuWordEndingByNumberGetter,
    ExtendedSearchData,
    ICarSearch,
    INIT_SEARCH_DATA,
    List,
    SearchType, Stack, Text,
    useClassState, useOnScrollPagination, usePaginationAndSorting, useQuerySearchCar, useTabTile
} from "../../../shared";
import {useGetAdsMutation, useGetPreSearchDataQuery} from "../../../entities/Advertisement/api/queryAPI";
import {AdvertisementsList} from "../../../widgets/AdvertisementsList/ui/AdvertisementsList";
import {selectAuthStatus} from "../../../entities/User/model/selectors";
import {IAdvertisementListItem} from "../../../entities/Advertisement/namespace";
import {getSearchGeoLocation} from "../../../features/SelectGeoLocation/api";
import {useAuthorize} from "../../../entities/User/lib/hooks";
import {useTranslation} from "react-i18next";

export const Search: FC = () => {
    const { limit, sort, page, setPage, onSort, skeletonLoading } = usePaginationAndSorting()

    const [searchType, setSearchType] = useState<SearchType>('advertisement')


    const { authStatus } = useAuthorize()

    const [searchData, setSearchData] = useClassState<BaseSearchData | ExtendedSearchData>(INIT_SEARCH_DATA)
    const [itSearchedData, setSearchedDataStatus ] = useState(false)
    useEffect(() => {
        setSearchedDataStatus(false)
    }, [searchData])
    // @ts-ignore
    const [searchAds, {data, isLoading}] = useGetAdsMutation()
    const { cars } = useQuerySearchCar()

    const car = useMemo(() => {
        const generations = Array.from(new Set(cars
            .filter(c => c.generation_id.length > 0)
            .map(c => c.generation_id).flat()))
        const models = Array.from(new Set(cars
            .filter(c => c.model_id !== null && c.generation_id.length === 0)
            .map(c => c.model_id).flat()))
        const brends = Array.from(new Set(cars
            .filter(c => c.brend_id !== null && c.generation_id.length === 0 && c.model_id.length === 0)
            .map(c => c.brend_id).flat()))

        return ({generations, models, brends: brends as number[]})
    }, [cars])

    const { data: preSearchData, refetch: refetchPreSearch } = useGetPreSearchDataQuery(car)

    const search = async () => {
        const searchFilterData = {
            ...searchData,
            car
        }
        searchAds({
            limit,
            page,
            filters: searchFilterData as any,
            sort
        }).unwrap()

        setSearchedDataStatus(true)
    }



    useEffect(() => {
        search()
    }, [sort, authStatus, page])

    const {elements: advertisements, reset} = useOnScrollPagination<IAdvertisementListItem>({
        page,
        limit,
        count: data?.count || 0,
        sort,
        onPagination: setPage,
        data: data?.results,
        loading: isLoading
    })

    const handleSearch = () => {
        search()
        reset()
        setPage(0)
    }

    const currentSearchGeoLocation = useAppSelector(selectSearchGeoLocation)
    useEffect(() => {
        refetchPreSearch()
    }, [ authStatus, currentSearchGeoLocation])
    const { t } = useTranslation()

    const getAdsCountLabel = createRuWordEndingByNumberGetter({
        root: 'объявлен', single: {ip: 'ие', rp: 'ия'}, multiple: {value: 'ий'}
    })

    const searchButtonLabel = itSearchedData
        ?  data?.count
            ? t("search.found") +  ` ${data.count} ` + getAdsCountLabel(data.count)
            : t("search.advertisement.show") as string
        : preSearchData?.count
            ? t("search.find") + ` ${preSearchData.count} ` + getAdsCountLabel(preSearchData.count)
            : t("search.advertisement.show") as string

    useTabTile(t('pages.search'))
    return (
        <Stack size={'content'} >
            <SearchBlock type={searchType}
                         onChange={setSearchData}
                         data={searchData}
                         searchButtonLabel={searchButtonLabel}
                         setType={setSearchType}
                         search={handleSearch}
            />
            <AdvertisementsList data={advertisements}
                                loading={isLoading && skeletonLoading}
                                fetching={isLoading}
                                withFavourites
                                withDifferentAdCardType
                                sort={{
                                    currentSortKey: sort,
                                    onSort
                                }}
            />
        </Stack>
    )

}