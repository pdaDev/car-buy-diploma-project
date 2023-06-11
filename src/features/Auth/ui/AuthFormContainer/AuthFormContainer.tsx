import {FC, useEffect, useState} from 'react'

import s from './AuthFormContainer.module.scss'
import {
    Switcher,
    Stack,
    Container,
    Card,
    getTranslationIndexCreator, createMultiLanguageOptions
} from "shared";

import {AuthForm} from "../AuthForm/AuthForm";
import {RegisterForm} from "../RegisterForm/RegisterForm";
import {ResetPasswordForm} from "../ResetPasswordForm/ResetPasswordForm";
import {withPopup} from "app/services/withPopupProvider/lib/hocs";
import {useTranslation} from "react-i18next";

interface IProps {

}

type FormMode = 'login' | 'register' | 'reset_password'
export const Modal: FC<IProps> = ({}) => {
    const formModes =  ['login', 'register', 'reset_password']
    const [formMode, setFormMode] = useState<FormMode>('login')


    const getForm = (mode: FormMode) => {
        switch (mode) {
            case 'login':
                return <AuthForm/>
            case 'register':
                return <RegisterForm/>
            case 'reset_password':
                return <ResetPasswordForm setLoginForm={() => setFormMode('login')}/>
        }
    }

    const { t } = useTranslation()
    const getIndex = getTranslationIndexCreator('auth')


    const options = createMultiLanguageOptions(formModes, t, 'auth')

    return  <Card width={'516px'} paddings={2}>
            <Container p={4} size={'width'}>
                <Stack size={'container'} spacing={4}>
                    <Stack direction={'row'} size={'width'} vAlign={'center'}>
                        <Switcher options={options} activeOptions={formMode as string} onChange={setFormMode}/>
                    </Stack>
                    { getForm(formMode) }
                </Stack>
            </Container>
        </Card>
}

export const AuthFormContainer = withPopup('auth')(Modal)
