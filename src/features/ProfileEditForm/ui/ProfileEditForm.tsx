import {FC, useEffect, useState} from "react";
import {
    Button, Card,
    Form, formatPhoneNumber,
    getTranslationIndexCreator,
    Input, LoadSingleImage,
    PhoneNumberInput,
    Stack, transformObjectToFormData,
    useMultiLanguageValidationErrors
} from "shared";
import {useTranslation} from "react-i18next";
import {useAppDispatch, useAppSelector} from "app/services";
import {useForm} from "react-hook-form";
import {IUserData, patchUser} from "entities/User";
import {validators} from "../lib/validators";
import {openModal} from "app/services/withPopupProvider";
import {selectUserDataLoadingStatus} from "entities/User/model/selectors";

type FormState = Pick<IUserData, 'firstName' | 'secondName' | 'phoneNumber'>

interface IProps {
    initialData: IUserData | undefined
    setViewMode: Function
}

export const ProfileEditForm: FC<IProps> = ({initialData, setViewMode}) => {
    const getIndex = getTranslationIndexCreator('user')
    const {t} = useTranslation()
    const d = useAppDispatch()
    const defaultState: FormState = {
        firstName: initialData?.firstName || '',
        secondName: initialData?.secondName || '',
        phoneNumber: initialData?.phoneNumber
            ? formatPhoneNumber(initialData.phoneNumber, false)
            : null
    }
    const {register, handleSubmit, setValue, formState: {errors}, watch} = useForm<FormState>({ mode: 'all', reValidateMode: 'onChange' });
    useEffect(() => {
        if (initialData) {
            setAvatar(initialData.avatar)
            Object.keys(initialData).forEach(key => setValue(key as keyof FormState, defaultState[key as keyof FormState]))
        }
    }, [initialData])

    const profileLoading = useAppSelector(selectUserDataLoadingStatus)

    const errorsMessages = useMultiLanguageValidationErrors(errors)
    const declineForm = () => {
        const hasChanges = initialData ? Object.keys(initialData!).some(key =>
            defaultState[key as keyof FormState] !== watch(key as keyof FormState)) : false
        if (hasChanges) {
            d(openModal({
                key: 'confirm', payload: {
                    index: 'decline_profile_edit',
                    onConfirm: setViewMode
                }
            }))
        } else setViewMode()
    }

    const [avatar, setAvatar] = useState<null | string | File>(initialData?.avatar || null)

    const onSubmit = (data: FormState) => {
        const hasChanges = initialData ? (Object.keys(initialData!).some(key =>
                defaultState[key as keyof FormState] !== data[key as keyof FormState])
            || initialData.avatar !== avatar) : false
        if (hasChanges) {
            const payload = {
                first_name: data.firstName!,
                last_name: data.secondName!,
            }
            const formData = transformObjectToFormData(payload)
            if (data.phoneNumber)
                formData.append('phone_number', "8" + data.phoneNumber.replace(/\D/g, ''))
            if (avatar !== initialData?.avatar)
                formData.append('avatar', avatar || '')


            d(openModal({
                key: 'confirm', payload: {
                    index: 'save_profile',
                    onConfirm: () => {
                        d(patchUser({
                            data: formData,
                            onSuccess: setViewMode
                        }))
                    }
                }
            }))
        } else setViewMode()

    }

    return <Card width={'800px'} paddings={4}>
        <Form onSubmit={handleSubmit(onSubmit)} controls={[
            <Button type={'secondary'}
                    label={t('form.decline') as string}
                    onClick={declineForm}
                    disabled={profileLoading}
            />,
            <Button type={"primary"}
                    disabled={profileLoading}
                    behaviorType={'submit'}
                    label={t("form.save") as string}
            />
        ]}>
            <Stack size={'container'} direction={'row'} spacing={4}>
                <LoadSingleImage onLoadImage={setAvatar} image={avatar}/>
                <Stack spacing={4} vAlign={'start'} size={'container'}>
                    <Input register={register('firstName' , { validate: validators.firstName })}
                           title={t(getIndex("first_name")) as string}
                           error={errorsMessages.firstName}
                    />
                    <Input register={register('secondName', { validate: validators.secondName })}
                           title={t(getIndex("second_name")) as string}
                           error={errorsMessages.secondName}
                    />
                    <PhoneNumberInput register={register('phoneNumber',)}
                                      title={t(getIndex("phone_number")) as string}
                                      error={errorsMessages.phoneNumber}
                    />
                </Stack>

            </Stack>
        </Form>
    </Card>
}