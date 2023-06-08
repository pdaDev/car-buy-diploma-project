export interface IShortHandbookItem {
    ru_name: string
    eng_name: string | null

}

export interface IHandbookItem extends IShortHandbookItem {
    code: string;
    ru_description: string | null;
    eng_description: string | null;
}


export interface IEngine {
    engine_id: number;
    horse_power: number;
    volume: number;
    name: string

    torgue: number;
    type: string;
    fuel_type: string;

}

export interface IBrend {
    brend_id: number;
    name: string;
    logo: null | string
    producer: {
        producer_id: number
        name: string
    };
}

export interface IModel {
    model_id: number,
    name: string,
    car_class_code: string,
    brend: number
}

export interface IGeneration {

    generation_id: number,
    start_date: string,
    end_date: string,
    name: string,
    engine_layout_code: string,
    ecological_class_code: string,
    model: number
}

export interface ICarName {
    model: string
    brend: string
    generation: string
}

type Name = {
    id: number
    name: string
}
export interface ICarNameWithId {
    model: Name
    brend: Name
    generation: Name
    generation_variant: number
}
interface ICar {
    id: number
    name: string
}
export interface IServerGenerationWithPeriod extends  ICar {
    start: string
    end: string | null
}
export interface IServerCarName {
    model: ICar
    generation: IServerGenerationWithPeriod
    brend: ICar
    generation_variant: number

}

export interface IServerReviewListItem {
    title: string
    date: string
    score: number
    message: string
    owner: IUserCommonData
    car: ICarName
    review_id: number
    photos: string[]
}


export interface ReviewPoints {
    comfort_point: null | number
    reliable_point: number | null
    contrallabilty_point: number | null
    safety_point: number | null
    economic_point: number | null
    cross_country_point: number | null
    total: number
}
export type ReviewPointsWithoutTotal = NonNullable<Omit<ReviewPoints, 'total'>>

export interface IUserCommonData {
    first_name: string
    last_name: string
    avatar: string | null
    id: number
}

export interface ICarBodyTypeHandbook extends IHandbookItem {
    icon: string | null
    count_of_sit_places: number
    count_of_doors: number
}

export interface IColor {
    code: string;
    color: string
    ru_name: string
    eng_name: null | string

}