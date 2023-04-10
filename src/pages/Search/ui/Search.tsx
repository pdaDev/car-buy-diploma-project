import React, {FC, useEffect, useState} from "react";
import {selectHandbooks, useAppSelector} from "../../../app/services";
import {SearchBlock} from "../../../widgets/SearchBlock/ui/SearchBlock";
import {
    BaseSearchData, Container,
    ExtendedSearchData,
    ICarSearch,
    INIT_SEARCH_DATA,
    List,
    SearchType, Stack, Text,
    useClassState
} from "../../../shared";
import {useGetAdsMutation} from "../../../entities/Advertisement/api/queryAPI";
import {AdvertisementsList} from "../../../widgets/AdvertisementsList/ui/AdvertisementsList";
import {selectAuthStatus} from "../../../entities/User/model/selectors";

export const Search: FC = () => {

    const {carClass, carTag} = useAppSelector(selectHandbooks)
    const limitPage = 10;
    const [page, setPage] = useState(0)
    const [searchType, setSearchType] = useState<SearchType>('advertisement')
    const [sort, setSort] = useState<null>(null)
    const authStatus = useAppSelector(selectAuthStatus)

    const [searchData, setSearchData] = useClassState<BaseSearchData | ExtendedSearchData>(INIT_SEARCH_DATA)
    const [searchAds, {data, isLoading}] = useGetAdsMutation()

    const search = async () => {
        const generations = Array.from(new Set((searchData as ExtendedSearchData).car
            .filter(c => c.generation_id.length > 0)
            .map(c => c.generation_id).flat()))
        const models = Array.from(new Set((searchData as ExtendedSearchData).car
            .filter(c => c.model_id !== null && c.generation_id.length === 0)
            .map(c => c.model_id).flat()))
        const brends = Array.from(new Set((searchData as ExtendedSearchData).car
            .filter(c => c.brend_id !== null && c.generation_id.length === 0 && c.model_id.length === 0)
            .map(c => c.brend_id).flat()))

        const searchFilterData = {
            ...searchData,
            car: {
                generations,
                models,
                brends
            }
        }
        searchAds({
            limit: limitPage,
            page,
            filters: searchFilterData as any,
            sort
        }).unwrap()
    }

    useEffect(() => {
        search()
    }, [sort, authStatus])

    return (
        <Stack size={'content'} >
            <SearchBlock type={searchType}
                         onChange={setSearchData}
                         data={searchData}
                         setType={setSearchType}
                         search={search}
            />
            <AdvertisementsList data={data?.results}
                                loading={isLoading}
                                withFavourites
                                withDifferentAdCardType
                                sort={{
                                    currentSortKey: sort,
                                    onSort: setSort as any
                                }}
            />
        </Stack>
    )

}