import {StateType} from "app/services";

const selectData = (state: StateType) => state.compares
export const selectCompareModels = (state:StateType) => selectData(state).modelsToCompareList
export const selectCompareAds = (state: StateType) => selectData(state).addsToCompareList
export const selectCompareModelsCount = (state: StateType) => selectCompareModels(state).length
export const selectCompareAdsCount= (state: StateType) => selectCompareAds(state).length
export const selectCompareItemsCount = (state: StateType) => selectCompareAdsCount(state) + selectCompareModelsCount(state)
export const selectCompareData = (state: StateType) => ({
    data: selectData(state).data,
    loading: selectData(state).loading
})