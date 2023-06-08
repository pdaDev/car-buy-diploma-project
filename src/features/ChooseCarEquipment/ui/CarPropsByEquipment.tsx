import {FC, useEffect, useState} from "react";
import {Selector} from "../../../shared/ui/Selector/Selector";
import {CarPropBlock, NS} from 'entities/Car'
import {Box, Card, Container, createOptions, Label, Stack, useQuery} from "../../../shared";
import {useTranslation} from "react-i18next";
import './CarPropsByEquipment.scss'

interface IProps {
    equipmentIndex?: number
    equipments: NS.IServerCarEquipment[]
    defaultEquipment?: number
    optionsPos?: 'bottom' | "top"

}

export const CarPropsByEquipment: FC<IProps> = ({
                                                    equipments,
                                                    equipmentIndex,
                                                    optionsPos,
                                                    defaultEquipment,
                                                }) => {


    const equipmentsOption = createOptions(equipments, 'id', 'name')
    const [query, setQuery] = useQuery()
    const equipmentKey = equipmentIndex ? `equipment-${equipmentIndex}` : 'equipment'
    const onEquipmentChange = (v: number) => {
        setQuery({[equipmentKey]: v})
    }

    const currentEquipment = Number(query.get(equipmentKey)) || defaultEquipment

    return <Selector options={equipmentsOption}
                     current={currentEquipment}
                     classNamePrefix={'equipment'}
                     position={optionsPos}
                     onChange={onEquipmentChange}
    />
}