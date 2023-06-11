import {FC} from "react";
import * as NS from '../../namespace'
import {Card, Grid} from "shared";
import {PropsRender} from "../PropsRender";
import {getCarPropsIndex} from "../../lib/helpers";
interface IProps {
}
export const EngineCard: FC<IProps & NS.IServerEngine> = (props) => {
    const data = {...props, producer: props.producer.name}
    return <Card shadow={3} paddings={4}>
            <Grid container
                  gap={4}
                  size={'container'}
                  cols={3} >
                <PropsRender entity={data}
                             translationIndex={getCarPropsIndex}
                             exceptions={[]}
                />
            </Grid>
    </Card>
}