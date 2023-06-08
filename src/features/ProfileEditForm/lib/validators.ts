import {combineValidators} from "shared";
import {basicValidators as v} from "shared";

const firstName = combineValidators(
    v.required(),
    v.maxLength(150),
    v.onlyLetters()
)

const secondName = combineValidators(
    v.required(),
    v.maxLength(150),
    v.onlyLetters()
)


export const validators = {
    firstName, secondName
}