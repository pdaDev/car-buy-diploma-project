import {combineValidators, INT_UNSIGNED, MEDIUMINT_UNSIGNED} from "shared";
import {basicValidators as v} from "shared";

const price = combineValidators(
    v.required(), v.maxValue(INT_UNSIGNED)
)
const mileage = combineValidators(
    v.required(), v.maxValue(MEDIUMINT_UNSIGNED)
)
const phoneNumber = combineValidators(
    v.required(),
)
const dateOfProduction = combineValidators(
    v.required(),
)
const color = combineValidators(
    v.required(),
)
const description = combineValidators(
    v.required()
)

export const validators = {
    price, mileage, dateOfProduction, color, phoneNumber, description
}