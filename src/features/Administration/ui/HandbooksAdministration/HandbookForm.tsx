import {FC} from "react";
import * as NS from '../../namespace'
import {useForm} from "react-hook-form";
import {
    Button,
    Form, getObjectKeys,
    getTranslationIndexCreator, ICarBodyTypeHandbook, IColor, IHandbookItem,
    Input, Label,
    Stack, useMultiLanguageHandbooks,
    useMultiLanguageValidationErrors
} from "shared";
import {useAppDispatch} from "app/services";
import {openModal} from "app/services/withPopupProvider";
import {useTranslation} from "react-i18next";
import {handbookValidators} from "../../lib/validators";
import {InputField} from "../FormBuilder/InputField";

interface IProps {
    initHandbook: NS.HandbookResponse
    onSubmit: (data: NS.HandbookResponse) => void
    decline: Function
    type: NS.FormType
    loading: boolean
}

export const HandbookForm: FC<IProps> = ({initHandbook, onSubmit, type, decline, loading}) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        watch,
        getValues
    } = useForm<NS.HandbookResponse>({defaultValues: initHandbook, reValidateMode: 'onChange', mode: 'all'})
    const errorsMessages = useMultiLanguageValidationErrors(errors)
    const checkChanges = (data: NS.HandbookResponse) => {
        return Object.keys(initHandbook).some(key => initHandbook[key as keyof typeof initHandbook] !== data[key as keyof NS.HandbookResponse])
    }
    const formSubmit = (data: NS.HandbookResponse) => {
        if (!checkChanges(data)) {
            decline()
        } else {
            onSubmit(data)
        }
    }

    const d = useAppDispatch()
    const declineForm = () => {
        if (checkChanges(getValues())) {
            d(openModal({
                key: 'confirm', payload: {
                    index: '',
                    onConfirm: decline
                }
            }))
        } else {
            decline()
        }
    }
    const {t} = useTranslation()
    const getIndex = getTranslationIndexCreator('admin.data_management.handbooks')
    const inputsTypes: Partial<Record<keyof( IHandbookItem & IColor & ICarBodyTypeHandbook), NS.InputFieldType>> = {
        ru_description: 'text',
        eng_description: 'text',
        count_of_sit_places: 'counter',
        count_of_doors: 'counter',
        color: 'color'
    }
    const { getHandbookItemName } = useMultiLanguageHandbooks()

    return <Form onSubmit={handleSubmit(formSubmit)} controls={[
        <Button type={'secondary'} label={t("form.decline") as string} onClick={declineForm}/>,
        <Button type={'primary'} disabled={loading} behaviorType={'submit'} label={t("form.save") as string}/>
    ]}>
        <Label
            label={`${t(`admin.data_management.${type}`)} ${type === 'edit' ? getHandbookItemName(initHandbook) : ''}`}
            level={2} weight={'medium'}/>
        {getObjectKeys(initHandbook).filter(k => k !== 'icon' as any && k !== 'rgba' as any).map(key => {
            const type = inputsTypes[key] || 'string'
            return <InputField type={type}
                               max={type === 'text' ? 500 : undefined}
                               value={watch(key as any)}
                               register={register(key,  { validate: handbookValidators[key] })}
                               name={t(getIndex(key))}
                               error={errorsMessages[key]}/>

            }
        )}
    </Form>


}

/**
 * <Input register={register(key,  { validate: handbookValidators[key] })}
 *                                                        title={t(getIndex(key)) as string}
 *                                                        error={errorsMessages[key]}
 *
 *             />
  */
