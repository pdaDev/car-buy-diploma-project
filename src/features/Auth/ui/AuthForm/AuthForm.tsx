import {FC, useState} from 'react'


import s from './AuthForm.module.scss'
import {Button, Input, Label, Box, Stack} from "../../../../shared";
import {useAppDispatch} from "../../../../app/services";

import {login, IAuthPayload} from 'entities/User'
import {SubmitHandler, useForm} from "react-hook-form";
import {PasswordInput} from "../../../../shared/ui/Inputs/PasswordInput/PasswordInput";
import {validators} from "../../lib/validators";


export const AuthForm: FC = () => {

    const d = useAppDispatch()
    const {handleSubmit, formState: {errors}, register} = useForm<IAuthPayload>({mode: 'onTouched'})


    const onFormSubmit: SubmitHandler<IAuthPayload> = (payload) => {
        d(login(payload))
    }


    return (
        <form onSubmit={handleSubmit(onFormSubmit)}>
            <Stack size={'container'} spacing={5} direction={'column'}>
                <Input register={register('username', {required: 'required'})}
                       label={'почта'}
                       error={errors.username?.message}
                />
                <PasswordInput register={register('password', {required: 'required'})}
                               label={'пароль'}
                               error={errors.password?.message}
                />
                <Button type={'primary'} label={'войти'} width={'full'}/>
            </Stack>
        </form>
    )
}
