import {FC} from "react";
import * as NS from '../../namespace'
import {Card, Grid} from "shared";
import {PropsRender} from "../PropsRender";
import {getCarPropsIndex} from "../../lib/helpers";



interface IProps {
}

export const TransmissionCard: FC<NS.IServerTransmission & IProps> = (props) => {

    const data = {...props, producer: props.producer.name}
    return (
    <Card paddings={4}>
        <Grid cols={3} container gap={4}>
            <PropsRender entity={data}
                         translationIndex={getCarPropsIndex}
                         exceptions={['transmission_id']}
            />
        </Grid>
    </Card>)
}