import {FC, useEffect, useState} from "react";
import {
    Button, Container, createOptions, debounce, Form, formatNumber, formatPhoneNumber, FormMode,
    IOption, LoadedImage, transformObjectToFormData, useMultiLanguageValidationErrors
} from "../../../shared";
import {patchUser, selectors as userSelectors} from 'entities/User'
import {NS} from "../../../entities/Advertisement";
import {useGetCarPriceRangeQuery, useGetCarSearchPropQuery} from "../../../entities/Car";
import {useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";
import {useAppDispatch, useAppNavigate, useAppSelector} from "../../../app/services";
import {openModal} from "../../../app/services/withPopupProvider";
import {AdvertisementCreateForm, AdvertisementEditForm} from "../../../features/AdvertisementForm";
import {IServerGeoLocationItem} from "../../../features/SelectGeoLocation/namespace";
import {getPersonalGeoLocation} from "../../../features/SelectGeoLocation/api";


interface IProps {

    onSubmit: Function
    loading?: boolean
    defaultData?: NS.IServerAdvertisement
    mode: 'create' | 'edit'
    changeFormMode?: (mode: FormMode) => void
}


type AdvertisementData = NS.AdvertisementFormState

export const AdvertisementForm: FC<IProps> = ({onSubmit, defaultData, loading, mode, changeFormMode}) => {

    const isEditMode = mode === 'edit'
    const phoneNumber = useAppSelector(userSelectors.selectUserPhoneNumber)

    const defaultState: AdvertisementData & { phoneNumber: null | string, address: IServerGeoLocationItem | null } = {
        dateOfProduction: null,
        mileage: null,
        in_taxi: false,
        car_id: null,
        color: null,
        owners_count: 0,
        price: null,
        description: '',
        phoneNumber: phoneNumber ? formatPhoneNumber(phoneNumber, false) : null,
        address: getPersonalGeoLocation()
    }


    const {
        formState: {errors},
        setValue,
        register,
        watch,
        handleSubmit
    } = useForm<typeof defaultState>({defaultValues: defaultState, shouldUnregister: true})
    const defualtFormEditData: Omit<AdvertisementData, 'owners_count' | 'car_id'> = {
        dateOfProduction: +(defaultData?.date_of_production || 0),
        mileage: formatNumber(defaultData?.mileage || 0),
        in_taxi: !!defaultData?.in_taxi,
        color: defaultData?.color.code || '',
        price: formatNumber(defaultData?.price.latest || 0),
        description: defaultData?.description || ''
    }
    // useEffect(() => {
    //     if (phoneNumber) {
    //         setValue('phoneNumber', formatPhoneNumber(phoneNumber))
    //     }
    // }, [phoneNumber])

    useEffect(() => {
        if (isEditMode && defaultData) {
            Object.keys(defualtFormEditData).forEach((key) => {
                setValue(key as keyof AdvertisementData,
                    defualtFormEditData[key as keyof typeof defualtFormEditData])
            })
            setImages(defaultData.photos.map(p => ({
                ...p,
                file: null
            })))
        }
    }, [defaultData, isEditMode])


    const errorsMessages = useMultiLanguageValidationErrors(errors)


    const setCar = (car: number) => setValue('car_id', car)

    const car = defaultData && isEditMode ? defaultData.car_id : watch('car_id')
    const dateOfProduction = watch('dateOfProduction')
    const m = watch('mileage')
    const color = watch('color')
    const description = watch('description')
    const mileage = Number(m ? m.replace(/\D/g, '') : m)
    const p = watch('price')
    const price = Number(p ? p.replace(/\D/g, '') : p)

    const {data: carInfo, refetch: refetchCarInfo} = useGetCarSearchPropQuery(car!, {skip: !car})
    const getPrice = !!car && !!mileage && !!dateOfProduction
    const {data: priceRange, refetch: refetchCarPrice} = useGetCarPriceRangeQuery(
        {car_id: car!, mileage: mileage!, date_of_production: dateOfProduction!}, {skip: !getPrice})


    const debouncedPriceRefetch = debounce(refetchCarPrice, 100)

    useEffect(() => {
        if (getPrice) {
            debouncedPriceRefetch()
        }
    }, [getPrice])


    const colorsOptions = carInfo ? createOptions(carInfo.colors, 'code', 'ru_name') : []
    const minDateOfProdaction = carInfo ? new Date(carInfo.generation.start_date).getFullYear() : 0
    const maxDateOfProdaction = carInfo
        ? carInfo.generation.end_date
            ? new Date(carInfo.generation.end_date).getFullYear()
            : new Date().getFullYear()
        : 0
    const dateOfProductions = carInfo
        ? [...new Array(maxDateOfProdaction - minDateOfProdaction + 1)].map((_, index) => minDateOfProdaction + index)
        : []
    const dateOfProductionsOptions: IOption<number>[] = dateOfProductions.map(year => ({
        label: year.toString(),
        value: year
    }))

    const {t} = useTranslation()
    const d = useAppDispatch()
    const isCreateMode = mode === 'create'
    const [images, setImages] = useState<LoadedImage[]>([])


    const formSubmit = (data: typeof defaultState) => {
        const {phoneNumber: changePhoneNumber, ...body} = data

        if (isCreateMode) {
            const parsedPhoneNumber = '8' + (changePhoneNumber || '').replace(/\D/g, '')
            if (!phoneNumber) {
                const formData = new FormData()
                formData.append('phone_number', parsedPhoneNumber)
                d(patchUser({data: formData}))
            }
        }

        const hasChanges = isCreateMode || Object.keys(defualtFormEditData).some(key => (
            defualtFormEditData[key as keyof typeof defualtFormEditData] !== data[key as keyof AdvertisementData]
        )) || (defaultData !== undefined ? defaultData.photos.length !== images.length : false)

        const cityAddress = getPersonalGeoLocation()
        const hasRegions = cityAddress && cityAddress.parents && cityAddress.parents.length > 0
        const regionAddress = hasRegions ? cityAddress!.parents![0] : null

        const adress = isCreateMode ? {
            adress: {
                type: cityAddress.typeShort,
                guid: cityAddress.guid,
                name: cityAddress.name,
                parent: regionAddress ? {
                    type: regionAddress.typeShort,
                    guid: regionAddress.guid,
                    name: regionAddress.name
                } : regionAddress
            } as NS.IAdvertisementAddress
        } : {}
        if ((isEditMode && hasChanges) || isCreateMode) {
            const payload = {
                ...body,
                ...adress,
                car_id: car,
                mileage: mileage,
                date_of_production: +body.dateOfProduction!,
                price: price,
                in_taxi: body.in_taxi ? 1 : 0,
            }
            const formData = transformObjectToFormData(payload)
            images
                .filter(p => !p.id && p.file)
                .forEach(p => formData.append('photos', p.file!))
            if (isEditMode && defaultData) {
                const photosId = images.filter(p => p.id).map(p => p.id)
                defaultData.photos
                    .filter(p => !photosId.includes(p.id))
                    .forEach(p => formData.append('deleted_photos', p.id.toString()))
            }

            onSubmit(formData)
        } else {
            changeFormMode && changeFormMode('view')
        }
    }

    const pn = watch('phoneNumber')

    const stepsConditions = [
        !!car,
        getPrice && !!color && !!description?.length,
        !!price,
        images.length > 0,
        !phoneNumber ? ((pn ? pn.length === 10 : false) && !!getPersonalGeoLocation())  :null
    ].filter(v => v !== null) as boolean[]

    const n = useAppNavigate()
    const decline = () => {
        if (isCreateMode) {
            n(p => p.init)
        } else {
            const hasChanges = isCreateMode || Object.keys(defualtFormEditData).some(key => (
                defualtFormEditData[key as keyof typeof defualtFormEditData] !== watch(key as keyof AdvertisementData)
            ))
            if (hasChanges) {
                d(openModal({
                    key: 'confirm', payload: {
                        index: 'decline_edit_ad',
                        onConfirm: () => changeFormMode && changeFormMode('view')
                    }
                }))
            }
        }
    }
    const saveButtonLabel = isCreateMode ?
        t('advertisement.create.submit')
        : t("form.save")

    const controls = [
        <Button type={'secondary'}
                label={t("form.decline") as string}
                onClick={decline}
        />,
        <Button type={'primary'}
                behaviorType={'submit'}
                disabled={loading}
                label={saveButtonLabel as string}
        />
    ]


    return <Container max_w={'800px'}>
        <Form onSubmit={handleSubmit(formSubmit)}
              controls={isEditMode
                  ? controls
                  : !!getPersonalGeoLocation() && stepsConditions[stepsConditions.length - 1]
                      ? controls
                      : []
        }
        >
            {isEditMode ? <AdvertisementEditForm register={register as any}
                                                 defaultData={defaultData}
                                                 errorsMessages={errorsMessages}
                                                 colorsOptions={colorsOptions}
                                                 description={description}
                                                 images={images}
                                                 onImageLoad={setImages}
                                                 dateOfProductionsOptions={dateOfProductionsOptions}
            /> : <AdvertisementCreateForm register={register as any}
                                          colorsOptions={colorsOptions}
                                          errorsMessages={errorsMessages}
                                          dateOfProductionsOptions={dateOfProductionsOptions}
                                          setCar={setCar}
                                          showHowToConnect={!phoneNumber || !defaultState.address}
                                          images={images}
                                          description={description}
                                          onLoadImage={setImages}
                                          setStateValue={setValue}
                                          stepsConditions={stepsConditions}
                                          priceRange={priceRange}
            />

            }
        </Form>
    </Container>
}


