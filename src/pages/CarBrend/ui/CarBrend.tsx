import {FC} from "react";
import {useParams} from "react-router-dom";
import {CarModelMiniCard, useGetCarBrendQuery, NS} from "../../../entities/Car";
import {Box, Card, Container, Grid, Image, Label, Stack, Text, useMultiLanguageHandbooks} from "../../../shared";
import {useAppNavigate} from "../../../app/services";
import {useTranslation} from "react-i18next";
import {BrendModelsGrid} from "../../../widgets/BrendModelsGrid";
import {IModelMiniCard} from "../../../entities/Car/namespace";
import s from './CarBrend.module.scss'
import {SAMPLE_BREND_MODELS} from "../lib/constants";

export const CarBrend: FC = () => {
    const {id} = useParams()
    const {data, isLoading} = useGetCarBrendQuery(Number(id))
    const photo = 'https://i.trse.ru/2018/11/30b8b9a9554e6e763c7cfcbadfa7a9e6.jpg'
    const {t} = useTranslation()
    const {getHandbookItemDescription} = useMultiLanguageHandbooks()

    return <Container max_w={'800px'}>
        <Stack spacing={4} size={'width'} vAlign={'start'}>
            <Card paddings={[4, 5]} width={'100%'} height={'auto'}>
                <Stack direction={'row'} size={'width'} vAlign={'center'}>
                    <Stack spacing={3}>
                        <Label label={data?.name}
                               level={2}
                               loading={isLoading}
                               loadingWidth={220}
                               weight={'medium'}/>
                        <Stack spacing={3} direction={'row'} size={'width'} hAlign={'start'}>
                            <Label label={t('admin.data_management.producers.date_of_found')}
                                   level={5}
                                   loading={isLoading}
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
                    <div className={s.logo_wrapper} data-loading={isLoading}>
                        {!isLoading && <Image src={data?.logo || null}
                                              width={'100px'}
                                              height={'100px'}
                                              alt={'brend_logo'}/>}
                    </div>
                </Stack>
            </Card>
            <Label label={t('admin.data_management.cars.brend.label')}
                   level={3}
                   loading={isLoading}
                   weight={'medium'}/>
            <Card paddings={3} height={'auto'}>
                {
                    <BrendModelsGrid data={data?.models || SAMPLE_BREND_MODELS}
                                     loading={isLoading}
                    />
                }
            </Card>

        </Stack>
    </Container>
}