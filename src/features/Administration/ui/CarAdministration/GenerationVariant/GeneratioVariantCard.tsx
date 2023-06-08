import {FC} from "react";
import {Card, Container, ImageSlider, Label, Stack, useMultiLanguageHandbooks} from "../../../../../shared";
import * as NS from '../../../namespace'
import {CardManagePanel} from "../../CardManagePanel";
import {useDeleteEntity} from "../../../lib/hooks";
import {apiRoutes} from "../../../lib/constants";

interface IProps {
    openGenerationVariantForm: (v: NS.FormType) => void
}

export const GenerationVariantCard: FC<IProps & NS.IServerGenerationVariant> = ({ photos, openGenerationVariantForm, generation_variant_id, car_body_type_code }) => {
    const { getHandbookItemName } = useMultiLanguageHandbooks()
    const deleteGenerationVariant = useDeleteEntity(apiRoutes.generationVariant)
    return <Card paddings={4} contentDirection={'column'} contentGap={4}>
        <CardManagePanel openForm={openGenerationVariantForm}
                         deleteEntity={() => deleteGenerationVariant(generation_variant_id)}
                         withCreateAccordingCurrent
        />
        <Stack spacing={3} size={'container'}>
            <Label label={getHandbookItemName(car_body_type_code)}
                   level={2}
                   weight={'medium'}/>
            <ImageSlider images={photos.map(i => i.photo)}/>
        </Stack>
    </Card>
}