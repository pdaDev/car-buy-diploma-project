import React, {FC, useEffect} from "react";
import {useSearchParams} from "react-router-dom";
import {useGetCarCharacteristicsQuery, NS, CarPropBlock} from "../../../entities/Car";
import {Card, Container, Label, Stack, Switcher} from "../../../shared";
import {CarTitle} from "../../../entities/Car/ui/CarTitle/CarTitle";
import {CarPropsByEquipment} from "../../../features/ChooseCarEquipment/ui/CarPropsByEquipment";
import {CarPathNavigation} from "../../../features/CarPathNavigation/ui/CarPathNavigation";
import {useAppNavigate} from "../../../app/services";
import {CarGenerationSwitcher} from "../../../features/CarGenerationSwitcher";
import {Selector} from "../../../shared/ui/Selector/Selector";
import {useTranslation} from "react-i18next";

export const CarCharacteristics: FC = () => {
    const [searchProps, setSearchProps] = useSearchParams()
    const generation = searchProps.get('generation') || 'none'
    const equipment = searchProps.get('equipment')
    const {data, isLoading} = useGetCarCharacteristicsQuery({
        generation,
        equipment
    } as any)
    const onEquipmentChange = (equipment: number) => {
        setSearchProps({equipment: equipment.toString(), generation})
    }

    const {t} = useTranslation()


    return <Container max_w={'800px'}>
        <Stack size={'container'} spacing={4} vAlign={'start'}>
            <Stack direction={'row'} size={'width'}>
                {data && <CarPathNavigation brend={data.car.brend}
                                            generation={data.car.generation}
                                            technical={true}
                                            model={data.car.model}
                />}
                <CarGenerationSwitcher generation={+generation}
                                       current={'characteristics'}
                />
            </Stack>

            <CarTitle data={data?.car || null}/>
            {data && <Card width={'100%'}>
                <Container p={3}>
                    <Stack spacing={5}>
                        <Stack direction={'row'} size={'width'} vAlign={'center'}>
                            <Label label={t("car.car_characteristics_for_equipment")} level={2}/>
                            <Container max_w={'200px'}>
                                <CarPropsByEquipment equipments={data.equipments}
                                                     defaultEquipment={data.equipment}
                                />
                            </Container>
                        </Stack>
                        <CarPropBlock {...data.info}/>
                    </Stack>
                </Container>
            </Card>
            }
        </Stack>

    </Container>
}
