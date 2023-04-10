import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import * as NS from '../namespace'
import {getBrends, getGenerations, getHandbook, getModels} from "../api/thunks";
import {getInitHandbooks} from "../lib/helpers";;

const initialState = {
    handbooks: getInitHandbooks(NS.handbooks as any),
    brends: [],
    generations: [],
    models: []
} as NS.IReduxState;


const handbooksSlice = createSlice({
    name: 'handbooks',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getHandbook.fulfilled,
            (state, {payload}: PayloadAction<NS.SetHandbookPayload>) => {
                state.handbooks[payload.key] = payload.handbook as any
            })
        builder.addCase(getBrends.fulfilled, (state, {payload}) => {
            state.brends = payload
        })
        builder.addCase(getGenerations.fulfilled, (state, {payload}) => {
            state.generations = payload
        })
        builder.addCase(getModels.fulfilled, (state, {payload}) => {
            state.models = payload
        })
    }
})

export const reducer = handbooksSlice.reducer;

