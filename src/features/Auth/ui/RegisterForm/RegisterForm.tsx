import { FC } from 'react'

import s from './RegisterForm.module.scss'
import {
    Button,
    Stack,
    PasswordInput,
    Input,
    useMultiLanguageValidationErrors,
    getTranslationIndexCreator
} from "shared";
import {SubmitHandler, useForm} from "react-hook-form";

import {register as authRegister, selectors} from 'entities/User'
import {useAppDispatch, useAppSelector} from "app/services";
import {validators} from "../../lib/validators";
import {FormValues} from "../../namespace";
import {useTranslation} from "react-i18next";

interface IProps {

}



export const RegisterForm: FC<IProps> = ({
}) => {
    const { register, formState: { errors }, handleSubmit, setError, setFocus} =  useForm<FormValues>({ mode: 'onTouched' })
    const d = useAppDispatch()
    const { t } = useTranslation()

    const onFormSubmit: SubmitHandler<FormValues> = (payload) => {
        const { repeated_password, ...data } = payload
        d(authRegister({
            ...data,
            username: payload.email
        }))
    }

    const getIndex = getTranslationIndexCreator('auth')

    const errorsMessages = useMultiLanguageValidationErrors(errors)
    const loading = useAppSelector(selectors.selectUserDataLoadingStatus)
    return <form onSubmit={handleSubmit(onFormSubmit)} style={{ zIndex: 10 }}>
        <Stack size={'container'} spacing={5} direction={'column'}>
            <Input register={register('email', { validate: validators.email })}
                   title={t(getIndex('email')) as string}
                   error={errorsMessages.email}
            />
            <Input register={register('first_name', { validate: validators.first_name })}
                   title={t(getIndex('first_name')) as string}
                   error={errorsMessages.first_name} />
            <Input register={register('last_name', { validate: validators.last_name })}
                   title={t(getIndex('second_name')) as string}
                   error={errorsMessages.last_name}/>
            <PasswordInput register={register('password', { validate: validators.password })}
                           title={t(getIndex('password')) as string}
                           error={errorsMessages.password}
            />
            <PasswordInput register={register('repeated_password', { validate: validators.repeated_password })}
                   title={t(getIndex('repeat_password')) as string}
                   error={errorsMessages.repeated_password}
            />
            <Button type={'primary'}
                    disabled={loading}
                    behaviorType={'submit'}
                    label={t(getIndex('register')) as string}
                    width={'full'}/>
        </Stack>
    </form>
}
