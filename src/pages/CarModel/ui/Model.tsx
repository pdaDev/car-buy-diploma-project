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
import {SAMPLE_GENERATIONS} from "../../../features/CarGenerationsList/lib/constants";

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
                        <Label label={carName}
                               loadingWidth={250}
                               loading={isLoading}
                               level={2}
                               weight={'medium'}/>
                        <Stack spacing={3} direction={'row'} vAlign={'center'}>
                            <Label label={t(getIndex("generations_count"))}
                                   loading={isLoading}
                                   loadingWidth={100}
                                   type={'secondary'}/>
                            { data && !isLoading && <Symbol content={data?.generations?.length || 0}
                                              weight={'medium'} size={4}/> }
                        </Stack>
                    </Stack>
                   <Stack spacing={3}>
                       <Stack direction={"row"} spacing={3} hAlign={'start'}>
                           <Label label={t(getIndex('dates'))}
                                  type={'secondary'} level={3}
                                  loadingWidth={180}
                                  loading={isLoading}
                           />
                           { <Label level={3}
                                    loading={isLoading}
                                    label={!data ? '' : getGenerationPeriod({ start: data.generations[data.generations.length - 1].start_date, end: data.generations[0].end_date  })} /> }
                       </Stack>
                       <Stack direction={"row"} spacing={3} hAlign={'start'}>
                           <Label level={3} loading={isLoading}
                                  loadingWidth={140}
                                  label={t(getIndex('advertisements_count'))} type={'secondary'} />
                           {<Label level={3}  loading={isLoading} label={data?.advertisements.count} /> }
                       </Stack>
                       <Stack direction={"row"} spacing={3} hAlign={'start'}>
                           <Label level={3}
                                  loading={isLoading}
                                  label={t(getIndex('prices'))} type={'secondary'} />
                           {<Label level={3}
                                            loading={isLoading}
                                            label={data ? getPriceRange(data.price) : ''} /> }
                       </Stack>
                   </Stack>
                </Stack>
            </Card>
            <Container min_h={'500px'}>
                <ImageSlider images={data?.photos || []}
                             loading={isLoading}
                />
            </Container>
            {
                <CarGenerationsList generations={data?.generations || SAMPLE_GENERATIONS} loading={isLoading}/> }
            { data && data.advertisements.count === 0 && !isLoading ? null : <Stack spacing={3} size={'width'}>
                <Label label={t(getIndex('advertisements'))}
                       loading={isLoading}
                       level={3} weight={'medium'}/>
                <Container contentAlign={'center'}><AdvertisementSlider data={data?.advertisements.results}
                                                                        totalCountOfAdvertisements={data?.advertisements.count}
                                                                        car={data?.car}
                                                                        loading={isLoading}
                /></Container>
            </Stack>}
            {<Stack size={'width'} spacing={3}>
                <Label label={t(getIndex('reviews'))}
                       loading={isLoading}
                       level={3} weight={'medium'}/>
                <Container contentAlign={'center'}><ReviewSlider data={data?.reviews.results}
                                                                 loading={isLoading}
                                                                 totalCountOfReviews={data?.reviews.count}
                                                                 car={data?.car}
                /></Container>
            </Stack>}
        </Stack>
    </Container>
}