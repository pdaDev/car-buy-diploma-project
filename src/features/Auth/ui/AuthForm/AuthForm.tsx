import {FC, useState} from 'react'

import s from './AuthForm.module.scss'
import {
    Button,
    Input,
    Label,
    Box,
    Stack,
    useMultiLanguageValidationErrors,
    basicValidators,
    getTranslationIndexCreator, Separator
} from "../../../../shared";
import {useAppDispatch, useAppSelector} from "../../../../app/services";

import {login, IAuthPayload, selectors, loginViaVK} from 'entities/User'
import {SubmitHandler, useForm} from "react-hook-form";
import {PasswordInput} from "../../../../shared/ui/Inputs/PasswordInput/PasswordInput";
import {validators} from "../../lib/validators";
import {useTranslation} from "react-i18next";


export const AuthForm: FC = () => {

    const d = useAppDispatch()
    const {handleSubmit, formState: {errors}, register} = useForm<IAuthPayload>({mode: 'onTouched'})
    const loading = useAppSelector(selectors.selectUserDataLoadingStatus)

    const errorsMessages = useMultiLanguageValidationErrors(errors)
    const onFormSubmit: SubmitHandler<IAuthPayload> = (payload) => {
        d(login(payload))
    }
    const getIndex = getTranslationIndexCreator('auth')
    const { t } = useTranslation()

    return (
        <form onSubmit={handleSubmit(onFormSubmit)}>
            <Stack size={'container'} spacing={5}>
                <Input register={register('username', {validate: validators.email})}
                       title={t(getIndex('email')) as string}
                       width={'full'}
                       error={errorsMessages.username}
                />
                <PasswordInput register={register('password', {
                    validate: basicValidators.required()
                })}
                               title={t(getIndex('password'))as string}
                               width={'full'}
                               error={errorsMessages.password}
                />
                <Button type={'primary'}
                        behaviorType={'submit'}
                        disabled={loading}
                        label={t(getIndex('login')) as string}
                        width={'full'}/>
                {/*<Separator text={t(getIndex('login_social')) as string}*/}
                {/*           thickness={'thin'}/>*/}
                {/*<Button type={'secondary'}*/}
                {/*        color={'vk'}*/}
                {/*        onClick={() => d(loginViaVK())}/>*/}
            </Stack>
        </form>
    )
}
