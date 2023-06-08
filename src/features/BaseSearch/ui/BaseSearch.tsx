import {FC} from "react";
import {
    BaseSearchData,
    EMPTY_CAR_SEARCH_FILTER, filtersCreator,
    Grid,
    RangeInput,
    SearchType,
    setContainsFilterCreator,
    setRangeFilterCreator, Stack, useQuerySearchCar
} from "shared";
import {BrendItem} from "./BrendItem";
import {CarClassItem} from "./CarClassItem";
import {TagItem} from "./TagItem";

import s from './BaseSearch.module.scss'
import {selectBrends, selectHandbooks, useAppSelector} from "../../../app/services";
import {current} from "@reduxjs/toolkit";
import {useGetPopularBrendsQuery} from "../../../entities/Car";

interface IProps {
    type: SearchType;
    onChange: (obj: Partial<BaseSearchData>) => void;
    data: BaseSearchData;
}

export const BaseSearch: FC<IProps> = ({
                                           type,
                                           onChange,
                                           data,
                                       }) => {
    const {containsFilter, rangeFilter} = filtersCreator(data, onChange)
    const {carTag, carClass: carClasses} = useAppSelector(selectHandbooks)
    const {data: brends = []} = useGetPopularBrendsQuery(undefined)
    const {cars, onCarChange} = useQuerySearchCar()


    const toggleBrend = (brend: number) => {
        onCarChange(
            cars.find(c => c.brend_id === brend)
                ? cars.filter(c => c.brend_id !== brend)
                : [...cars, {...EMPTY_CAR_SEARCH_FILTER, brend_id: brend}]
        )
    }

    return <div className={s.base_search}>
        <div className={s.brends_panel_wrapper}>
            <div className={s.brends_panel}>
                {brends && brends.map(brend => <BrendItem
                    logo={brend.logo}
                    name={brend.name}
                    selected={!!cars.find(c => c.brend_id === brend.brend_id)}
                    onClick={() => toggleBrend(brend.brend_id)}
                    key={brend.brend_id}
                />)}
            </div>
        </div>
        <Grid rows={2} cols={4} container gap={4}>
            {carClasses && carClasses.map(carClass => <CarClassItem name={carClass.code}
                                                                    description={carClass.ru_name}
                                                                    selected={data.carClass.includes(carClass.code)}
                                                                    key={carClass.code}
                                                                    onClick={() => containsFilter('carClass')(carClass.code)}
            />)}
        </Grid>
        <Stack direction={'row'} hAlign={'start'} wrap spacing={3}>
            {carTag && carTag.map(tag => <TagItem onClick={() => containsFilter('tag')(tag.code)}
                                                  key={tag.code}
                                                  selected={data.tag.includes(tag.code)}
                                                  name={tag.ru_name}

            />)}
        </Stack>

        {type === 'advertisement' && (
            <RangeInput min={0}
                        max={100000000}
                        type='multiple'
                        onChange={rangeFilter('price')}/>
        )}
    </div>
}