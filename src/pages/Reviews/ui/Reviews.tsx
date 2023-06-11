import {FC, useEffect, useRef, useState} from "react";
import {
    Container,
    IServerReviewListItem,
    Stack, useClassState,
    useOnScrollPagination, usePaginationAndSorting, useQuerySearchCar
} from "shared";
import {useGetReviewsQuery} from "entities/Review";
import {NS} from 'entities/Review'
import {ReviewSearchForm} from "features/ReviewsSearchForm";
import {ReviewsList} from "features/ReviewsList";
import {useAuthorize} from "entities/User/lib/hooks";

export const Reviews: FC = () => {


    const [searchData, setSearchData] = useClassState({})
    const [finalSearchData, setFinalSearchData] = useState({})
    const {authStatus} = useAuthorize()
    const init = useRef(false)


    const {cars, onCarChange} = useQuerySearchCar()

    const generations = Array.from(new Set(cars
        .filter(c => c.generation_id.length > 0)
        .map(c => c.generation_id).flat()))
    const models = Array.from(new Set(cars
        .filter(c => c.model_id !== null && c.generation_id.length === 0)
        .map(c => c.model_id).flat()))
    const brends = Array.from(new Set(cars
        .filter(c => c.brend_id !== null && c.generation_id.length === 0 && c.model_id.length === 0)
        .map(c => c.brend_id).flat()))

    const car = {generations, ...finalSearchData, models, brends: brends as number[]}


    useEffect(() => {
        if (!init.current && car) {
            setFinalSearchData(car)
            init.current = true
        }

    }, [init, car])


    const {page, limit, setPage, sort, onSort, skeletonLoading} = usePaginationAndSorting()
    const {data, isLoading, isFetching, refetch} =
        useGetReviewsQuery(
            {limit, ...finalSearchData, offset: page, sort} as any,
        )


    const paginationProps = {
        data: data?.results,
        loading: isLoading || isFetching,
        page: page,
        onPagination: setPage,
        sort,
        limit,
        count: data?.count || 0
    }

    const {elements: reviews, reset} = useOnScrollPagination<IServerReviewListItem>(paginationProps)

    const resetFormData = () => {
        setSearchData({})
        onCarChange([])
    }

    const search = () => {

        setFinalSearchData({...car, ...searchData})
        setPage(0)
        reset()
    }

    useEffect(() => {
        refetch()
    }, [authStatus])


    const dataLoading = isLoading || isFetching
    return <Container max_w={"800px"}>
        <Stack size={'width'}
               spacing={4}
               vAlign={'start'}>
            <ReviewSearchForm data={searchData as NS.IReviewSearchData}
                              search={search}
                              resetForm={resetFormData}
                              onSearchChange={setSearchData as any}/>
            <ReviewsList data={reviews}
                         fetching={dataLoading}
                         withDifferentReviewCardType
                         loading={dataLoading && skeletonLoading}
                         sort={{
                             currentSortKey: sort,
                             onSort: onSort
                         }}
            />
        </Stack>

    </Container>
}