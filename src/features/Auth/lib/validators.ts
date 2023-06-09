import {combineValidators} from "shared";
import {basicValidators as v} from "shared";
import {FormValues} from "../namespace";

const email = combineValidators(
    v.required(),
    v.email(),
)
const password = combineValidators(
    v.required(),
    v.minLength(8)
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

const signin_password = combineValidators(
    v.required()
)

const repeated_password = (value: string, formState: FormValues) => {
    if (value !== formState.password) {
        return 'passwords_equal'
    }
}

export const validators = {
    signin_password,
    password,
    email,
    last_name,
    first_name,
    repeated_password,
}