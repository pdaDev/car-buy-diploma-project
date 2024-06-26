import * as NS from '../../namespace'
import {FC} from "react";
import {Card, Grid} from "shared";
import {PropsRender} from "../PropsRender";

interface IProps {
}

export const ProducerCard: FC<NS.IServerProducer & IProps> = (props) => {
    return <Card paddings={4} contentDirection={'column'}>
            <Grid cols={3} container gap={4}>
                <PropsRender entity={props}
                             translationIndex={'admin.data_management.producers'}
                             exceptions={['producer_id']}
                />
            </Grid>
    </Card>
}