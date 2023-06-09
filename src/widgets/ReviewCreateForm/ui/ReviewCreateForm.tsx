import React, {FC, useEffect, useState} from "react";
import {
    Button, Card, Container, Form,
    Input, IRetrieveImage,
    IServerCarName, Label, LoadedImage,
    LoadImages,
    ReviewPointsWithoutTotal, SelectedCar,
    Stack,
    TextArea, useMultiLanguageValidationErrors
} from "../../../shared";
import {RenderFormLine} from "./RenderFormLine";
import {ReviewSetScore} from "../../../features/ReviewSetScore";
import {CarSearchBlock} from "../../../features/ExtendedSearch/ui/CarSeachBlock";
import {NS} from 'entities/Review'
import {CarTitle} from "../../../entities/Car/ui/CarTitle/CarTitle";
import {useGetCarFullNameQuery} from "../../../entities/Car";
import {useForm} from "react-hook-form";
import {validators} from "../lib/validators";
import {useSearchParams} from "react-router-dom";
import {useAppDispatch} from "../../../app/services";
import {openModal} from "../../../app/services/withPopupProvider";
import {useTranslation} from "react-i18next";


interface IProps {
    withCarChoose?: boolean
    defaultData?: Omit<NS.IReview, 'car'> & { car: IServerCarName }
    onSubmit: (data: FormData) => void
    loading: boolean
}

type UseFormParams = {
    title: string
    message: string
    car: string
}

export const ReviewCreateForm: FC<IProps> = (
    {
        withCarChoose = false,
        defaultData,
        onSubmit,
        loading
    }) => {
    const isEdit = Boolean(defaultData)
    const {register, handleSubmit, setValue, clearErrors, watch, formState: {errors}, setError} = useForm<UseFormParams>(
        {
            mode: 'onTouched', defaultValues: {
                title: defaultData?.title || '', message: defaultData?.message || ''
            }
        })


    const p = defaultData?.score_point
    const defaultPoints: ReviewPointsWithoutTotal = {
        comfort_point: p?.comfort_point || 0,
        contrallabilty_point: p?.contrallabilty_point || 0,
        economic_point: p?.economic_point || 0,
        reliable_point: p?.reliable_point || 0,
        safety_point: p?.safety_point || 0,
        cross_country_point: p?.cross_country_point || 0,
    }
    const [searchParams, setSearchParams] = useSearchParams()
    const searchParamCarChoose = searchParams.get('choose-car')
    const carChooseOpportunity = searchParamCarChoose ? !!(+searchParamCarChoose) : withCarChoose

    console.log(carChooseOpportunity)

    const queryParamsCar: SelectedCar = {
        brend_id: searchParams.get('brend_id') !== null ? +searchParams.get('brend_id')! : null,
        model_id: searchParams.get('model_id') !== null ? +searchParams.get('model_id')! : null,
        generation_id: searchParams.get('generation_id') !== null ? +searchParams.get('generation_id')! : null,
    }
    const {data: carName} = useGetCarFullNameQuery(queryParamsCar.generation_id!, {skip: Boolean(defaultData) || carChooseOpportunity || !queryParamsCar.generation_id})

    const onCarChange = (car: SelectedCar) => {
        clearErrors('car')
        setSearchParams(car as any)
    }

    const [points, changePoints] = useState<ReviewPointsWithoutTotal>(defaultPoints)
    const [photos, loadPhoto] = useState<LoadedImage[]>([])

    useEffect(() => {
        if (defaultData) {
            setValue('title', defaultData.title)
            setValue('message', defaultData.message)
            loadPhoto(defaultData?.photos.map(p => ({...p, file: null})))
            changePoints(defaultPoints)
        }
    }, [defaultData])
    const d = useAppDispatch()

    const handleFormSubmit = ({title, message}: UseFormParams) => {
        if (carChooseOpportunity && !queryParamsCar.generation_id) {
            setError('car', {message: 'required'})
        } else {
            const car = defaultData ? {} : {car: queryParamsCar.generation_id!}
            const formData = new FormData()
            const payload = {
                ...points,
                message,
                title,
                ...car
            }


            Object.keys(payload).forEach(key => {
                formData.append(key, payload[key as keyof typeof payload]!.toString())
            })

            photos
                .filter(p => !p.id && p.file)
                .forEach(p => formData.append('photos', p.file!))
            if (isEdit && defaultData) {
                const photosId = photos.filter(p => p.id).map(p => p.id)
                defaultData.photos
                    .filter(p => !photosId.includes(p.id))
                    .forEach(p => formData.append('deleted_photos', p.id.toString()))
            }

            onSubmit(formData)
        }
    }
    const {t} = useTranslation()
    const declineEditMode = () => setSearchParams({mode: 'view'})
    const errorsMessages = useMultiLanguageValidationErrors(errors)

    return <Container max_w={'800px'}>
        <Stack size={'width'} spacing={4}>
            {carChooseOpportunity
                ? <RenderFormLine title={'car'} zi={10}>
                    <CarSearchBlock data={queryParamsCar} onSearchChange={onCarChange}/>
                    <Label label={errors.car?.message}/>
                </RenderFormLine>

                : <CarTitle data={defaultData ? defaultData.car : (carName || null)}/>}
            <Form onSubmit={handleSubmit(handleFormSubmit)}
                  controls={[
                      isEdit && <Button type={'secondary'}
                                        width={'full'}
                                        disabled={loading}
                                        onClick={declineEditMode}
                                        label={t("confirmation.decline") as string}
                      />,
                      <Button type={'primary'}
                              width={'full'}
                              behaviorType={'submit'}
                              disabled={loading}
                              label={'сохранить'}
                      />
                  ]}
            >
                <RenderFormLine title={'content'}>
                    <Input width={'full'}
                           title={'Заголовок'}
                           error={errorsMessages.title}
                           register={register('title', { validate: validators.title })}/>
                    <TextArea error={errorsMessages.message}
                              title={'Текст'}
                              value={watch('message')}
                              maxLength={3000}
                              register={register('message', { validate: validators.message })}/>
                </RenderFormLine>
                <RenderFormLine title={'set_score'}>
                    <ReviewSetScore data={defaultPoints}
                                    onChange={changePoints}
                    />
                </RenderFormLine>
                <RenderFormLine title={'load_image'}>
                    <LoadImages images={photos}
                                onLoadImage={loadPhoto}/>
                </RenderFormLine>
            </Form>
        </Stack>
    </Container>
}