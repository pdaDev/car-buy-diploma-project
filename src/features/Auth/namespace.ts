import {IRegisterPayload} from "entities/User";

export type FormWithoutUsername = Omit<IRegisterPayload, 'username'>
export type FormValues = FormWithoutUsername & { repeated_password: string }