import {FC, MouseEventHandler} from "react";
import s from './CarBrendCar.module.scss'
import * as NS from '../../namespace'
import {useParams} from "react-router-dom";
import {addPrefix, checkIsRussian, cn, createRuWordEndingByNumberGetter, Label, Stack} from "../../../../shared";
import {useTranslation} from "react-i18next";

export const CarModelMiniCard: FC<NS.IModelMiniCard & { onClick: Function, size: NS.ModelMiniCardSize }> = ({
                                                                                                                onClick,
                                                                                                                advertisement_count,
                                                                                                                name,
                                                                                                                photo,
                                                                                                                size
                                                                                                            }) => {
    const {i18n} = useTranslation()
    const hasPhotos = photo !== null
    const getAds = createRuWordEndingByNumberGetter({
        root: 'объявлени',
        single: {ip: 'е', rp: 'я'}, multiple: { value: 'ий'}
    })
    const adsCountLabel = checkIsRussian(i18n) ? getAds(advertisement_count) : 'advertisements'
    return <div className={cn(s.model_min_card, addPrefix('size', size, s))}
                onClick={onClick as MouseEventHandler}>
        <div className={s.text_wrap}>
            <Label label={name} level={5} size={2} weight={'medium'}/>
            <div className={s.count_of_ads}>
                <Label label={`${advertisement_count} ${adsCountLabel}`} size={1} level={5}/>
            </div>
        </div>
        { photo && <img src={photo}/>}

    </div>
}