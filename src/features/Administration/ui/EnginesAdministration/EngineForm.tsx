import {FC} from "react";
import * as NS from '../../namespace'
import {useGetProducersQuery} from "../../api";
import {useHandbook} from "../../../../app/services/withCommonData/lib/hooks";
import {selectHandbook, selectHandbooks, useAppSelector} from "../../../../app/services";
import {useTranslation} from "react-i18next";
import {createHandbookOptions, createOptions, useMultiLanguageHandbooks} from "../../../../shared";
import {FormBuilder} from "../FormBuilder/FormBuilder";
import {apiRoutes, EMPTY_ENGINE, EMPTY_TRANSMISSION} from "../../lib/constants";
import {getCarPropsIndex} from "../../lib/helpers";
import {engineValidators} from "../../lib/validators";

export const EngineForm: FC<NS.CommonFormData<NS.IServerEngine>> = ({defaultData, close, type}) => {
    const {data: producers, isLoading} = useGetProducersQuery({type: 'options'})
    const {
        engineTypes,
        enginePowerSystems,
        fuelTypes,
        cyllinderArrangements,
        boostTypes
    } = useAppSelector(selectHandbooks)
    const {t} = useTranslation()
    const {getHandbookOptions} = useMultiLanguageHandbooks()
    const engineTypesOptions = getHandbookOptions(engineTypes)
    const enginePowerSystemOptions = getHandbookOptions(enginePowerSystems)
    const fuelTypesOptions = getHandbookOptions(fuelTypes)
    const cyllinderArrangementOptions = getHandbookOptions(cyllinderArrangements)
    const boostTypesOptions = getHandbookOptions(boostTypes)

    console.log(boostTypes, boostTypesOptions)

    const producersOptions = producers ? createOptions(producers?.results || [], 'producer_id', 'name') : []


    const config: NS.FormBuilderConfig<NS.IServerEngine> = {
        volume: {
            type: 'number'
        },
        horse_power: {
            type: 'number'
        },
        type_code: {
            type: 'selector',
            options: engineTypesOptions,
            accessor: 'handbook'
        },
        torgue: {
            type: 'number'
        },
        fuel_type_code: {
            type: 'selector',
            options: fuelTypesOptions,
            accessor: 'handbook'
        },
        cyllinder_arrangement_type_code: {
            type: 'selector',
            options: cyllinderArrangementOptions,
            accessor: 'handbook'
        },
        count_of_cyllinders: {
            type: 'counter'
        },
        count_of_clapans_on_cyllinder: {
            type: 'counter'
        },
        boost_type_code: {
            type: 'selector',
            options: boostTypesOptions,
            accessor: 'handbook'
        },
        power_system_type_code: {
            type: 'selector',
            options: enginePowerSystemOptions,
            accessor: 'handbook'
        },
        compression_ration: {
            type: 'number'
        },
        cyllinder_diameter: {
            type: 'number'
        },
        producer: {
            type: 'selector',
            options: producersOptions,
            accessor: d => d.producer.producer_id
        },
        count_of_electro_engines: {
            type: 'counter'
        },
        electro_horse_powers: {
            type: 'number'
        }


    }


    return <FormBuilder defaultData={defaultData}
                        config={config}
                        emptyData={EMPTY_ENGINE}
                        keyIndex={'engine_id'}
                        url={apiRoutes.engine}
                        validators={engineValidators}
                        title={defaultData?.name}
                        closeForm={close}
                        type={type}
                        translationIndex={getCarPropsIndex}
    />
}