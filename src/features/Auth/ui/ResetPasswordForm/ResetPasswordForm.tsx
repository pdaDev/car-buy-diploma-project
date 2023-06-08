import {FC, useState} from 'react'

import s from './ResetPasswordForm.module.scss'
import {PasswordInput} from "../../../../shared/ui/Inputs/PasswordInput/PasswordInput";
import {validators} from "../../lib/validators";
import {set, useForm} from "react-hook-form";
import {
    api,
    Button,
    Checkbox, Container,
    Form,
    getTranslationIndexCreator, Input, Label, SeparatedInput, Stack,
    Switcher, Text, Timer,
    useMultiLanguageValidationErrors
} from "../../../../shared";
import {IAuthPayload, IRegisterPayload} from "../../../../entities/User";
import {FormValues} from "../../namespace";
import {useTranslation} from "react-i18next";
import {closeModal} from "../../../../app/services/withPopupProvider";
import {useAppDispatch} from "../../../../app/services";

interface IProps {
    setLoginForm: Function
}


export const ResetPasswordForm: FC<IProps> = ({ setLoginForm }) => {

    const steps = ['email_enter', "email_confirmation", 'reset_password'] as const
    const [code, setCode] = useState<string | null>(null)
    const [step, setStep] = useState<typeof steps[number]>('email_enter')
    const {register, handleSubmit, formState: {errors}, setError, watch} = useForm<FormValues>({mode: "all", reValidateMode: 'onChange'})
    const errorsMessages = useMultiLanguageValidationErrors(errors)
    const [showPassword, setShowPassword] = useState(false)
    const {t} = useTranslation()
    const getIndex = getTranslationIndexCreator('auth')
    const goToNextStep = () => {
        setStep(steps[Math.min(steps.indexOf(step) + 1, steps.length - 1)])
    }
    const goToPrevStep = () => {
        setStep(steps[0])
        setCode(null)
        setShowPassword(false)
    }

    const [loading, setLoading] = useState(false)
    const getCodeAgain = async () => {
        setCode(null)
        const response = await api.get(`api/auth/reset_password/?email=${watch('email')}`).then(data => data)
        if (response.status === 200) {
            setCode(response.data.code)
        }
    }

    const getFormAccordingStep = () => {
        switch (step) {
            case "reset_password":
                return <>
                    <Checkbox title={t(getIndex('show_password'))} checked={showPassword} onChange={setShowPassword}/>
                    <PasswordInput register={register('password', {validate: validators.password})}
                                   title={t(getIndex('password')) as string}
                                   needShowPassword={showPassword}
                                   error={errorsMessages.password}
                    />
                    <PasswordInput register={register('repeated_password', {validate: validators.repeated_password})}
                                   title={t(getIndex('repeat_password')) as string}
                                   needShowPassword={showPassword}
                                   error={errorsMessages.repeated_password}
                    />
                </>
            case "email_enter":
                return <Stack size={'width'} spacing={4}>
                    <Label label={t(getIndex(`steps.${step}.title`))} level={2} weight={'medium'}/>
                    <Text content={t(getIndex(`steps.${step}.text`))} size={3} weight={'regular'}/>
                    <Input register={register('email', {validate: validators.email})}
                           error={errorsMessages.email}
                           title={t(getIndex('email')) as string}
                    />
                </Stack>
            case "email_confirmation":
                return <Stack size={'width'} spacing={4}>
                    {code && <Timer countOfSec={100} active={true} onFinish={() => setCode(null)}/>}
                    <Label label={t(getIndex(`steps.${step}.title`))} level={2} weight={'medium'}/>
                    <Container contentAlign={'center'}>
                        {
                            code ?
                                <SeparatedInput onSuccessAction={goToNextStep}
                                                dataToCompare={code}
                                                type={'text'}
                                />
                                : <Label label={t(getIndex('time_finished'))}
                                         width={'100%'}
                                         align={'center'}
                                         level={3}
                                         weight={'regular'}/>
                        }
                    </Container>

                    <Button type={'underline'}
                            onClick={getCodeAgain}
                            label={t(getIndex('send_again')) as string}/>
                </Stack>
        }
    }

    const onFormSubmit = async (data: FormValues) => {
        if (step === 'email_enter') {
            setLoading(true)
            const response = await api.get(`api/auth/reset_password/?email=${data.email}`).then(data => data)
            setLoading(false)
            if (response.status === 200) {
                goToNextStep()
                setCode(response.data.code)
            } else if (response.status === 404) {
                setError('email', { message: 'email_doesnt_exist'})
            }

        }
        if (step === 'reset_password') {
            setLoading(true)
            const response = await api.post(`api/auth/reset_password/`, { email: data.email, password: data.password }).then(data => data)
            setLoading(false)
            if (response.status === 200) {
                setLoginForm()
            }
        }
    }

    const isFirstStep = step === 'email_enter'
    const isLastStep = step === 'reset_password'


    return <Form
        onSubmit={handleSubmit(onFormSubmit)}
        controls={[
            !isFirstStep && <Button type={'secondary'}
                                    onClick={goToPrevStep}
                                    label={t('form.prev') as string}
            />,
            <Button type={'primary'}
                    behaviorType={'submit'}
                    disabled={loading}
                    label={t(`form.${isLastStep ? 'save' : 'next'}`) as string}
            />
        ]}
    >
        {getFormAccordingStep()}
    </Form>
}
