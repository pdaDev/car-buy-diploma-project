import {ICarBodyTypeHandbook, IColor, IHandbookItem} from "shared";
import  * as NS from '../namespace'

export const EMPTY_HANDBOOK_ITEM: IHandbookItem = {
    code: '',
    ru_name: '',
    eng_name: null,
    ru_description: null,
    eng_description: null,
}
export const EMPTY_CAR_BODY_TYPE: ICarBodyTypeHandbook = {
    code: '',
    ru_description: null,
    eng_name: null,
    ru_name: '',
    eng_description: null,
    count_of_sit_places: 0,
    count_of_doors: 0,
    icon: null
}
export const EMPTY_COLOR_HANDBOOK_ITEM: IColor = {
    eng_name: null,
    code: '',
    ru_name: '',
    color: '',
}


export const EMPTY_PRODUCER: NS.ProducerFormData = {
    name: null,
    ru_description: null,
    eng_description: null,
    date_of_found: null,
}

export const EMPTY_TRANSMISSION: NS.TransmissionFormData = {
    name: null,
    type_code: null,
    count_of_clutches: 0,
    count_of_gears: 0,
    producer: null,
    has_dry_clutch: false
}

export const EMPTY_ENGINE: NS.EngineFormData = {
    name: null,
    compression_ration: null,
    electro_horse_powers: null,
    count_of_electro_engines: null,
    torgue: null,
    volume: null,
    type_code: null,
    boost_type_code: null,
    producer: null,
    count_of_clapans_on_cyllinder: null,
    count_of_cyllinders: null,
    cyllinder_arrangement_type_code: null,
    cyllinder_diameter: null,
    fuel_type_code: null,
    horse_power: null,
    power_system_type_code: null
}

export const EMPTY_BREND: NS.BrendFormData = {
    name: null,
    producer: null
}

export const EMPTY_MODEL: NS.ModelFormData = {
    name: null,
    car_class_code: null
}

export const EMPTY_GENERATION: NS.GenerationFormData = {
    ecological_class_code: null,
    engine_layout_code: null,
    name: null,
    start_date: null,
    end_date: null
}

export const EMPTY_GENERATION_VARIANT: NS.GenerationVariantFormData = {
    car_body_type_code: null,
}

export const EMPTY_CONCRETE_CAR: NS.ConcreteCarFormData = {
    weight: null,
    wheel_base: null,
    width: null,
    length: null,
    fuel_consumption: null,
    to_100_acceleration: null,
    battery_volume: null,
    height: null,
    max_speed: null,
    max_trunk_volum: null,
    min_trunk_volume: null,
    clearence: null,
    fuel_tank_volume: null,
}

export const EMPTY_EQUIPMENT: NS.EquipmentFormData = {
    name: null,
    engine: null,
    front_breaks_code: null,
    drive_type_code: null,
    front_suspension_code: null,
    wheel_size: null,
    transmission: null,
}

export const apiRoutes = {
    model: 'car/models/',
    brend: 'car/brends/',
    engine: 'engines/',
    producer: 'producers/',
    transmission: 'transmission/',
    generation: 'car/generations/',
    generationVariant: 'car/generation_variants/',
    concreteCar: 'car/concrete-car/',
    equipment: 'car/equipments/'
}
