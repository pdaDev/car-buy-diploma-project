import {handbooks} from "../../../app/services/withCommonData/namespace";
import {EMPTY_CAR_BODY_TYPE, EMPTY_COLOR_HANDBOOK_ITEM, EMPTY_HANDBOOK_ITEM} from "./constants";
import {ICarBodyTypeHandbook, IColor, IHandbookItem} from "../../../shared";


export const getHandbookEmptyItem = (code: typeof handbooks[number]['key']): IHandbookItem & ICarBodyTypeHandbook & IColor => {
    switch (code) {
        case 'DICTIONARY_COLOR':
            return EMPTY_COLOR_HANDBOOK_ITEM as any
        case 'DICTIONARY_CAR_BODY_TYPE':
            return EMPTY_CAR_BODY_TYPE as any
        default:
            return EMPTY_HANDBOOK_ITEM as any
    }
}

export const getCarPropsIndex = (v: string) => `car.props.${v}.title`