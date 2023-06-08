import {FC} from "react";
import {useParams} from "react-router-dom";
import {CarModelMiniCard, useGetCarBrendQuery, NS} from "../../../entities/Car";
import {Card, Container, Grid, Image, Label, Stack, Text, useMultiLanguageHandbooks} from "../../../shared";
import {useAppNavigate} from "../../../app/services";
import {useTranslation} from "react-i18next";
import {BrendModelsGrid} from "../../../widgets/BrendModelsGrid";
import {IModelMiniCard} from "../../../entities/Car/namespace";

export const CarBrend: FC = () => {
    const {id} = useParams()
    const {data, isLoading} = useGetCarBrendQuery(Number(id))
    const photo = 'https://i.trse.ru/2018/11/30b8b9a9554e6e763c7cfcbadfa7a9e6.jpg'
    const {t} = useTranslation()
    const {getHandbookItemDescription} = useMultiLanguageHandbooks()

    return <Container max_w={'800px'}>
        <Stack spacing={4} size={'container'} vAlign={'start'}>
            <Card paddings={[4, 5]} width={'100%'}>
                <Stack direction={'row'} vAlign={'center'}>
                    <Stack spacing={3}>
                        <Label label={data?.name}
                               level={2}
                               weight={'medium'}/>
                        <Stack spacing={3} direction={'row'} hAlign={'start'}>
                            <Label label={t('admin.data_management.producers.date_of_found')}
                                   level={5}
                                   type={'secondary'}/>
                            <Label label={data ? new Date(data.producer.date_of_found).toLocaleDateString() : null}
                                   level={4}
                                   weight={'medium'}/>
                        </Stack>

                        <Text content={getHandbookItemDescription(data?.producer as any)}
                              weight={'regular'}
                              size={3}
                        />

                    </Stack>
                    <Image src={data?.logo || null}
                           width={'100px'}
                           height={'100px'}
                           alt={'brend_logo'}/>
                </Stack>
            </Card>
            <Label label={t('admin.data_management.cars.brend.label')}
                   level={3}
                    weight={'medium'}/>
            <Card paddings={3}>
                <BrendModelsGrid data={data?.models}
                                 loading={isLoading}
                />
            </Card>

        </Stack>
    </Container>
}