import {FC} from "react";
import {
    Card,
    formatNumber,
    formatPrice,
    getCarNameFromModelWithId,
    ICarNameWithId,
    Label, useMultiLanguageHandbooks
} from "shared";
import * as NS from '../../namespace'
import s from './AdvertisementFullscreenImageBanner.module.scss'
import {useTranslation} from "react-i18next";
import {getEngineCharacteristicsLabel} from "../../lib/helpers";
import {DataLine} from "./DataLine";
interface IProps {
    car: ICarNameWithId
    price: number
    mileage: number
    engine: NS.IServerEngineCharacteristics
    dateOfProduction: number
}

export const AdvertisementFullscreenImageBanner: FC<IProps> = ({car, price, mileage, engine, dateOfProduction}) => {
    const { t } = useTranslation()
    const { getHandbookItemName } = useMultiLanguageHandbooks()
    const engineLabel =  getEngineCharacteristicsLabel(engine, t, getHandbookItemName)
    return <Card paddings={4} border={2} contentDirection={'column'} width={'100%'} contentGap={4}>
        <Label label={getCarNameFromModelWithId(car)}
               align={'center'}
               size={5}
               weight={'medium'}/>
        <div className={s.price_wrapper}>
           <Label label={ formatPrice(price)} weight={'medium'} align={'center'}/>
        </div>
        <DataLine keyIndex="car.mileage" value={`${formatNumber(mileage)} ${t("metrics.kilometer")}`}/>
        <DataLine keyIndex="car.date_of_production" value={dateOfProduction}/>
        <DataLine keyIndex="car.engine.label" value={engineLabel}/>
    </Card>
}