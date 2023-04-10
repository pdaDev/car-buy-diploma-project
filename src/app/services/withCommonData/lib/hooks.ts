import * as NS from '../namespace'
import {useEffect} from "react";

import {getHandbook} from "../api/thunks";
import {useAppDispatch} from "../../withStore";
export const useHandbook = (handbooks: NS.Handbook[]) => {
    const d = useAppDispatch()
    useEffect(() => {
        NS.handbooks
            .filter(handbook => handbooks.includes(handbook.name))
            .forEach(handbook => d(getHandbook(handbook)))
    }, [handbooks, d])
}