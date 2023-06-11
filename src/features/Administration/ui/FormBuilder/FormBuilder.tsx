import {FC, ReactNode, useMemo} from "react";
import * as NS from '../../namespace'
import {InputField} from "./InputField";
import {useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";
import {
    Button,
    Card,
    Form,
    formatNumber, getObjectKeys, getTranslationIndexCreator,
    isHandbook, Label,
    Stack,
    useMultiLanguageValidationErrors, Validators
} from "shared";
import {useAppDispatch} from "app/services";
import {useCreateCarDataMutation, useUpdateCarDataMutation} from "../../api";
import {openModal} from "app/services/withPopupProvider";
import {number} from "prop-types";
import {addSystemNotification} from "entities/Notification";

interface IProps<T extends object, D extends object> {
    config: NS.FormBuilderConfig<T>,
    defaultData: T | null
    keyIndex: keyof T
    translationIndex: string | ((key: string) => string)
    closeForm: Function
    children?: ReactNode
    type: NS.FormType
    url: string
    emptyData: D
    dataType?: 'object' | 'FormData'
    extra?: object
    validators?: Validators<D>
    hasOutChanges?: boolean
    title?: string
}

export function FormBuilder<T extends object, D extends object>({
                                                                    defaultData,
                                                                    config,
                                                                    hasOutChanges = false,
                                                                    dataType = 'object',
                                                                    extra = {},
                                                                    translationIndex,
                                                                    closeForm,
                                                                    title,
                                                                    emptyData,
                                                                    children,
                                                                    type,
                                                                    url,
                                                                    keyIndex,
                                                                    validators,
                                                                }: IProps<T, D>) {
    const defaultValues = useMemo(() => {
        if (type === 'create') {
            return emptyData
        } else if (defaultData) {
            const formattedData = {...emptyData}
            Object.keys(emptyData).forEach(key => {
                const accessor = config[key as keyof typeof config]?.accessor
                const type = config[key as keyof typeof config]?.type || 'string'

                let newValue = null

                if (!accessor) {
                    // @ts-ignore
                    newValue = defaultData[key as keyof typeof defaultData]
                } else {
                    if (accessor === 'handbook') {
                        // @ts-ignore
                        newValue = defaultData[key]?.code || null
                    } else {
                        // @ts-ignore
                        newValue = accessor(defaultData)
                    }

                }

                if (type === 'number' && newValue) {
                    newValue = formatNumber(newValue)
                }
                formattedData[key as keyof typeof formattedData] = newValue

            })
            return formattedData
        }
        return emptyData

    }, [defaultData, type, config, emptyData])

    const {t} = useTranslation()
    const {register, handleSubmit, formState: {errors}, watch} = useForm({defaultValues: defaultValues as any, reValidateMode: 'onChange', mode: 'all'})
    const errorsMessages = useMultiLanguageValidationErrors(errors)
    const [create, {isError: isCreateError, isLoading: creating}] = useCreateCarDataMutation()
    const [edit, {isError: isUpdateError, isLoading: updating}] = useUpdateCarDataMutation()

    const isLoading = creating || updating

    const createEntity = async (data: any) => {
        await create({data, url}).unwrap()

        if (!isCreateError) {
            d(addSystemNotification({ type: 'success', message: t('form.success') as string }))
            closeForm()
        }
    }

    const updateEntity = async (data: any) => {
        if (defaultData) {
            await edit({id: +defaultData[keyIndex], data, url}).unwrap()

            if (!isUpdateError) {
                d(addSystemNotification({ type: 'success', message: t('form.success') as string }))
                closeForm()
            }
        }
    }


    const onSubmit = (data: any) => {
        const formattedData = {...data, ...extra}
        Object.keys(data).forEach(key => {
            const type = config[key as keyof typeof config]?.type || 'string'
            switch (type) {
                case 'boolean':
                    formattedData[key] = Number(data[key])
                    break
                case 'number':
                    formattedData[key] = data[key] ? Number(data[key].replace(' ', '')) : data[key]
            }
        })

        let payload = formattedData

        if (dataType === 'FormData') {
            const formData = new FormData()
            Object.keys(formattedData).forEach(key => {
                if (Array.isArray(formattedData[key])) {
                    (formattedData[key] as any[]).forEach(el => formData.append(key, el))
                } else {
                    formData.append(key, formattedData[key])
                }
            })
            payload = formData
        }


        if (isCreateMode) {
            createEntity(payload)
        } else {
            updateEntity(payload)
        }
    }

    const d = useAppDispatch()
    const onFormClose = () => {
        const hasChanges = Object.keys(defaultValues).some(key => defaultValues[key as keyof typeof defaultValues] !== watch(key)) || hasOutChanges
        if (hasChanges) {
            d(openModal({
                key: 'confirm', payload: {
                    index: 'decline_admin',
                    onConfirm: () => closeForm()
                }
            }))
        } else {
            closeForm()
        }
    }

    const getIndex = typeof translationIndex === 'function' ? translationIndex : getTranslationIndexCreator(translationIndex)

    const isCreateMode = type === 'create' || type === 'create-according-existed'

    const saveButtonLabel = isCreateMode ?
        t('admin.data_management.create')
        : t("form.save")



    return <Card paddings={4} contentDirection={'column'}
                 contentGap={5} shadow={3} height={'auto'} width={'100%'}>
        <Label
            label={`${t(`admin.data_management.${type}`)} ${type === 'create' ? t(`admin.data_management.entities.${keyIndex as string}`) : title}`}
            level={2} weight={'medium'}/>
        <Form onSubmit={handleSubmit(onSubmit)} controls={[
            <Button type={'secondary'}
                    disabled={isLoading}
                    label={t("form.decline") as string}
                    onClick={onFormClose}
            />,
            <Button type={'primary'}
                    behaviorType={'submit'}
                    disabled={isLoading}
                    label={saveButtonLabel as string}
            />
        ]}>
            {getObjectKeys(defaultValues).map(key => {
                const ct = config[key]?.type || 'string'
                return <InputField type={config[key]?.type || 'string'}
                                   {...config[key]}
                                   value={['selector', 'date'].includes(ct) ? defaultValues[key] : watch(key as any)}
                                   error={errorsMessages[key as any]}
                                   register={register(key as string, { validate: validators && validators[key as keyof typeof validators] })}
                                   name={t(getIndex(key as any))}
                />
            })}
            {children}
        </Form>
    </Card>
}