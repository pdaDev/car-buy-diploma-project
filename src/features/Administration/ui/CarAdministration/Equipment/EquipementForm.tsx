import {FC, useState} from "react";
import * as NS from '../../../namespace'
import {FormBuilder} from "../../FormBuilder/FormBuilder";
import {apiRoutes, EMPTY_EQUIPMENT, EMPTY_GENERATION} from "../../../lib/constants";
import {selectHandbooks, useAppSelector} from "../../../../../app/services";
import {ColorMark, createOptions, IColor, IHandbookItem, Stack, useMultiLanguageHandbooks} from "../../../../../shared";
import {useGetEnginesQuery, useGetProducersQuery, useGetTransmissionsQuery} from "../../../api";
import {MaterialCard} from "./MaterialCard";
import {getCarPropsIndex} from "../../../lib/helpers";
import {equipmentValidators} from "../../../lib/validators";

interface IProps {
    generation_id: number
}

export const EquipmentForm: FC<NS.CommonFormData<NS.IServerEquipment> & IProps> = ({
                                                                                                     defaultData,
                                                                                                     close,
                                                                                                     generation_id,
                                                                                                     type }) => {

    const { suspensionType, breakType, carDrive, color, materials: materialsHandbook } = useAppSelector(selectHandbooks)
    const { getHandbookOptions, getHandbookItemName } = useMultiLanguageHandbooks()
    const suspensionTypesOptions = getHandbookOptions(suspensionType)
    const breakTypeOptions = getHandbookOptions(breakType)
    const carDriveOptions = getHandbookOptions(carDrive)
    const { data: engines, isLoading: enginesLoading } = useGetEnginesQuery({ type: 'options' })
    const { data: transmissions, isLoading: transmissionsLoading } = useGetTransmissionsQuery({ type: 'options' })

    const enginesOptions = engines ? createOptions(engines?.results || [], 'engine_id', 'name') : []
    const transmissionsOptions = transmissions ? createOptions(transmissions?.results || [], 'transmission_id', 'name') : []
    const [colors, setColor] = useState<string[]>(defaultData?.colors.map(c => c.code) || [])
    const [materials, setMaterials] = useState<string[]>(defaultData?.materials.map(c => c.code) || [])

    const toggleMaterial = (v: IHandbookItem) => {
        setMaterials(materials.includes(v.code) ? materials.filter(c => c !== v.code) : [...materials, v.code])
    }

    const toggleColor = (v: IColor) => {
        setColor(colors.includes(v.code) ? colors.filter(c => c !== v.code) : [...colors, v.code])
    }


    const config: NS.FormBuilderConfig<NS.IServerEquipment> = {
        front_suspension_code: {
            type: 'selector',
            options: suspensionTypesOptions,
            accessor: 'handbook'
        },
        front_breaks_code: {
            type: 'selector',
            options: breakTypeOptions,
            accessor: 'handbook'
        },
        drive_type_code: {
            type: 'selector',
            options: carDriveOptions,
            accessor: 'handbook'
        },
        wheel_size: {
            type: 'counter'
        },
        engine: {
            type: 'selector',
            options: enginesOptions,
            accessor: d => d.engine.id
        },
        transmission: {
            type: 'selector',
            options: transmissionsOptions,
            accessor: d => d.transmission.id
        },

    }

    return <FormBuilder defaultData={defaultData}
                        config={config}
                        extra={{ generation: generation_id, colors, materials }}
                        emptyData={EMPTY_EQUIPMENT}
                        validators={equipmentValidators}
                        keyIndex={'equipment_id'}
                        url={apiRoutes.equipment}
                        title={defaultData?.name}
                        closeForm={close}
                        type={type}
                        translationIndex={'admin.data_management.cars.equipment'}
    >
        <Stack direction={'row'} hAlign={'start'} wrap>
            { color.map(c => <ColorMark name={getHandbookItemName(c)}
                                        color={c.color}
                                        selected={colors.includes(c.code)}
                                        onClick={() => toggleColor(c)}
            />) }
        </Stack>
       <Stack direction={'row'} hAlign={'start'} wrap>
           {
               materialsHandbook.map(m => <MaterialCard name={getHandbookItemName(m)}
                                                        selected={materials.includes(m.code)}
                                                        onSelect={() => toggleMaterial(m)}
               />)
           }
       </Stack>

    </FormBuilder>
}

