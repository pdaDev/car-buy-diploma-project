import {
    CommonGetListPayload, ContainsFilter, EqualFilter,
    IBrend,
    ICarBodyTypeHandbook,
    IColor,
    IHandbookItem,
    IOption, LoadedImage,
    Nullable
} from "../../shared";
import {handbooks} from "../../app/services/withCommonData/namespace";
import {IServerUser} from "../../entities/User";
import {number} from "prop-types";

export type R = ''

export type HandbookResponse = (IHandbookItem | ICarBodyTypeHandbook | IColor )
export type HandbookCreatePayload = HandbookResponse & { key: typeof handbooks[number]['key'] }
export type HandbookPutPayload = HandbookCreatePayload & { initCode: string }
export type HandbookDeletePayload = { key: typeof handbooks[number]['key'], code: string }
export type UserGetPayload = { limit: number, offset: number, sort: string | null, query: string | null  }
export type UserPatchPayload = { id: number, is_banned: 1 | 0 }
export type IAdminServerUser = Omit<IServerUser, 'active' | 'is_superuser' | 'is_staff'> & {
    total_ads: number
    opened_ads: number
    booked_ads: number
    closed_ads: number
}

export type CarDataGetPayload = UserGetPayload & { url: string }
export type CarDataUpdatePayload = { id: number, data: any, url: string }
export type CarDataDeletePayload = { id: number, url: string }
export type CarDataCreatePayload = { url: string, data: any }
export type CommonCarGetPayload = Partial<CommonGetListPayload> & { type?: 'options', query?: string }
export type ModelsGetPayload = CommonCarGetPayload & { brend: number }
export type GenerationsGetPayload = CommonCarGetPayload & { model: number }
export type GenerationVariantGetPayload = CommonCarGetPayload & { generation: number }
export type EquipmentGetPayload = CommonCarGetPayload & { generation: number }
export type ConcreteCarPayload = CommonCarGetPayload & { generation: number, equipment: number | null, generation_variant: number | null  }
export interface IServerGeneration {
    start_date: string
    end_date: null | string
    name: string
    model: number
    generation_id: number
    engine_layout_code: IHandbookItem
    ecological_class_code: IHandbookItem
}



export interface IServerModel {
    brend: number
    model_id: number
    car_class_code: string
    name: string
}


export interface IServerEquipment {
    equipment_id: number
    materials: IHandbookItem[]
    colors: IColor[]
    engine: {
        id: number
        fuel: IHandbookItem
        volume: number
        hp: number
        type: IHandbookItem
    }
    transmission: {
        id: number
        name: string
        type: IHandbookItem
    }
    drive_type_code: IHandbookItem
    front_suspension_code: IHandbookItem
    front_breaks_code: IHandbookItem
    wheel_size: number
    name: string
    generation: number
}



export interface IServerGenerationVariant {
    generation_variant_id: number
    generation: number
    photos: LoadedImage[]
    car_body_type_code: ICarBodyTypeHandbook
}




export interface IServerEngine {
    engine_id: number
    name: string
    volume: number
    type_code: IHandbookItem
    torgue: number
    horse_power: number
    fuel_type_code: IHandbookItem
    cyllinder_arrangement_type_code: IHandbookItem
    count_of_cyllinders: number
    count_of_clapans_on_cyllinder: number
    boost_type_code: IHandbookItem
    power_system_type_code: IHandbookItem
    compression_ration: number
    cyllinder_diameter: number
    producer: {
        producer_id: number
        name: string
    }
    count_of_electro_engines: null | number
    electro_horse_powers: null | number
}



export interface IServerTransmission {
    transmission_id: number
    name: string
    type_code: IHandbookItem
    count_of_gears: number
    has_dry_clutch: boolean
    count_of_clutches: number
    producer: {
        name: string
        id: number
    }
}



export interface IServerProducer {
    producer_id: number
    name: string
    date_of_found: string
    ru_description: string | null
    eng_description: string | null
}





export interface IServerConcreteCar {
    car_id: number
    car_body_type: ICarBodyTypeHandbook
    equipment: {
        id: number
        name: string
    }
    length: number
    height: number
    width: number
    wheel_base: number
    clearence: number
    min_trunk_volume: number
    max_trunk_volum: number
    fuel_tank_volume: number
    weight: number
    max_speed: number
    to_100_acceleration: number
    fuel_consumption: number
    battery_volume: number | null
    generation_variant: number
}

export interface IConcreteCarCreatePayload extends Omit<IServerConcreteCar, 'car_body_type' | 'equipment' | 'car_id' | 'generation_variant'> {
    equipment_id: number
    generation_variant_id: number
}

export interface IGenerationCreatePayload extends Omit<IServerGeneration, 'generation_id' | 'engine_layout_code' | 'ecological_class_code'> {
    engine_layout_code: string
    ecological_class_code: string
}

export type IProducerCreatePayload = Omit<IServerProducer, 'producer_id'>

export interface ITransmissionCreatePayload extends Omit<IServerTransmission, 'type_code' | 'transmission_id' | 'producer'> {
    type_code: string
    producer: number
}

export interface IEngineCreatePayload extends Omit<IServerEngine, 'fuel_type_code' | 'type_code'
    | 'cyllinder_arrangement_type_code' | 'power_system_type_code' | 'boost_type_code' |
    'code' | 'producer' | 'engine_id'>{
    fuel_type_code: string
    type_code: string
    boost_type_code: string
    cyllinder_arrangement_type_code: string
    power_system_type_code: string
    producer: null | number
}

export interface IGenerationVariantCreatePayload extends Omit<IServerGenerationVariant, 'generation_variant_id' | 'car_body_type_code'> {
    car_body_type_code: string
}

export interface IEquipmentCreatePayload extends Omit<IServerEquipment, 'transmission' |
    'drive_type_code' | 'front_breaks_code' | 'front_suspension_code' | 'engine' | 'equipment_id' | 'colors' | 'materials'> {
    transmission: number
    drive_type_code: string
    front_breaks_code: string
    front_suspension_code: string
    engine: number
    colors: string[]
    materials: string[]
}

export interface IBrendCreatePayload extends Omit<IBrend, 'brend_id' | 'producer'> {
    producer: number | null

}

export interface IModelCreatPayload extends Omit<IServerModel, 'model_id' | 'car_class_code'>{
    car_class_code: string | null
}


export type GenerationFormData = Omit<Nullable<IGenerationCreatePayload>, 'model'>
export type ConcreteCarFormData = Omit<Nullable<IConcreteCarCreatePayload>, 'equipment_id' | 'generation_variant_id'>
export type ModelFormData = Omit<Nullable<IModelCreatPayload>, 'brend'>
export type BrendFormData = Omit<Nullable<IBrendCreatePayload>, 'logo'>
export type TransmissionFormData = Nullable<ITransmissionCreatePayload>
export type EngineFormData = Nullable<IEngineCreatePayload>
export type ProducerFormData = Nullable<IProducerCreatePayload>
export type EquipmentFormData = Nullable<Omit<IEquipmentCreatePayload, 'colors' | 'materials' | 'generation'>>
export type GenerationVariantFormData = Nullable<Omit<IGenerationVariantCreatePayload, 'photos' | 'generation'>>


export type InputFieldType = 'counter' | 'images' | 'number' | 'string' | 'selector' | 'boolean' | 'date' | 'text' | 'color'
export type InputField<T extends object> =  {
    type: InputFieldType
    accessor?: ((data: T) => string | number | null) | 'handbook'
    limit?: number
    options?: IOption[]
    max?: number
    min?: number
}

export type FormBuilderConfig<T extends object> = Partial<Record<keyof T, InputField<T>>>

export type FormType = 'edit' | 'create' | 'create-according-existed'

export type CommonFormData<T extends object> = {
    defaultData: T | null
    type: FormType
    close: Function
}

export type TransmissionsFilterData = {
    producer_id: EqualFilter
    type_code: EqualFilter
}