import {StateType} from "../../../app/services";


const selectDate = (state: StateType) => state.savedTestResults
export const selectSavedResultsId = (state: StateType) => state.savedTestResults.savedResultsId