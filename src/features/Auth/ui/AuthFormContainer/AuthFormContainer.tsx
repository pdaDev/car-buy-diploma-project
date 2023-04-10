import {FC, useEffect, useState} from 'react'

import s from './AuthFormContainer.module.scss'
import {Button, Box, Input, Label, Switcher, Stack, Container} from "../../../../shared";
import {useAppDispatch} from "../../../../app/services";
import {AuthForm} from "../AuthForm/AuthForm";
import {RegisterForm} from "../RegisterForm/RegisterForm";
import {ResetPasswordForm} from "../ResetPasswordForm/ResetPasswordForm";
import {Modal} from "../../../../app/services/withPopupProvider";

interface IProps {

}

type FormMode = 'login' | 'register' | 'reset_password'
export const AuthFormContainer: FC<IProps> = ({}) => {
    const [formMode, setFormMode] = useState<FormMode>('login')

    const getForm = (mode: FormMode) => {
        switch (mode) {
            case 'login':
                return <AuthForm/>
            case 'register':
                return <RegisterForm/>
            case 'reset_password':
                return <ResetPasswordForm/>
        }
    }

    const options = [{value: 'login', label: 'вход'}, {value: 'register', label: 'регистрация'}]
    const getFormLabel = (formMode: FormMode) => {
        switch (formMode) {
            case "register":
                return 'регистрация'
            case "login":
                return 'вход'
            case 'reset_password':
                return 'восстановление пароля'
        }
    }

    return <Modal modalKey={'auth'}>
        <Box w={450}
             measure={'px'}
             shadow={1}
             background={'secondary'}
             brd={2}>
            <Container p={4} size={'container'}>
                <Stack size={'container'}>
                    <Stack direction={'row'} size={'container'} vAlign={'center'}>
                        <Switcher options={options} activeOptions={formMode as string} onChange={setFormMode}/>
                       <Container mr={5} size={'content'}>
                           <Label label={getFormLabel(formMode)} level={2}/>
                       </Container>
                    </Stack>
                    {getForm(formMode)}
                </Stack>
            </Container>
        </Box>
    </Modal>
}
