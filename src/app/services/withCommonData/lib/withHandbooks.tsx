import React, {ComponentType, FC, useEffect} from "react";
import {selectBrends, selectGenerations, selectModels} from '../model'
import {useAppDispatch, useAppSelector} from "../../withStore";
import {getBrends, getGenerations, getHandbook, getModels} from '../api/thunks'
import {HandbookOption, handbooks as handbooksOptions} from "../namespace";
import fetchJsonp from "fetch-jsonp";
import {IServerGeoLocationItem} from "features/SelectGeoLocation/namespace";
import {setRegions} from "../model/slice";

export const withCommonData = (Component: ComponentType<any>) => {
    const Container: FC = props => {
        const d = useAppDispatch();
        const brends = useAppSelector(selectBrends)
        const models = useAppSelector(selectModels)
        const generations = useAppSelector(selectGenerations)

        useEffect(() => {
            fetchJsonp('https://kladr-api.ru/api.php?contentType=region&cityId=1',
                {jsonpCallbackFunction: 'JSON_CALLBACK'}).then(res => {
                res.json().then(r => d(setRegions(r.result.filter((reg: IServerGeoLocationItem) =>
                    reg.id !== 'Free' && reg.contentType === 'region'))))
            })
        }, [])

        useEffect(() => {
            handbooksOptions
                .filter((option: HandbookOption) => option.initLoad)
                .forEach(option => d(getHandbook(option)))
        }, [handbooksOptions, d])

        useEffect(() => {
            if (models.length === 0)
                d(getModels())
            if (brends.length === 0)
                d(getBrends())
            if (generations.length === 0)
                d(getGenerations())
        }, [models, generations, brends])

        return <Component {...props} />
    }

    return Container
}