import {StateType} from "../../withStore";
import * as NS from '../namespace'

const selectData = (state: StateType) => state.commonData
export const selectHandbooks = (state: StateType) => selectData(state).handbooks;
export const selectHandbook = (key: NS.Handbook) => (state: StateType) => selectData(state).handbooks[key]
export const selectBrends = (state: StateType) => selectData(state).brends
export const selectModels = (state: StateType) => selectData(state).models
export const selectGenerations = (state: StateType) => selectData(state).generations
export const selectRegions = (state: StateType) => selectData(state).regions
export const selectInitializedStatus = (state: StateType) => selectData(state).initialized
export const selectSearchGeoLocation = (state: StateType) => selectData(state).searchGeo

