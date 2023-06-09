import {FC, useState} from "react";
import {useTranslation} from 'react-i18next'
import {
    Button,
    createOptions,
    EMPTY_CAR_SEARCH_FILTER,
    ICarSearch,
    SelectedCar,
    Stack
} from "../../../shared";
import {selectBrends, selectGenerations, selectModels, useAppSelector} from "../../../app/services";
import {Selector} from "../../../shared/ui/Selector/Selector";

interface IProps {
    data: ICarSearch[] | ICarSearch | SelectedCar
    onSearchChange: Function
    withCarBodyType?: boolean
    withEquipment?: boolean
}


export const CarSearchBlock: FC<IProps> = ({
                                               onSearchChange,
                                               data,
                                               withEquipment= false,
                                               withCarBodyType = false

                                           }) => {
    const brends = useAppSelector(selectBrends)
    const withMulptiledata = Array.isArray(data)
    const models = useAppSelector(selectModels)
    const generations = useAppSelector(selectGenerations)
    const {t} = useTranslation()
    const addCarSearchFilter = () => {
        onSearchChange(withMulptiledata && [...data, EMPTY_CAR_SEARCH_FILTER])
    }

    const removeCarSearchFilter = (index: number) => {
        if (withMulptiledata && data.length > 1)
            onSearchChange(data.filter((_, i) => i !== index))
    }

    const patchCarSearch = (car: ICarSearch, index?: number) => {
        if (withMulptiledata && index !== undefined) {
            onSearchChange(data.map((filter, i) => i === index ? car : filter))
        } else {
            onSearchChange(car)
        }
    }

    return <Stack spacing={3} size={'width'}>
        {
            (withMulptiledata ? data : [data]).map((carsSearchFilter, index) => {
                    const brend = carsSearchFilter.brend_id
                    const model = carsSearchFilter.model_id
                    const generation = carsSearchFilter.generation_id
                    const withMultipleModels = Array.isArray(model)
                    const withMultipleGenerations = Array.isArray(generation)
                    const brendsOptions = createOptions(brends, 'brend_id')
                    const availableGenerations = generations.filter(gen => withMultipleModels ? model.includes(gen.model) : gen.model === model)
                    const availableModels = models.filter(model => model.brend === brend)
                    const generationOptions = createOptions(availableGenerations, 'generation_id')
                    const modelsOptions = createOptions(availableModels, 'model_id')
                    const emptyModels = withMultipleModels ? [] : null
                    const emptyGenerations = withMultipleGenerations ? [] : null

                    const setModel = (value: number | null | number[]) => {
                        const availableGenerations = generations
                            .filter(gen => withMultipleModels ? (value as number[]).includes(gen.model) : gen.model === value)
                            .map(gen => gen.generation_id)
                        const currentGeneration = withMultipleModels
                            ? withMultipleGenerations
                                ? generation.filter(gen => availableGenerations.includes(gen))
                                : availableGenerations.includes(generation || -1)
                                    ? generation
                                    : emptyGenerations
                            : emptyGenerations
                        // @ts-ignore
                        patchCarSearch({brend_id: brend, model_id: value, generation_id: currentGeneration}, index)
                    }

                    const setGeneration = (value: number | null) => {
                        // @ts-ignore
                        patchCarSearch({model_id: model, generation_id: value, brend_id: brend}, index)
                    }
                    const setBrend = (value: number | null) => {
                        const availableModels = models
                            .filter(model => model.brend === value)
                            .map(model => model.model_id)
                        const currentModel = withMultipleModels
                            ? model.filter(m => availableModels.includes(m))
                            : availableModels.includes(model || -1)
                                ? model
                                : emptyModels
                        const availableGenerations = generations
                            .filter(gen => withMultipleModels ? (currentModel as number[]).includes(gen.model) : gen.model === currentModel)
                            .map(gen => gen.generation_id)
                        const currentGeneration = withMultipleModels
                            ? withMultipleGenerations
                                ? generation.filter(gen => availableGenerations.includes(gen))
                                : availableGenerations.includes(generation || -1)
                                    ? generation
                                    : emptyGenerations
                            : emptyGenerations

                        // @ts-ignore
                        patchCarSearch({brend_id: value, model_id: currentModel, generation_id: currentGeneration}, index)
                    }

                    return (
                        <Stack direction={'row'} spacing={3} size={'width'} key={index}>
                            <Selector placeholder={t("car.brend.title") as string}
                                      options={brendsOptions}
                                      current={brend}
                                      onChange={setBrend}/>
                            <Selector placeholder={t("car.model.title") as string}
                                      options={modelsOptions}
                                      current={model}
                                      onChange={setModel}
                            />
                            <Selector placeholder={t("car.generation.title") as string}
                                      options={generationOptions}
                                      current={generation}
                                      onChange={setGeneration}
                            />
                            {withMulptiledata && data.length > 1 &&
                                <Button type={'primary'} onClick={() => removeCarSearchFilter(index)} label={'x'}/>}
                            {withMulptiledata && index === data.length - 1 &&
                                <Button type={'primary'} label={'+'} onClick={addCarSearchFilter}/>}
                        </Stack>
                    )
                }
            )
        }
    </Stack>
}