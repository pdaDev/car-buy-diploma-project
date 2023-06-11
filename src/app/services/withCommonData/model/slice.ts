import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import * as NS from '../namespace'
import {getBrends, getGenerations, getHandbook, getModels} from "../api/thunks";
import {getInitHandbooks} from "../lib/helpers";
import {IServerGeoLocationItem} from "features/SelectGeoLocation/namespace";


const initialState = {
    handbooks: getInitHandbooks(NS.handbooks as any),
    brends: [],
    generations: [],
    regions: [],
    models: [],
    initialized: false,
    searchGeo: []
} as NS.IReduxState;


const handbooksSlice = createSlice({
    name: 'handbooks',
    initialState: initialState,
    reducers: {
        setRegions(state, { payload }: PayloadAction<IServerGeoLocationItem[]>) {
            state.regions = payload
        },
        initialize(state) {
            state.initialized = true
        },
        setSearchGeo(state, { payload }: PayloadAction<IServerGeoLocationItem[]>) {
            state.searchGeo = payload
        }

    },
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

export const { setRegions, initialize, setSearchGeo} = handbooksSlice.actions
export const reducer = handbooksSlice.reducer;

