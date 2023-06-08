import * as NS from '../namespace'
import {
    combineValidators,
    IBrend, ICarBodyTypeHandbook,
    IColor,
    IHandbookItem,
    SMALLINT_UNSIGNED,
    TINYINT_UNSIGNED,
    Validators
} from "shared";
import {basicValidators as v} from "shared";


export const transmissionValidators: Validators<NS.IServerTransmission> = {
    name: combineValidators(v.required(), v.maxLength(100)),
    producer: v.required(),
    type_code: v.required()
}

export const producerValidators: Validators<NS.IServerProducer> = {
    // name: combineValidators(v.required(), v.maxLength(50)),
    date_of_found: v.required()
}

export const handbookValidators: Validators<IHandbookItem & IColor & ICarBodyTypeHandbook> = {
    ru_name: combineValidators(v.required(), v.maxLength(100), v.onlyRussian()),
    eng_name: combineValidators( v.maxLength(100), v.onlyEnglish()),
    ru_description: v.onlyRussian(),
    eng_description: v.onlyEnglish(),
    code: combineValidators(v.required(), v.maxLength(15), v.onlyEnglish()),
    color: combineValidators(v.required)
}

export const engineValidators: Validators<NS.IServerEngine> = {
    volume: combineValidators(v.maxValue(20)),
    name: combineValidators(v.required(), v.maxLength(100)),
    type_code: v.required(),
    horse_power: v.maxValue(65535),
    torgue: v.maxValue(65535),
    compression_ration: v.maxValue(SMALLINT_UNSIGNED),
    producer: v.required(),
    electro_horse_powers: v.maxValue(SMALLINT_UNSIGNED)
}

export const brendValidators: Validators<IBrend> = {
    name: combineValidators(v.required(), v.maxLength(50)),
    producer: v.required()
}

export const modelValidators: Validators<NS.IServerModel> = {
    name: combineValidators(v.required(), v.maxLength(50)),
    car_class_code: v.required()
}

export const generationValidators: Validators<NS.IServerGeneration> = {
    name: combineValidators(v.required(), v.maxLength(50)),
    start_date: v.required(),
    engine_layout_code: v.required(),
    ecological_class_code: v.required(),
}

export const equipmentValidators: Validators<NS.IServerEquipment> = {
    engine: v.required(),
    drive_type_code: v.required(),
    transmission: v.required(),
    front_breaks_code: v.required(),
    front_suspension_code: v.required(),
    name: combineValidators(v.required(), v.maxLength(45)),
}

export const generationVariantValidators: Validators<NS.IServerGenerationVariant> = {
    car_body_type_code: v.required()
}

export const concreteCarValidators: Validators<NS.IServerConcreteCar> = {
    length: combineValidators(v.required(), v.maxValue(SMALLINT_UNSIGNED)),
    width: combineValidators(v.required(), v.maxValue(SMALLINT_UNSIGNED)),
    height: combineValidators(v.required(), v.maxValue(SMALLINT_UNSIGNED)),
    wheel_base: combineValidators(v.required(), v.maxValue(SMALLINT_UNSIGNED)),
    clearence: combineValidators(v.required(), v.maxValue(SMALLINT_UNSIGNED)),
    min_trunk_volume: combineValidators(v.required(), v.maxValue(SMALLINT_UNSIGNED)),
    max_trunk_volum: combineValidators(v.required(), v.maxValue(SMALLINT_UNSIGNED)),
    fuel_tank_volume: v.maxValue(SMALLINT_UNSIGNED),
    weight: combineValidators(v.required(), v.maxValue(SMALLINT_UNSIGNED)),
    max_speed: combineValidators(v.required(), v.maxValue(SMALLINT_UNSIGNED)),
    to_100_acceleration: v.required(),
    battery_volume: v.maxValue(SMALLINT_UNSIGNED)
}