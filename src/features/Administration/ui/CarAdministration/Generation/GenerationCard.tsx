import {FC, useState} from "react";
import {
    Card, Checkbox,
    Container,
    Details, getTranslationIndexCreator, Grid,
    Label,
    Stack,
    useMultiLanguageHandbooks
} from "shared";
import {useTranslation} from "react-i18next";
import {CommonListForm} from "../../CommonListForm";
import * as NS from '../../../namespace'
import {useGetConcreteCarsQuery, useGetEquipmentsQuery, useGetGenerationVariantsQuery} from "../../../api";
import {EntitiesListItem} from "../EnititiesListItem";
import {PropsRender} from "../../PropsRender";
import {useDeleteEntity} from "../../../lib/hooks";
import {apiRoutes} from "../../../lib/constants";
import {CardManagePanel} from "../../CardManagePanel";

interface IProps {
    selectGenerationVariant: Function
    selectEquipment: Function
    selectConcreteCar: Function
    openEquipmentForm: (v: NS.FormType) => void
    openConcreteCarForm: (v: NS.FormType) => void
    openeGenerationVariantForm: (v: NS.FormType) => void
    openGenerationForm: (v: NS.FormType) => void
    chooseEquipment: Function
    chooseGenerationVariant: Function
    chosenEquipment: NS.IServerEquipment | null
    chosenGenerationVariant: NS.IServerGenerationVariant | null
}

export const GenerationCard: FC<NS.IServerGeneration & IProps> = ({
                                                                      generation_id,
                                                                      selectConcreteCar,
                                                                      selectGenerationVariant,
                                                                      selectEquipment,
                                                                      openGenerationForm,
                                                                      openConcreteCarForm,
                                                                      openeGenerationVariantForm,
                                                                      openEquipmentForm,
                                                                      chosenEquipment,
                                                                      chosenGenerationVariant,
                                                                      chooseEquipment,
                                                                      chooseGenerationVariant,
                                                                      ...props
                                                                  }) => {
    const {t} = useTranslation()
    const {getHandbookItemName} = useMultiLanguageHandbooks()
    const getIndex = getTranslationIndexCreator('admin.data_management.cars')

    const [canChoose, setCanChoose] = useState(false)

    const toggleCanChoose = (v: boolean) => {
        setCanChoose(v)

        if (!v) {
            chooseEquipment(null)
            chooseGenerationVariant(null)
        }
    }

    const deleteGeneration = useDeleteEntity(apiRoutes.generation)
    const deleteEquipment = useDeleteEntity(apiRoutes.equipment)
    const deleteGenerationVariant = useDeleteEntity(apiRoutes.generationVariant)
    const deleteConcreteCar = useDeleteEntity(apiRoutes.concreteCar)

    const canCreateNewCar = !!chosenGenerationVariant && !!chosenEquipment


    return <Stack spacing={4} size={'container'}>
        <Card paddings={4} contentDirection={'column'} contentGap={4}>
            <CardManagePanel openForm={openGenerationForm}
                             deleteEntity={() => deleteGeneration(generation_id)}
            />
            <Stack spacing={4} size={'width'}>
                <Grid cols={3} container gap={4}>
                    <PropsRender entity={props}
                                 translationIndex={'admin.data_management.cars.generation'}
                                 exceptions={['model']}
                    />
                </Grid>
                <Checkbox title={'Выбрать определенные кузова и комплектация'}
                          checked={canChoose}
                          onChange={toggleCanChoose}
                />
            </Stack>
        </Card>
        <Stack spacing={3} size={'container'} vAlign={'start'}>
            <Details label={t(getIndex('equipment.label'))}>
                <Container p={4}>
                    <CommonListForm translationKey={getIndex('equipment')}
                                    useGetQuery={useGetEquipmentsQuery}
                                    openCreateForm={() => openEquipmentForm('create')}
                                    renderListItem={(data: NS.IServerEquipment, loading, index, isLastElement) =>
                                        data &&
                                        <EntitiesListItem onSelect={!canChoose ? selectEquipment : chooseEquipment}
                                                          entity={data}
                                                          openEntityForm={openEquipmentForm}
                                                          deleteEntity={() => deleteEquipment(data.equipment_id)}
                                                          selected={canChoose ? chosenEquipment?.equipment_id === data.equipment_id : undefined}
                                                          isLastElement={isLastElement}/>
                                    }
                                    extra={{generation: generation_id}}
                    />
                </Container>
            </Details>
            <Details label={t(getIndex('generation_variant.label'))}>
                <Container p={4}>
                    <CommonListForm translationKey={getIndex('generation_variant')}
                                    useGetQuery={useGetGenerationVariantsQuery}
                                    extra={{generation: generation_id}}
                                    openCreateForm={() => openeGenerationVariantForm('create')}
                                    renderListItem={(data: NS.IServerGenerationVariant, loading, index, isLastElement) =>
                                        data && <EntitiesListItem
                                            selected={canChoose ? chosenGenerationVariant?.generation_variant_id === data.generation_variant_id : undefined}
                                            onSelect={() => !canChoose ? selectGenerationVariant(data) : chooseGenerationVariant(data)}
                                            entity={data as any}
                                            isLastElement={isLastElement}
                                            deleteEntity={() => deleteGenerationVariant(data.generation_variant_id)}
                                            openEntityForm={openeGenerationVariantForm}
                                        >
                                            <Label label={getHandbookItemName(data.car_body_type_code)} level={3}
                                                   weight={'medium'}/>
                                        </EntitiesListItem>
                                    }
                    />
                </Container>
            </Details>
            <Details label={t(getIndex('car.label'))}>
                <Container p={4}>
                    <CommonListForm translationKey={getIndex('generation_variant')}
                                    useGetQuery={useGetConcreteCarsQuery}
                                    withQuery={false}
                                    openCreateForm={canCreateNewCar ? () => openConcreteCarForm('create') : undefined}
                                    withControls={false}
                                    extra={{
                                        generation: generation_id,
                                        generation_variant: chosenGenerationVariant?.generation_variant_id || null,
                                        equipment: chosenEquipment?.equipment_id || null
                                    }}
                                    renderListItem={(data: NS.IServerConcreteCar, loading, index, isLastElement) =>
                                        data && <EntitiesListItem onSelect={selectConcreteCar}
                                                                  entity={data as any}
                                                                  isLastElement={isLastElement}
                                                                  deleteEntity={() => deleteConcreteCar(data.car_id)}
                                                                  openEntityForm={openConcreteCarForm}
                                        >
                                            <Label
                                                label={`${getHandbookItemName(data.car_body_type)} ${data.equipment.name}`}
                                                level={3}
                                                weight={'medium'}/>
                                        </EntitiesListItem>

                                    }
                    />
                </Container>
            </Details>
        </Stack>
    </Stack>;
}