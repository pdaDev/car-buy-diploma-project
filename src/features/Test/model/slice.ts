import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import * as NS from '../namespace'
const initialState: NS.ISavedResultsReduxState = {
    savedResultsId: []
}

const savedTestResultsSlice = createSlice({
    name: 'savedTestResults',
    initialState,
    reducers: {
        reduxSaveResult(state, { payload }: PayloadAction<number>) {
            state.savedResultsId = [...state.savedResultsId, payload]
        },
        reduxDeleteResult(state, { payload }: PayloadAction<number>) {
            state.savedResultsId = state.savedResultsId.filter(id => id !== payload)
        },
        reduxSetResults(state, { payload }: PayloadAction<number[]>) {
            state.savedResultsId = payload
        }
    }
})

export const { reduxSaveResult, reduxDeleteResult, reduxSetResults } = savedTestResultsSlice.actions
export const  savedTestResultReducer = savedTestResultsSlice.reducer