import React, {ComponentType, FC, useEffect} from "react";
import {connect, ConnectedProps, MapStateToProps, MapStateToPropsParam} from "react-redux";
import {selectBrends, selectGenerations, selectHandbooks, selectModels} from '../model'
import {StateType, useAppDispatch, useAppSelector} from "../../withStore";
import {getBrends, getGenerations, getHandbook, getModels} from '../api/thunks'
import {HandbookOption, handbooks as handbooksOptions, IReduxState} from "../namespace";
import {useNotify} from "../../../../entities/Notification";

export const withCommonData = (Component: ComponentType<any>) => {
    const Container: FC = props => {
        const d = useAppDispatch();
        const brends = useAppSelector(selectBrends)
        const models = useAppSelector(selectModels)
        const generations = useAppSelector(selectGenerations)

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
        }, [d, models, generations, brends])

        return <Component {...props} />
    }

    return Container
}