import React, {ComponentType, FC, useEffect} from "react";
import {connect, ConnectedProps, MapStateToProps, MapStateToPropsParam} from "react-redux";
import {selectBrends, selectGenerations, selectHandbooks, selectModels} from '../model'
import {StateType, useAppDispatch, useAppSelector} from "../../withStore";
import {getBrends, getGenerations, getHandbook, getModels} from '../api/thunks'
import {HandbookOption, handbooks as handbooksOptions, IReduxState} from "../namespace";
import {useNotify} from "../../../../entities/Notification";
import fetchJsonp from "fetch-jsonp";
import {IServerGeoLocationItem} from "../../../../features/SelectGeoLocation/namespace";
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