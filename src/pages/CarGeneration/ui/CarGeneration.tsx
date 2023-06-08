import {FC, useMemo} from "react";
import {CarTitle} from "../../../entities/Car/ui/CarTitle/CarTitle";
import {
    Button,
    Card,
    CardImageViewer, CircleDiagram,
    Container, createRuWordEndingByNumberGetter,
    formatPrice, getCarQuery, getObjectKeys, getTranslationIndex,
    getTranslationIndexCreator,
    ImageSlider,
    Label, PathNavigation,
    Stack, Switcher, useMultiLanguageHandbooks, useQuerySearchCar
} from "../../../shared";
import {useGetCarGenerationQuery} from "../../../entities/Car";
import {useParams} from "react-router-dom";
import {ReviewSlider} from "../../../features/ReviewSlider";
import {useTranslation} from "react-i18next";
import {CarPathNavigation} from "../../../features/CarPathNavigation";
import {useAppNavigate} from "../../../app/services";
import {getPriceRange} from "../../../entities/Car/lib/helpers";
import {GenerationCharacteristics} from "../namespace";
import {AdvertisementSlider} from "../../../features/AdvertisementSlider";
import {CarGenerationSwitcher} from "../../../features/CarGenerationSwitcher";
import Icon from "@mdi/react";
import {mdiCompare} from "@mdi/js/commonjs/mdi";
import {useContentCompare} from "../../../features/CompareSmth";


export const CarGeneration: FC = () => {
    const {id} = useParams()
    const {data, isLoading} = useGetCarGenerationQuery(Number(id))
    const {t} = useTranslation()
    const getCarGenerationIndex = getTranslationIndexCreator('car.generation')
    const n = useAppNavigate()
    const createReviewOnModel = () => {
        data && n(p => p.reviews.create, {generation_id: data.car.generation.id, 'choose-car': 0})
    }

    const {onCarChange, setCarQuery} = useQuerySearchCar()
    const goToSearch = () => {
        if (data) {
            n(p => p.search, `car=${setCarQuery({
                generation_id: [data.car.generation.id],
                model_id: [data.car.model.id],
                brend_id: data.car.brend.id
            })}`)

        }

    }

    const {getHandbookItemName} = useMultiLanguageHandbooks()

    const carCharacteristics = useMemo(() => {
        if (data) {
            const equipments = data.characteristics.equipments

            const enginesVolumes = equipments.map(e => e.engine.volume)
            const enginesHorsePowers = equipments.map(e => e.engine.hp)
            const engineTypeCodes = Array.from(new Set(equipments.map(e => e.engine.type.code)))
            const driveTypesCode = Array.from(new Set(equipments.map(e => e.drive_type_code.code)))
            const transmissionTypesCode = Array.from(new Set(equipments.map(e => e.transmission.type.code)))
            const enginesTypes = engineTypeCodes.map(code => equipments.find(e => e.engine.type.code === code)!.engine.type).map(e => getHandbookItemName(e)).join(', ')
            const driveTypes = driveTypesCode.map(code => equipments.find(e => e.drive_type_code.code === code)!.drive_type_code).map(e => getHandbookItemName(e)).join(', ')
            const transmissionTypes = transmissionTypesCode.map(code => equipments.find(e => e.transmission.type.code === code)!.transmission.type).map(e => getHandbookItemName(e)).join(', ')
            const engineHorsePowersLabel = `${Math.min(...enginesHorsePowers)}...${Math.max(...enginesHorsePowers)} л.с.`
            const engineVolumeLabel = `${Math.min(...enginesVolumes)}...${Math.max(...enginesVolumes)} л.с.`


            const payload: GenerationCharacteristics = {
                engine: `${enginesTypes}, ${engineVolumeLabel}, ${engineHorsePowersLabel}`,
                driveTypes,
                transmissionTypes,
                carBodyType: `${getHandbookItemName(data.characteristics.car_body_type)}, ${data.characteristics.car_body_type.count_of_doors}дв.`
            }
            return payload
        }
        return {}
    }, [data])

    const getIndex = getTranslationIndexCreator('car.generation')
    const getAdvertisementsCountLabel = createRuWordEndingByNumberGetter({
        root: 'объявлен', single: {ip: 'ие', rp: 'ия'}, multiple: {value: 'ий'}
    })
    const getReviewsCountLabel = createRuWordEndingByNumberGetter({
        root: 'отзыв', single: {ip: '', rp: 'а'}, multiple: {value: 'ов'}
    })

    const searchAdsButtonLabel = [
        t(getIndex('search')),
        data?.advertisements.count,
        getAdvertisementsCountLabel(data?.advertisements.count || 0)].join(' ')
    const searchReviewsButtonLabel = [
        data?.reviews.count,
        getReviewsCountLabel(data?.reviews.count || 0)].join(' ')

    const goToReviews = () => data && n(p => p.reviews, getCarQuery(data.car))
    const compare = useContentCompare('model', +id!)
    const compareButtonTitle = compare.isCompared ? t("compare.remove") : t("compare.title")

    return <Container max_w={'800px'}>
        <Stack direction={'column'} spacing={4} size={'container'}>
            <Stack direction={'row'}>
                {data && <CarPathNavigation brend={data.car.brend}
                                            model={data.car.model}
                                            generation={data.car.generation}
                />}
                {data && <CarGenerationSwitcher
                    current={'card'}
                    generation={data.generation_variant_id}/>}
            </Stack>

            <CarTitle data={data?.car || null} loading={isLoading}/>
            <Card paddings={0} contentDirection={'column'}>
                <Container min_h={"500px"}>
                    <ImageSlider images={data?.photos || []}
                                 extra={{
                                     button: <Stack direction={'row'} spacing={4}>
                                         <Button type={"primary"}
                                                 onClick={goToSearch}
                                                 label={searchAdsButtonLabel}/>
                                         <Button type={'secondary'}
                                                 onClick={compare.switchCompare}
                                         >
                                             <Stack direction={'row'} size={'width'} spacing={4}>
                                                 <Label label={compareButtonTitle} level={4}/>
                                                 <Icon path={mdiCompare} size={1}/>
                                             </Stack>

                                         </Button>
                                     </Stack>
                                 }}
                    />
                </Container>
                <Container p={4}>
                    <Stack direction={'column'}
                           size={'container'}
                           spacing={3}
                           hAlign={'start'}>
                        {data && <Stack size={'width'} direction={'row'} vAlign={'center'}>
                            <Stack direction={'row'} spacing={1} hAlign={'start'} vAlign={'center'}>
                                <Container max_w={'40px'} mr={'20px'}>
                                    <Container position={'center'} contentAlign={'center'} pl={'10px'}>
                                        <Label label={data.reviews.rate} level={4}/>
                                    </Container>
                                    <CircleDiagram parts={5}
                                                   strokeWidth={4}
                                                   zeroStart={'top'}
                                                   part={data.reviews.rate}
                                    />
                                </Container>
                                <Label label={t(getIndex('according_reviews'))}
                                       level={4}
                                       weight={'regular'}/>
                                <Button type={'underline'}
                                        label={searchReviewsButtonLabel}
                                        onClick={goToReviews}
                                />
                            </Stack>

                            <Button type={'primary'}
                                    label={t(getIndex("make_review")) as string}
                                    onClick={createReviewOnModel}/>
                        </Stack>}
                        {getObjectKeys(carCharacteristics).map(key => {
                            return <Stack direction={'row'}
                                          spacing={4}
                                          hAlign={'start'}>
                                <Label label={t(getIndex(key))}
                                       weight={'regular'}
                                       level={4}
                                       type={'secondary'}/>
                                <Label label={carCharacteristics[key]}
                                       level={4}
                                       weight={'regular'}
                                />
                            </Stack>
                        })}

                        {data && data.price &&
                            <Stack direction={'row'} hAlign={'start'} spacing={5}>
                                <Label label={t(getIndex('price'))}
                                       weight={'regular'}
                                       level={2}
                                       type={'secondary'}/>
                                <Label label={getPriceRange(data.price)}
                                       level={3}
                                       weight={'medium'}/>
                            </Stack>
                        }
                    </Stack>
                </Container>
            </Card>


            <Label level={3}
                   weight={'medium'}
                   label={t(getCarGenerationIndex('reviews'))}/>
            {data && <ReviewSlider data={data.reviews.results}
                                   totalCountOfReviews={data.reviews.count}
                                   car={data.car}
                                   loading={isLoading}
            />}

            {data && data.advertisements.count > 0 && <>
                <Label level={3}
                       weight={'medium'}
                       label={t(getCarGenerationIndex('advertisements'))}/>
                <AdvertisementSlider data={data.advertisements.results}
                                          car={data.car}
                                          totalCountOfAdvertisements={data.advertisements.count}
                                          loading={isLoading}
            /></>}

        </Stack>
    </Container>
}
