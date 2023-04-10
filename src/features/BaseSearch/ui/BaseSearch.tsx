import {FC} from "react";
import {
    BaseSearchData,
    EMPTY_CAR_SEARCH_FILTER, filtersCreator,
    Grid,
    RangeInput,
    SearchType,
    setContainsFilterCreator,
    setRangeFilterCreator, Stack
} from "shared";
import {BrendItem} from "./BrendItem";
import {CarClassItem} from "./CarClassItem";
import {TagItem} from "./TagItem";

import s from './BaseSearch.module.scss'
import {selectBrends, selectHandbooks, useAppSelector} from "../../../app/services";

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
    const { containsFilter, rangeFilter } = filtersCreator(data, onChange)
    const {carTag, carClass: carClasses} = useAppSelector(selectHandbooks)
    const brends = useAppSelector(selectBrends)




    const toggleBrend = (brend: number) => {
        onChange({
            car: data.car.find(c => c.brend_id === brend)
                ? data.car.filter(c => c.brend_id !== brend)
                : [...data.car, {...EMPTY_CAR_SEARCH_FILTER, brend_id: brend}]
        })
    }

    console.log("render")

    return <div className={s.base_search}>
        <div className={s.brends_panel_wrapper}>
            <div className={s.brends_panel}>
                {brends && brends.map(brend => <BrendItem
                    name={brend.name}
                    selected={!!data.car.find(c => c.brend_id === brend.brend_id)}
                    onClick={() => toggleBrend(brend.brend_id)}
                    key={brend.brend_id}
                />)}
            </div>
        </div>
        <Grid rows={2} cols={4} container gap={3}>
            {carClasses && carClasses.map(carClass => <CarClassItem name={carClass.code}
                                                                    description={carClass.ru_name}
                                                                    selected={data.carClass.includes(carClass.code)}
                                                                    key={carClass.code}
                                                                    onClick={() => containsFilter('carClass')(carClass.code)}
            />)}
        </Grid>
        <Stack direction={'row'} hAlign={'start'} spacing={3}>
            {carTag && carTag.map(tag => <TagItem onClick={() => containsFilter('tag')(tag.code)}
                                                  key={tag.code}
                                                  selected={data.tag.includes(tag.code)}
                                                  name={tag.ru_name}

            />)}
        </Stack>

        {type === 'advertisement' && (
            <RangeInput min={0} current={data.price} max={100000000} type='multiple' onChange={rangeFilter('price')}/>
        )}
    </div>
}