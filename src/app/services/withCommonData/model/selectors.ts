import {StateType} from "../../withStore";

const selectData = (state: StateType) => state.commonData
export const selectHandbooks = (state: StateType) => selectData(state).handbooks;
export const selectBrends = (state: StateType) => selectData(state).brends
export const selectModels = (state: StateType) => selectData(state).models
export const selectGenerations = (state: StateType) => selectData(state).generations

