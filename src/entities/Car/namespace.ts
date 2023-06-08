import {
    IBrend,
    ICarBodyTypeHandbook,
    ICarName,
    IColor,
    IHandbookItem,
    IServerCarName,
    IServerReviewListItem
} from "../../shared";
import {IServerEquipment, IServerProducer} from "../../features/Administration";
import {IAdvertisementListItem} from "../Advertisement/namespace";


export interface IPriceRange {
    min: number | null
    max: number | null
}

export interface IGetCarPrice {
    car_id: number
    mileage: number
    date_of_production: number
}


export interface IServerGenerationsVariantsAndEquipments {
    equipments: ({
        equipment_id: number
        name: string
    })[]
    generation_variants: ({
        generation_variant_id: number
        car_body_type_code: ICarBodyTypeHandbook
    })[]
}
export interface ISearchCarInfo {
    generation: {
        start_date: string
        end_date: string | null
    }
    colors: IColor[]
}
export interface IServerCarProps {
    common: {
        car_class: IHandbookItem
        doors_count: number
        places_count: number
        car_body_type: ICarBodyTypeHandbook,
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
        fuel: IHandbookItem
        ecological_class: IHandbookItem
        acceleration: number
    }
    engine: {
        fuel_type_code: IHandbookItem
        power_system_type_code: IHandbookItem
        cyllinder_arrangement_type_code: IHandbookItem
        boost_type_code: IHandbookItem
        compression_ration: number
        count_of_clapans_on_cyllinder: number
        count_of_cyllinders: number
        count_of_electro_engines: number
        cyllinder_diameter: number
        electro_horse_powers: number
        engine_id: number
        horse_power: number
        name: string
        producer: string
        torgue: number
        type_code: IHandbookItem
        volume: number

    }
}


export interface ISererCarCharacteristicsParams {
    generation?: number
    equipment?: number
}
export interface ISererCarCharacteristics {
    car: IServerCarName
    equipments: { id: number, name: string }[]
    equipment: number
    info: IServerCarProps
}

interface IName {
    name: string
    id: number
}
export interface IServerGeneration {
    car: IServerCarName
    generation_variant_id: number
    photos: []
    reviews: {
        count: number,
        rate: number,
        results: IServerReviewListItem[]
    };
    advertisements: {
        count: number,
        results: IAdvertisementListItem[]
    }
    characteristics: {
        class: IHandbookItem
        car_body_type: ICarBodyTypeHandbook
        equipments: IServerEquipment[]
    }
    price: {
        min: number
        max: number
    }
    advertisements_count: number
}

export interface IModelMiniCard {
    photo: string | null
    id: number
    name: string
    advertisement_count: number
}
export interface IServerBrend extends IBrend{
    producer: IServerProducer
    models: IModelMiniCard[]

}


export interface IGenerationCard {
    id: number
    photo: string | null
    car_body_type: IHandbookItem
}

export type ModelMiniCardSize = 'small' | 'medium' | 'large'
export interface IGeneration {
    name: string
    start_date: string
    end_date: string
    id: number
    variants: IGenerationCard[]
}



export interface IServerModel {
    car: {
        brend: IName
        model: IName
    }
    photos: string[]
    generations: IGeneration[]
    reviews: {
        count: number
        results: IServerReviewListItem[]
    }
    advertisements: {
        count: number
        results: IAdvertisementListItem[]
    }
    price: {
        min: number
        max: number
    }
}

export interface IModelOption {
    model_id: number
    name: string
}
export interface IGenerationOption {
    generation_id: number
    name: string
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

