import {FC} from "react";
import {
    Card,
    Container,
    Details,
    getTranslationIndexCreator,
    IBrend,
    Image,
    Label,
    List,
    Loader,
    Stack
} from "../../../../../shared";
import {useGetCarModelsQuery} from "../../../../../entities/Car";
import {GenerationCard} from "../Generation/GenerationCard";
import {CommonListForm} from "../../CommonListForm";
import {useGetModelsQuery} from "../../../api";
import * as NS from '../../../namespace'
import {ModelCard} from "../Model/ModelCard";
import {EntitiesListItem} from "../EnititiesListItem";
import {useDeleteEntity} from "../../../lib/hooks";
import {apiRoutes} from "../../../lib/constants";
import {useTranslation} from "react-i18next";
import {CardManagePanel} from "../../CardManagePanel";

interface IProps {
    selectModel: Function
    openModelForm: (v: NS.FormType) => void
    openBrendForm: (v: NS.FormType) => void
}

export const BrendCard: FC<IProps & IBrend> = ({
                                          brend_id,
                                          name,
                                          logo,
                                          selectModel,
                                          openModelForm,
                                          openBrendForm
                                      }) => {

    const rootIndex = 'admin.data_management.cars.brend'
    const getIndex = getTranslationIndexCreator(rootIndex)
    const deleteModel = useDeleteEntity(apiRoutes.model)
    const deleteBrend = useDeleteEntity(apiRoutes.brend)
    const {t} = useTranslation()
    return <Stack size={'width'} spacing={4}>
        <Card paddings={4}>
            <Stack direction={'row'} spacing={4} vAlign={'center'}>
                <Label label={name} weight={'regular'} level={2}/>
                <CardManagePanel openForm={openBrendForm} deleteEntity={() => deleteBrend(brend_id)}/>
            </Stack>
            { logo &&   <Image src={logo} alt={''} width={'100'} height={'100px'}/> }
        </Card>
        <Label label={t(getIndex('label'))}/>
        <CommonListForm translationKey={rootIndex}
                        extra={{brend: brend_id}}
                        openCreateForm={() => openModelForm('create')}
                        useGetQuery={useGetModelsQuery}
                        renderListItem={(data: NS.IServerModel, loading, i, isLastElement) => data &&
                            <EntitiesListItem
                                openEntityForm={openModelForm}
                                deleteEntity={() => deleteModel(data.model_id)}
                                onSelect={selectModel}
                                entity={data}
                                isLastElement={isLastElement}/>
                        }
        />
    </Stack>
}