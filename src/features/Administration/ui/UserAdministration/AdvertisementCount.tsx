import {FC} from "react";
import {Card, CircleDiagram, Container, getObjectKeys, Label, Stack} from "../../../../shared";
import * as NS from '../../namespace'
import {useTranslation} from "react-i18next";
interface IProps {
    total: number
    opened: number
    booked: number
    closed: number
}

export const AdvertisementCount: FC<IProps> = (props) => {

    const { t } = useTranslation()
    return <Stack direction={'row'} spacing={4} vAlign={'center'}>
        {
            getObjectKeys(props).filter(key => key !== 'total').map((key, index) => <Card border={2} shadow={0} paddings={3} width={'100%'}>
                <Label label={t(`advertisement.statuses.${key}`)}
                       weight={'regular'}
                       align={'center'}
                       size={'3'}/>
                <Container max_w={'40px'} mr={3}>
                    <Container position={'center'} contentAlign={'center'} pl={'10px'}>
                        <Label label={props[key]} />
                    </Container>
                    <CircleDiagram parts={props.total}
                                   strokeWidth={4}
                                   zeroStart={'top'}
                                   part={props[key]}
                    />
                </Container>
            </Card>)
        }
    </Stack>
}