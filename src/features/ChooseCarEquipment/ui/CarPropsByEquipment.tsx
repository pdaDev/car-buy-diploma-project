import {FC} from "react";
import { NS} from 'entities/Car'
import { createOptions, useQuery, Selector} from "shared";

import './CarPropsByEquipment.scss'

interface IProps {
    equipmentIndex?: number
    equipments: NS.IServerCarEquipment[]
    defaultEquipment?: number
    loading?: boolean
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