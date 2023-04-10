import {FC, useState} from "react";
import { useTranslation } from 'react-i18next'
import {Button, createOptions, EMPTY_CAR_SEARCH_FILTER, ExtendedSearchData, ICarSearch, Stack} from "../../../shared";
import {selectBrends, selectGenerations, selectModels, useAppSelector} from "../../../app/services";
import {Selector} from "../../../shared/ui/Selector/Selector";

interface IProps {
    data: ExtendedSearchData['car']
    onSearchChange: Function
}



export const CarSearchBlock: FC<IProps> = ({
                                               onSearchChange, data
                                           }) => {
    const brends = useAppSelector(selectBrends)
    const models = useAppSelector(selectModels)
    const generations = useAppSelector(selectGenerations)
    const { t } = useTranslation()
    const addCarSearchFilter = () => {
        onSearchChange({car: [...data, EMPTY_CAR_SEARCH_FILTER]})
    }

    const removeCarSearchFilter = (index: number) => {
        if (data.length > 1)
            onSearchChange({car: data.filter((_, i) => i !== index)})
    }

    const patchCarSearch = (value: number | null, index: number, key: keyof ICarSearch) => {
        onSearchChange({car: data.map((filter, i) => i === index ? {...filter, [key]: value} : filter)})
    }

    return <Stack spacing={3} size={'container'}>
        {
            data.map((carsSearchFilter, index) => {
                    const brend = carsSearchFilter.brend_id
                    const model = carsSearchFilter.model_id
                    const generation = carsSearchFilter.generation_id
                    const brendsOptions = createOptions(brends, 'brend_id')
                    const generationOptions = createOptions(generations.filter(gen => model.includes(gen.model)), 'generation_id')
                    const modelsOptions = createOptions(models.filter(model => model.brend === brend), 'model_id')

                    const setModel = (value: number | null) => {
                        patchCarSearch(value, index, 'model_id')
                    }

                    const setGeneration = (value: number | null) => {
                        patchCarSearch(value, index, 'generation_id')
                    }
                    const setBrend = (value: number | null) => {
                        patchCarSearch(value, index, 'brend_id')
                    }

                    return (
                        <Stack direction={'row'} spacing={3} size={'container'} key={index}>
                            <Selector placeholder={t("car.brend") as string} options={brendsOptions} current={brend}
                                      onChange={setBrend}/>
                            <Selector placeholder={t("car.model") as string} options={modelsOptions} current={model}
                                      onChange={setModel}/>
                            <Selector placeholder={t("car.generation") as string} options={generationOptions} current={generation}
                                      onChange={setGeneration}/>
                            {data.length > 1 &&
                                <Button type={'primary'} onClick={() => removeCarSearchFilter(index)} label={'x'}/>}
                            {index === data.length - 1 &&
                                <Button type={'primary'} label={'+'} onClick={addCarSearchFilter}/>}
                        </Stack>
                    )
                }
            )
        }
    </Stack>
}