import * as NS from '../namespace'
import {useEffect} from "react";

import {getHandbook} from "../api/thunks";
import {useAppDispatch, useAppSelector} from "../../withStore";
import {selectHandbooks} from "../model";
export const useHandbook = (handbooks: NS.Handbook[]) => {
    const d = useAppDispatch()
    const stateHandbooks = useAppSelector(selectHandbooks)
    useEffect(() => {
        NS.handbooks
            .filter(handbook => handbooks.includes(handbook.name))
            .filter(handbook => stateHandbooks[handbook.name as keyof typeof stateHandbooks].length === 0)
            .forEach(handbook => d(getHandbook(handbook)))
    }, [handbooks, d])
}