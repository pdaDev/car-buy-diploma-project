import {FC} from "react";
import {Card, Grid} from "shared";
import {PropsRender} from "../../PropsRender";
import * as NS from '../../../namespace'
import {getCarPropsIndex} from "../../../lib/helpers";
import {useDeleteEntity} from "../../../lib/hooks";
import {apiRoutes} from "../../../lib/constants";
import {CardManagePanel} from "../../CardManagePanel";
interface IProps {
    openConcreteCarForm: (v: NS.FormType) => void
}

export const CarCard: FC<IProps & NS.IServerConcreteCar> = ({openConcreteCarForm, car_id,...props}) => {
    const deleteConcreteCar = useDeleteEntity(apiRoutes.concreteCar)
    return <Card paddings={4} contentDirection={'column'} contentGap={4}>
        <CardManagePanel openForm={openConcreteCarForm}
                         deleteEntity={() => deleteConcreteCar(car_id)}
                         withCreateAccordingCurrent
        />
        <Grid container cols={3} gap={4}>
            <PropsRender entity={props}
                         exceptions={['generation_variant', 'equipment', 'car_body_type']}
                         translationIndex={getCarPropsIndex}
            />
        </Grid>
    </Card>
}