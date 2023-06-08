import {FC, useEffect, useMemo, useRef, useState} from "react";
import {
    Container,
    ExtendedSearchData, ICarSearch,
    IServerReviewListItem,
    List, Loader,
    Stack, useClassState,
    useOnScrollPagination, usePaginationAndSorting, useQuerySearchCar
} from "../../../shared";
import {ReviewCard, useGetReviewsQuery} from "../../../entities/Review";
import {useAppNavigate} from "../../../app/services";
import {useSearchParams} from "react-router-dom";
import {NS} from 'entities/Review'
import {ReviewSearchForm} from "../../../features/ReviewsSearchForm";
import {SortBLock} from "../../../features/SortBlock";
import {ReviewRangeFilter} from "../../../features/ReviewsSearchForm/ui/ReviewRangeFilter";
import {ReviewsList} from "../../../features/ReviewsList/ui/ReviewsList";
import {useAuthorize} from "../../../entities/User/lib/hooks";
import {EMPTY_SEARCH_DATA} from "../lib/constants";

export const Reviews: FC = () => {


    const [searchData, setSearchData] = useClassState({ })
    const [finalSearchData, setFinalSearchData] = useState({})
    const { authStatus } = useAuthorize()
    const init = useRef(false)




    const {cars, onCarChange} = useQuerySearchCar()
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

        return ({generations, ...finalSearchData, models, brends: brends as number[]})
    }, [cars])

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

        setFinalSearchData({ ...car, ...searchData})
        setPage(0)
        reset()
    }

    useEffect(() => {
        refetch()
    }, [authStatus])



    const dataLoading = isLoading || isFetching
    return <Container max_w={"800px"}>
        <Stack size={'container'}
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