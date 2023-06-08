import {FC} from "react";
import {
    Card,
    Checkbox,
    getTranslationIndexCreator, IOption, Label, LoadedImage, LoadImages,
    NumberInput,
    Register, RegisterFunction,
    RUB_SYMBOL,
    Stack,
    TextArea
} from "../../../../shared";
import {Selector} from "../../../../shared/ui/Selector/Selector";
import {useTranslation} from "react-i18next";
import {NS} from 'entities/Advertisement'
import {validators} from "../../lib/validators";

interface IProps {
    defaultData: NS.IServerAdvertisement | undefined
    register: RegisterFunction<NS.AdvertisementFormState>
    colorsOptions: IOption[]
    errorsMessages: Record<keyof NS.AdvertisementFormState, string>
    dateOfProductionsOptions: IOption[]
    images: LoadedImage[]
    description: string | null
    onImageLoad: (images: LoadedImage[]) => void
}

export const AdvertisementEditForm: FC<IProps> = (
    {
        register,
        colorsOptions,
        defaultData,
        description,
        errorsMessages,
        dateOfProductionsOptions,
        onImageLoad,
        images,
    }) => {
    const {t} = useTranslation()
    const getStep = getTranslationIndexCreator('advertisement.create.steps')
    const getCarIndex = getTranslationIndexCreator('car')
    return <Card width={'100%'} paddings={4}>
        <Stack spacing={3} size={'container'}>
            <Label label={t('advertisement.edit.label')} level={1} weight={'medium'} />
            <Selector options={colorsOptions}
                      register={register('color', { validate: validators.color })}
                      title={t(getCarIndex("color")) as string}
                      error={errorsMessages.color}
                      defaultRegisterData={defaultData?.color.code}
            />
            <Selector options={dateOfProductionsOptions}
                      register={register('dateOfProduction', { validate: validators.dateOfProduction })}
                      current={defaultData?.date_of_production}
                      title={t(getCarIndex("date_of_production")) as string}
                      error={errorsMessages.dateOfProduction}
                      defaultRegisterData={defaultData?.date_of_production}
            />
            <NumberInput error={errorsMessages.mileage}
                         title={t(getCarIndex("mileage")) as string}
                         register={register('mileage', { validate: validators.mileage } )}
            />
            <Checkbox title={t(getStep("set_car_data.in_taxi")) as string}
                      register={register('in_taxi')}
                      error={errorsMessages.in_taxi}
            />
            <TextArea register={register('description', { validate: validators.description })}
                      error={errorsMessages.description}
                      maxLength={500}
                      value={description || ''}
                      title={t(getStep("set_car_data.description")) as string}
            />
            <NumberInput register={register('price', { validate: validators.price })}
                         error={errorsMessages.price}
                         measure={RUB_SYMBOL}
            />
            <LoadImages onLoadImage={onImageLoad}
                        images={images} />
        </Stack>
    </Card>
}