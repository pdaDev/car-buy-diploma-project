import {FC} from "react";
import {useParams} from "react-router-dom";
import {useGetCarModelQuery} from "../../../entities/Car";
import {
    Card,
    CardImageViewer,
    Container,
    getTranslationIndexCreator,
    ImageSlider,
    Label,
    Stack,
    Symbol
} from "../../../shared";
import {CarGenerationsList} from "../../../features/CarGenerationsList";
import {useTranslation} from "react-i18next";
import {CarPathNavigation} from "../../../features/CarPathNavigation/ui/CarPathNavigation";
import {ReviewSlider} from "../../../features/ReviewSlider";
import {AdvertisementSlider} from "../../../features/AdvertisementSlider";
import {getGenerationPeriod, getPriceRange} from "../../../entities/Car/lib/helpers";

export const CarModel: FC = () => {
    const { id } = useParams()
    const { data, isLoading } = useGetCarModelQuery(Number(id))
    const { t } = useTranslation()
    const carName = data ? `${data.car.brend.name} ${data.car.model.name}` : null
    const getIndex = getTranslationIndexCreator("car.model")
    return <Container max_w={'800px'}>
        <Stack spacing={4} size={'container'} hAlign={'start'} vAlign={'start'}>
            { data && <CarPathNavigation brend={data.car.brend} model={data.car.model}/> }
            <Card width={'100%'} paddings={[4, 5]}>
                <Stack direction={'column'} size={'container'} spacing={4}>
                    <Stack direction={'row'} size={'width'}>
                        <Label label={carName} level={2} weight={'medium'}/>
                        <Stack spacing={3} direction={'row'} vAlign={'center'}>
                            <Label label={t(getIndex("generations_count"))} type={'secondary'}/>
                            <Symbol content={data?.generations?.length || 0} weight={'medium'} size={4}/>
                        </Stack>
                    </Stack>
                   <Stack spacing={3}>
                       <Stack direction={"row"} spacing={3} hAlign={'start'}>
                           <Label label={t(getIndex('dates'))} type={'secondary'} level={3} />
                           { data && <Label level={3} label={getGenerationPeriod({ start: data.generations[data.generations.length - 1].start_date, end: data.generations[0].end_date  })} /> }
                       </Stack>
                       <Stack direction={"row"} spacing={3} hAlign={'start'}>
                           <Label level={3}  label={t(getIndex('advertisements_count'))} type={'secondary'} />
                           { data && <Label level={3}  label={data.advertisements.count} /> }
                       </Stack>
                       <Stack direction={"row"} spacing={3} hAlign={'start'}>
                           <Label level={3}  label={t(getIndex('prices'))} type={'secondary'} />
                           { data && <Label level={3}  label={getPriceRange(data.price)} /> }
                       </Stack>
                   </Stack>
                </Stack>
            </Card>
            <Container min_h={'500px'}>
                <ImageSlider images={data?.photos || []}/>
            </Container>
            { data && data.generations.length > 0 &&
                <CarGenerationsList generations={data.generations}/> }
            { data && <Stack spacing={3} size={'width'}>
                <Label label={t(getIndex('advertisements'))} level={3} weight={'medium'}/>
                <Container contentAlign={'center'}><AdvertisementSlider data={data.advertisements.results}
                                                                        totalCountOfAdvertisements={data.advertisements.count}
                                                                        car={data.car}
                                                                        loading={isLoading}
                /></Container>
            </Stack>}
            { data &&  <Stack size={'width'} spacing={3}>
                <Label label={t(getIndex('reviews'))} level={3} weight={'medium'}/>
                <Container contentAlign={'center'}><ReviewSlider data={data.reviews.results}
                                                                 loading={isLoading}
                                                                 totalCountOfReviews={data.reviews.count}
                                                                 car={data.car}
                /></Container>
            </Stack>}
        </Stack>
    </Container>
}