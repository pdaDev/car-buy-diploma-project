import {FC} from "react";
import {Step, StepsContainer} from "./StepsContainer";
import {ChooseConcreteCar} from "../../../ChooseConcreteCar";
import {Selector} from "../../../../shared/ui/Selector/Selector";
import {
    Checkbox, Container, getTranslationIndex, getTranslationIndexCreator, IOption, LoadedImage, LoadImages,
    NumberInput,
    PhoneNumberInput,
    RegisterFunction,
    RUB_SYMBOL,
    Stack,
    Text,
    TextArea
} from "../../../../shared";
import {StepWrapper} from "./StepWrapper";
import {PriceInfo} from "./PriceInfo";
import {NS} from 'entities/Advertisement'
import {useTranslation} from "react-i18next";
import {IPriceRange} from "../../../../entities/Car/namespace";
import {validators} from '../../lib/validators'
import {getPersonalGeoLocation} from "../../../SelectGeoLocation/api";
import {SelectPersonalGeoLocation} from "../../../SelectGeoLocation/ui/SelectProfileLocation";

type FormWithPhoneNumber = NS.AdvertisementFormState & { phoneNumber: string }

interface IProps {
    register: RegisterFunction<FormWithPhoneNumber>
    colorsOptions: IOption[]
    errorsMessages: Record<keyof FormWithPhoneNumber, string>
    dateOfProductionsOptions: IOption[]
    setCar: Function
    setStateValue: Function
    stepsConditions: boolean[]
    priceRange: IPriceRange | undefined
    images: LoadedImage[]
    onLoadImage: (images: LoadedImage[]) => void
    description: string | null
    showHowToConnect: boolean
}

export const AdvertisementCreateForm: FC<IProps> = ({
                                                        register,
                                                        colorsOptions,
                                                        dateOfProductionsOptions,
                                                        errorsMessages,
                                                        setCar,
                                                        description,
                                                        stepsConditions,
                                                        priceRange,
                                                        showHowToConnect,

                                                        setStateValue,
                                                        images, onLoadImage
                                                    }) => {
    const getStep = getTranslationIndexCreator('advertisement.create.steps')
    const getCarIndex = getTranslationIndexCreator('car')
    const {t} = useTranslation()
    const getStepTitle = (data: string) => getTranslationIndex('title', getStep(data))


    const steps: Step[] = [
        {
            title: t(getStepTitle('choose_car')),
            isShow: true,
            isFinished: stepsConditions[0] || false,
            render: <ChooseConcreteCar
                onFinish={setCar}
            />
        },
        {
            isShow: stepsConditions[0] || false,
            isFinished: stepsConditions[1] || false,
            title: t(getStepTitle("set_car_data")),
            render: <>
                <Stack size={'container'} direction={'row'} spacing={3}>
                    <Selector options={colorsOptions}
                              register={register('color')}
                              title={t(getCarIndex("color")) as string}
                              error={errorsMessages.color}
                    />
                    <Selector options={dateOfProductionsOptions}
                              register={register('dateOfProduction')}
                              title={t(getCarIndex("date_of_production")) as string}
                              error={errorsMessages.dateOfProduction}
                    />
                    <NumberInput error={errorsMessages.mileage}
                                 title={t(getCarIndex("mileage")) as string}
                                 register={register('mileage')}
                                 measure={t("metrics.kilometer") as string}
                    />
                </Stack>
                <Checkbox title={t(getStep("set_car_data.in_taxi")) as string}
                          register={register('in_taxi')}
                          error={errorsMessages.in_taxi}
                />
                <TextArea register={register('description')}
                          error={errorsMessages.description}
                          value={description || ''}
                          maxLength={500}
                          title={t(getStep("set_car_data.description")) as string}
                />
            </>
        },
        {
            isFinished: stepsConditions[2] || false,
            isShow: stepsConditions[1] || false,
            title: t(getStepTitle('set_price')),
            render: (step, i) => <StepWrapper {...step} finished={step.isFinished} index={i} withoutPaddings>
                <Stack direction={'row'} size={'width'} vAlign={'center'}>
                    <Container p={3} size={'content'}>
                        <NumberInput register={register('price')}
                                     error={errorsMessages.price}
                                     measure={RUB_SYMBOL}
                                     width={"auto"}
                        />
                    </Container>
                    {priceRange && <PriceInfo price={priceRange}/>}
                </Stack>
            </StepWrapper>

        },

        {
            isFinished: stepsConditions[3] || false,
            isShow: stepsConditions[2] || false,
            title: t(getStepTitle('load_photo')),
            render: <LoadImages onLoadImage={onLoadImage}
                                images={images}
            />
        },
        {
            isFinished: (stepsConditions[4]) || false,
            isShow: (stepsConditions[3] && showHowToConnect) || false,
            title: t(getStepTitle('how_to_connect')),
            render: <Stack spacing={4}>
                <Text content={t(getStep("how_to_connect.text"))}
                      size={3}
                      align={'center'}
                      weight={'regular'}
                />
                <PhoneNumberInput register={register('phoneNumber')}
                                  error={errorsMessages.phoneNumber}
                                  width={"auto"}
                                  textAlign={"center"}
                />
                {<SelectPersonalGeoLocation handleSave={location => setStateValue('address', location)}/>}
            </Stack>
        }
    ]

    return <StepsContainer steps={steps}
                           stepWrapper={(step, children, index) => (
                               <StepWrapper
                                   index={index}
                                   finished={step.isFinished}
                                   title={step.title}>
                                   {children}
                               </StepWrapper>
                           )}
    />
}