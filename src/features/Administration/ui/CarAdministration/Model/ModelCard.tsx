import {FC} from "react";
import {CommonListForm} from "../../CommonListForm";
import {useGetGenerationsQuery} from "../../../api";
import * as NS from '../../../namespace'
import {GenerationCard} from "../Generation/GenerationCard";
import {Card, Container, Details, getTranslationIndexCreator, Grid, Stack} from "../../../../../shared";
import {PropsRender} from "../../PropsRender";
import {EntitiesListItem} from "../EnititiesListItem";
import {useDeleteEntity} from "../../../lib/hooks";
import {apiRoutes} from "../../../lib/constants";
import {CardManagePanel} from "../../CardManagePanel";


interface IProps {
    openGenerationForm: (v: NS.FormType) => void
    openModelForm: (v: NS.FormType) => void
    selectGeneration: Function
}

export const ModelCard: FC<NS.IServerModel & IProps> = ({
                                                            model_id,
                                                            openModelForm,
                                                            openGenerationForm,
                                                            selectGeneration,
                                                            ...props
                                                        }) => {

    const rootIndex = 'admin.data_management.cars.model'
    const getIndex = getTranslationIndexCreator(rootIndex)
    const deleteGeneration = useDeleteEntity(apiRoutes.generation)
    const deleteModel = useDeleteEntity(apiRoutes.model)
    return <Stack size={'width'} spacing={4}>

        <Card paddings={4} contentDirection={'column'} contentGap={4}>
            <CardManagePanel openForm={openModelForm} deleteEntity={() => deleteModel(model_id)} />
            <Grid cols={2} container>
                <PropsRender entity={props}
                             exceptions={['brend']}
                             translationIndex={rootIndex}/>
            </Grid>
        </Card>
        <CommonListForm translationKey={rootIndex}
                        openCreateForm={() => openGenerationForm('create')}
                        useGetQuery={useGetGenerationsQuery}
                        extra={{model: model_id}}
                        renderListItem={(data: NS.IServerGeneration, loading, index, isLastElement) => data &&
                            <EntitiesListItem onSelect={selectGeneration}
                                              entity={data}
                                              deleteEntity={() => deleteGeneration(data.generation_id)}
                                              openEntityForm={openGenerationForm}
                                              isLastElement={isLastElement}
                            />}
        />

    </Stack>
}