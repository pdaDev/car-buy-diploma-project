import {FC} from "react";
import {
    Card,
    CardImageViewer, Color,
    Container,
    getCarNameFromObjectWithId, getTranslationIndexCreator,
    Label,
    Stack, Symbol, Tooltip,
    useMultiLanguageHandbooks
} from "shared";
import * as NS from '../../namespace'
import {getPriceRange} from "entities/Car/lib/helpers";
import {useTranslation} from "react-i18next";

interface IProps {
    data: NS.IServerTestCar
    onClick: Function

}

export const CarCard: FC<IProps> = ({data, onClick}) => {
    const carName = getCarNameFromObjectWithId(data.name)
    const {getHandbookItemName} = useMultiLanguageHandbooks()
    const {t} = useTranslation()
    const getIndex = getTranslationIndexCreator('test.result.match')
    const getColorOfStatusMark = (): Color => {
        switch (data.match_status) {
            case 0:
                return 'red-light'
            case 1:
                return 'warning'
            case 2:
                return 'green-light'
        }
    }
    return <Card width={'280px'} onClick={onClick} paddings={0}>
        <Container position={'top-left'} size={'content'} zi={10}>
            <Tooltip text={t(getIndex('description'))} time={1000} position={'down'}>
                <Card border={[2, 0, 2, 0]} paddings={[3, 4]} color={getColorOfStatusMark()}>
                    <Symbol content={t(getIndex(data.match_status.toString()))}
                            size={3}
                            color={'fnt-black'}
                            weight={'regular'}/>

                </Card>
            </Tooltip>
        </Container>
        <Stack spacing={3} size={'width'}>
            <Container min_h={'220px'}>
                <CardImageViewer photos={data.photos}/>
            </Container>
            <Container p={3}>
                <Stack size={'width'} hAlign={'center'}>
                    <Label label={carName} weight={'medium'} level={3}/>
                    <Label label={getPriceRange(data.price)} weight={'regular'} level={4}/>
                    <Stack direction={'row'} spacing={'4'} size={'width'}>
                        <Label label={data.equipment} type={'secondary'} weight={'regular'} level={4}/>
                        <Label label={getHandbookItemName(data.car_body_type)} type={'secondary'} weight={'regular'}
                               level={4}/>
                    </Stack>
                </Stack>
            </Container>

        </Stack>
    </Card>
}