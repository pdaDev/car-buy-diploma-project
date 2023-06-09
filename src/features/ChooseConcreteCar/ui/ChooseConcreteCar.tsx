import {FC, useEffect, useState} from "react";
import {
    Card,
    CarWithEquipmentAndCarBodyType,
    createMultiLanguageOptions,
    createOptions, getTranslationIndexCreator, IOption, Label, Stack,
    useClassState
} from "../../../shared";
import {string} from "prop-types";
import {use} from "i18next";
import {
    useGetCarEquipmentsAndGenerationVariantsQuery,
        useGetCarGenerationsQuery, useGetCarIdQuery,
    useGetCarModelsQuery
} from "../../../entities/Car";
import {selectBrends, useAppSelector} from "../../../app/services";
import {useTranslation} from "react-i18next";
import {Selector} from "../../../shared/ui/Selector/Selector";
import {set} from "react-hook-form";

interface IProps {
    onFinish: Function
}

type CarPropTypeId = number | null
export const ChooseConcreteCar: FC<IProps> = ({ onFinish }) => {

    const [brend, setBrend] = useState<CarPropTypeId>(null)
    const [model, setModel] = useState<CarPropTypeId>(null)
    const [generation, setGeneration] = useState<CarPropTypeId>(null)
    const [equipment, setEquipment] = useState<CarPropTypeId>(null)
    const [generationVariant, setGenVariant] = useState<CarPropTypeId>(null)
    const onSelectGenerationVariant = (value: CarPropTypeId) => {
        setGenVariant(value)
        if (car) {
            onFinish(null)
        }
    }
    const {i18n: {language}} = useTranslation()
    const isRussian = language === 'ru'
    const brends = useAppSelector(selectBrends) || []
    const {data: models, isLoading: modelsLoading} = useGetCarModelsQuery(brend!, {skip: !brend})
    const {
        data: generations,
        isLoading: generationsLoading
    } = useGetCarGenerationsQuery(model!, {skip: !model})
    const {
        data: equipmentsAndGenVariants,
        isLoading: equipmentsLoading
    } = useGetCarEquipmentsAndGenerationVariantsQuery(generation!, {skip: !generation})


    const {data: car, isLoading: carLoading}
        = useGetCarIdQuery({
        generation_variant: generationVariant!,
        equipment: equipment!
    }, {skip: !equipment || !generationVariant})

    const isLoading = modelsLoading || carLoading
        || equipmentsLoading || generationsLoading

    const equipments = equipmentsAndGenVariants ? equipmentsAndGenVariants.equipments : []
    const generationVariants = equipmentsAndGenVariants ? equipmentsAndGenVariants.generation_variants : []

    useEffect(() => {
        if (equipmentsAndGenVariants?.generation_variants.length === 1) {
            setGenVariant(equipmentsAndGenVariants.generation_variants[0].generation_variant_id)
        }
    }, [equipmentsAndGenVariants])

    const onSelectBrend = (value: CarPropTypeId) => {
        setBrend(value)
        setEquipment(null)
        setModel(null)
        setGeneration(null)
        setGenVariant(null)
        if (car) {
            onFinish(null)
        }
    }

    const onSelectModel = (value: CarPropTypeId) => {
        setModel(value)
        setGeneration(null)
        setEquipment(null)
        setGenVariant(null)
        if (car) {
            onFinish(null)
        }
    }
    const onSelectGeneration = (value: CarPropTypeId) => {
        setGeneration(value)
        setEquipment(null)
        setGenVariant(null)
        if (car) {
            onFinish(null)
        }
    }

    const onSelectEquipment = (value: CarPropTypeId) => {
        setEquipment(value)
        if (car) {
            onFinish(null)
        }
    }

    useEffect(() => {
        if (car) {
            onFinish(car)
        }
    }, [car])

    const brendsOptions = createOptions(brends, "brend_id", 'name')
    const modelsOptions = createOptions(models, 'model_id', 'name')
    const generationsOptions = createOptions(generations, 'generation_id', 'name')
    const equipmentsOptions = createOptions(equipments, 'equipment_id', 'name')
    const carBodyTypesOptions = generationVariants.map(genV => ({
        value: genV.generation_variant_id,
        label: genV.car_body_type_code[isRussian ? 'ru_name' : 'eng_name']
    } as IOption))
    const getCarIndex = getTranslationIndexCreator('car')
    const { t } = useTranslation()

    return (
        <Stack size={'container'} spacing={4} direction={'row'}>
            <Selector options={brendsOptions}
                      current={brend}
                      title={t(getCarIndex("brend.title")) as string}
                      onChange={onSelectBrend} />
            <Selector options={modelsOptions}
                      current={model}
                      title={t(getCarIndex("model.title")) as string}
                      onChange={onSelectModel}
            />
            <Selector options={generationsOptions}
                      current={generation}
                      title={t(getCarIndex("generation.title")) as string}
                      onChange={onSelectGeneration}
            />
            <Selector options={equipmentsOptions}
                      current={equipment}
                      title={t(getCarIndex("equipment.title")) as string}
                      onChange={onSelectEquipment}
            />

            {(generationVariants).length >= 2 && <>
                <Selector options={carBodyTypesOptions}
                          current={generationVariant}
                          title={t(getCarIndex("car_body_type")) as string}
                          onChange={onSelectGenerationVariant}/>
            </>}
        </Stack>
    )

}