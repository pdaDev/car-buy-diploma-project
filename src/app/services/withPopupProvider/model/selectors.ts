
import {StateType} from "../../withStore";

export const selectData = (state: StateType) => state.popup;
export const selectOpenedModals = (state: StateType) => selectData(state).openModals;