import {FC} from "react";
import s from './CompareResultsModals.module.scss'
import {
    Card,
    CardImageViewer,
    Container,
    getCarName,
    getCarNameFromObjectWithId,
    Label,
    Price,
    Stack
} from "../../../../shared";
import {CompareType, IServerCompareItem} from "../../namespace";
import {Mark} from "./Mark";
import {useAppNavigate} from "../../../../app/services";

interface IProps {
    data: IServerCompareItem
    mark: number
    type: CompareType
}

export const CompareElCard: FC<IProps> = ({ data:
    {
        car ,
        photos,
        compare_item_id,
        price,
        type,
        characteristics
    }, mark }) => {
    const n = useAppNavigate()
    const onResultClick = () => type === 'ad' && n(d => d.advertisement._key_(compare_item_id))
    const carName = car ? getCarNameFromObjectWithId(car) : ''
    return <Card contentDirection={'column'}
                 shadow={3}
                 color={'light-card'}
                 width={'250px'}
                 height={'auto'}
                 onClick={onResultClick}>
        <Stack hAlign={"center"} spacing={3} size={'content'}>
            <Container max_w={'250px'} max_h={'180px'} min_h={'180px'}>
                <CardImageViewer photos={photos}/>
            </Container>
            <Container pr={3} pl={3}>
                <Stack hAlign={'center'} size={'container'}>
                    <Label label={carName}/>
                    <Price price={price}/>
                    <Stack direction={'row'} size={'width'}>
                        <Label level={4} label={characteristics.common.date_of_production} type={'secondary'}/>
                        <Label level={4} label={characteristics.common.mileage} type={'secondary'}/>
                    </Stack>
                </Stack>
            </Container>
            <Container contentAlign={'center'}>
                <Mark mark={mark}/>
            </Container>
        </Stack>
    </Card>
}