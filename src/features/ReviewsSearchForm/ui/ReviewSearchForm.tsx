import {FC} from "react";
import {CarSearchBlock} from "../../ExtendedSearch/ui/CarSeachBlock";
import {
    Button,
    Card, Container,
    filtersCreator,
    ICarSearch,
    Label,
    RangeInput,
    Stack,
    useOpenStatus,
    useQuerySearchCar
} from "../../../shared";
import {useTranslation} from "react-i18next";
import {NS} from 'entities/Review'
import {IReviewSearchData} from "../../../entities/Review/namespace";
import {useForm} from "react-hook-form";
import {F} from "@storybook/react-webpack5/dist/types-6a41b796";
import {ReviewRangeFilter} from "./ReviewRangeFilter";

interface IProps {
    data: NS.IReviewSearchData
    onSearchChange: (data: Partial<IReviewSearchData>) => void
    search: Function
    resetForm: Function
}

export const ReviewSearchForm: FC<IProps> = ({data, onSearchChange, search, resetForm}) => {
    const {t} = useTranslation()
    const {rangeFilter} = filtersCreator(data, onSearchChange)
    const [isFormFullOpen, , toggleForm] = useOpenStatus()
    const {cars, onCarChange} = useQuerySearchCar()


    return <Card paddings={4} width={'100%'}>
        <Container>
            <Stack size={'width'} spacing={4}>
                <CarSearchBlock data={cars} onSearchChange={onCarChange}/>
                <ReviewRangeFilter rangeFilter={rangeFilter} data={data} filterKey={'score'}/>
                {isFormFullOpen && <>
                    <ReviewRangeFilter rangeFilter={rangeFilter} data={data} filterKey={'contrallabilty_point'}/>
                    <ReviewRangeFilter rangeFilter={rangeFilter} data={data} filterKey={'safety_point'}/>
                    <ReviewRangeFilter rangeFilter={rangeFilter} data={data} filterKey={'cross_country_point'}/>
                    <ReviewRangeFilter rangeFilter={rangeFilter} data={data} filterKey={'economic_point'}/>
                    <ReviewRangeFilter rangeFilter={rangeFilter} data={data} filterKey={'reliable_point'}/>
                </>}
                <Stack size={'width'} hAlign={'center'} direction={'row'}>
                    <Button type={'underline'}
                            onClick={toggleForm as any}
                            label={t(`review.search_form.${isFormFullOpen ? 'hide' : 'open'}`) as string}
                    />
                </Stack>
                <Stack direction={'row'} spacing={4} size={'width'}>
                    <Button type={'secondary'}
                            width={'100%'}
                            label={t("search.reset") as string}
                            onClick={resetForm}
                    />
                    <Button type={'primary'}
                            width={'100%'}
                            label={t("search.label") as string}
                            onClick={search}
                    />
                </Stack>
            </Stack>
        </Container>

    </Card>
}