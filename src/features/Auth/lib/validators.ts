import {combineValidators} from "shared";
import {basicValidators as v} from "shared";

const email = combineValidators(
    v.required(),
    v.email(),
)
const password = combineValidators(

)
const first_name = combineValidators(
    v.required(),
    v.minLength(3),
    v.maxLength(120),
)
const last_name = combineValidators(
    v.required(),
    v.minLength(3),
    v.maxLength(120),

)

export const validators = {
    password,
    email,
    last_name,
    first_name
}