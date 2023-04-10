import { FC } from 'react'

import s from './RegisterForm.module.scss'
import {Button, Stack, Container, Input} from "../../../../shared";
import {set, SubmitHandler, useForm} from "react-hook-form";

import { register as authRegister, IRegisterPayload } from 'entities/User'
import {useAppDispatch} from "../../../../app/services";
import {PasswordInput} from "../../../../shared/ui/Inputs/PasswordInput/PasswordInput";
import {validators} from "../../lib/validators";

interface IProps {

}

type FormWithoutUsername = Omit<IRegisterPayload, 'username'>
type FormValues = FormWithoutUsername & { repeated_password: string }

export const RegisterForm: FC<IProps> = ({
}) => {
    const { register, formState: { errors }, handleSubmit, setError, setFocus} =  useForm<FormValues>({ mode: 'onTouched' })
    const d = useAppDispatch()

    const onFormSubmit: SubmitHandler<FormValues> = (payload) => {
        const { repeated_password, ...data } = payload
        if (payload.password === repeated_password) {
            d(authRegister({
                ...data,
                username: payload.email
            }))
        } else {
            setError('repeated_password', { message: 'пароли должны совпадать' })
            setFocus('repeated_password')
        }
    }

    return <form onSubmit={handleSubmit(onFormSubmit)}>
        <Stack size={'container'} spacing={5} direction={'column'}>
            <Input register={register('email', { validate: validators.email })} label={'почта'} error={errors.email?.message} />
            <Input register={register('first_name', { validate: validators.first_name })} label={'имя'} error={errors.first_name?.message} />
            <Input register={register('last_name', { validate: validators.last_name })} label={'фамилия'} error={errors.last_name?.message}/>
            <PasswordInput register={register('password')} label={'пароль'} error={errors.password?.message}/>
            <PasswordInput register={register('repeated_password')}
                   label={'повторите пароль'}
                   error={errors.repeated_password?.message}
            />
            <Button type={'primary'} label={'зарегистироваться'} width={'full'}/>
        </Stack>
    </form>
}
