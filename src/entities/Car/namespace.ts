import {ICarName, IHandbookItem} from "../../shared";

export interface IServerCarProps {
    common: {
        car_class: IHandbookItem
        doors_count: number
        places_count: number
    }
    sizes: {
        length: number
        width: number
        height: number
        clearance: number
        wheel_size: number | string
    }
    volume_and_weight: {
        trunk_volume: string
        fuel_tank_volume: number
        wight: number
    }
    transmission: {
        type: IHandbookItem,
        count_of_gears: number
        drive_type: IHandbookItem
    }
    suspension_and_breaks: {
        front_breaks: IHandbookItem
    }
    performance_indicators: {
        max_speed: number
        fuel_consumption: number
        fuel: number
        ecological_class: number
        acceleration: number
    }
    engine: {
        fuel_type_code: IHandbookItem
        power_system_type_code: IHandbookItem
        cyllinder_arrangement_type_code: IHandbookItem
        boost_type_code: IHandbookItem
    }
}


type parse<T> = T extends object ? keyof T : never
export type CarProps = parse<IServerCarProps[keyof IServerCarProps]>
export interface ICarPropDescription {
    title: string
    message: string
    image?: string | null
}

export interface IServerCarEquipment {
    name: string
    id: number
}

