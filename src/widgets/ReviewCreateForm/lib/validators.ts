import {combineValidators} from "shared";
import {basicValidators as v} from "shared";

const message = combineValidators(
    v.required()
)

const title = combineValidators(
    v.required(),
    v.maxLength(100),
)

export const validators = {
    title,
    message,
}