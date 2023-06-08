import {FC} from "react";
import {
    Card,
    ColorMark,
    getTranslationIndexCreator,
    Grid,
    Label,
    Stack,
    useMultiLanguageHandbooks
} from "../../../../../shared";
import * as NS from '../../../namespace'
import {PropsRender} from "../../PropsRender";
import {useTranslation} from "react-i18next";
import {MaterialCard} from "./MaterialCard";
import {useDeleteEntity} from "../../../lib/hooks";
import {apiRoutes} from "../../../lib/constants";
import {CardManagePanel} from "../../CardManagePanel";


interface IProps {
    openEquipmentForm: (v: NS.FormType) => void
}

export const EquipmentCard: FC<IProps & NS.IServerEquipment> = ({colors, openEquipmentForm, equipment_id, materials, ...props}) => {
    const { getHandbookItemName } = useMultiLanguageHandbooks()
    const rootIndex = 'admin.data_management.cars.equipment'
    const getIndex = getTranslationIndexCreator(rootIndex)
    const { t } = useTranslation()
    const deleteEquipment = useDeleteEntity(apiRoutes.equipment)
    return <Card shadow={3} paddings={4} contentGap={5} contentDirection={'column'}>
        <CardManagePanel openForm={openEquipmentForm}
                         deleteEntity={() => deleteEquipment(equipment_id)}
                         withCreateAccordingCurrent
        />
        <Grid cols={3} container gap={4}>
            <PropsRender entity={props}
                         exceptions={['generation', 'engine']}
                         translationIndex={rootIndex}
            />
        </Grid>
        <Label label={t(getIndex('colors'))} level={3} weight={'regular'}/>
        <Stack direction={'row'} spacing={3} wrap hAlign={'start'}>
            {colors.map(c => <ColorMark name={getHandbookItemName(c)}
                                        color={c.color}
                />
                )}

        </Stack>
        <Label label={t(getIndex('materials'))} />
        <Stack direction={'row'} spacing={3} wrap hAlign={'start'}>
            { materials.map(m => <MaterialCard name={getHandbookItemName(m)}/>) }
        </Stack>
    </Card>
}