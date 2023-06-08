import {FC} from "react";
import {NS} from 'entities/Car'
import {Card, Grid, Label, Separator, Stack, useMultiLanguageHandbooks} from "../../../shared";
import {useTranslation} from "react-i18next";
import s from './CarGenerationsList.module.scss'
import {useAppNavigate} from "../../../app/services";
import {getGenerationPeriod} from "../../../entities/Car/lib/helpers";

interface IProps {
    loading?: boolean
}
export const CarGenerationsList: FC<{ generations: NS.IGeneration[] } & IProps> = ({
    generations,
    loading
                                                                              }) => {
    const {t} = useTranslation()
    const {getHandbookItemName} = useMultiLanguageHandbooks()
    const n = useAppNavigate()
    const goToGenerationPage = (id: number) => {
        n(p => p.car.generation._key_(id))
    }

    return <Card paddings={4} width={'100%'}>
        <Stack spacing={4} size={'container'}>
            <Label label={t("car.model.generations")} loading={loading} level={3} weight={'medium'}/>
            { generations.map((gen, i, array) => {
                const isLastIndex = i === array.length - 1

                return <>
                    <div className={s.row_wrapper} key={gen.id}>
                        <Stack spacing={3} hAlign={'center'}  vAlign={'center'}>
                            <Label label={gen.name}
                                   align={'center'}
                                   loading={loading}
                                   weight={'regular'} level={3}/>
                            <Label weight={'regular'}
                                   type={'secondary'}
                                   loading={loading}
                                   loadingWidth={90}
                                   label={getGenerationPeriod({ start: gen.start_date, end: gen.end_date })} level={3}/>
                        </Stack>
                        <Grid gap={4} container cols={4}>
                            {gen.variants.map(variant => <div className={s.gen_card} data-loading={loading} key={variant.id}   onClick={() => goToGenerationPage(variant.id)}>
                                {
                                    !loading &&  <div className={s.car_body_type}>
                                        { getHandbookItemName(variant.car_body_type) }
                                    </div>
                                }

                                {
                                    !loading && variant.photo && <img src={variant.photo}/>
                                }
                            </div>) }
                        </Grid>
                    </div>
                    { !isLastIndex && <Separator thickness={'thin'}/> }
                </>
            } ) }
        </Stack>
    </Card>
}
