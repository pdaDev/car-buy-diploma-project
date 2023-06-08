import * as NS from 'entities/Car/namespace'
import {EMPTY_CAR_BODY_TYPE, EMPTY_HANDBOOK_ITEM} from "../../../features/Administration/lib/constants";

export const SAMPLE_CAR_CHARACTERISTICS: NS.ISererCarCharacteristics['info'] = {
    performance_indicators: {
        acceleration: 0,
        ecological_class: EMPTY_HANDBOOK_ITEM,
        fuel: EMPTY_HANDBOOK_ITEM,
        fuel_consumption: 0,
        max_speed: 0,
    },
    engine: {
        engine_id: 0,
        electro_horse_powers: 0,
        producer: 'null',
        count_of_electro_engines: 0,
        torgue: 0,
        volume: 0,
        name: '',
        boost_type_code: EMPTY_HANDBOOK_ITEM,
        horse_power: 0,
        fuel_type_code: EMPTY_HANDBOOK_ITEM,
        compression_ration: 0,
        count_of_clapans_on_cyllinder: 0,
        count_of_cyllinders: 0,
        cyllinder_arrangement_type_code: EMPTY_HANDBOOK_ITEM,
        cyllinder_diameter: 0,
        power_system_type_code: EMPTY_HANDBOOK_ITEM,
        type_code: EMPTY_HANDBOOK_ITEM,
    },
    transmission: {
      count_of_gears: 0,
      type: EMPTY_HANDBOOK_ITEM,
      drive_type: EMPTY_HANDBOOK_ITEM,
    },
    sizes: {
        width: 0,
        height: 0,
        wheel_size: 0,
        clearance: 0,
        length: 0
    },
    suspension_and_breaks: {
        front_breaks: EMPTY_HANDBOOK_ITEM,
    },
    volume_and_weight: {
        wight: 0,
        trunk_volume: '',
        fuel_tank_volume: 0
    },
    common: {
        car_body_type: EMPTY_CAR_BODY_TYPE,
        places_count: 0,
        car_class: EMPTY_HANDBOOK_ITEM,
        doors_count: 0,
    }
}