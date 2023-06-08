import * as NS from '../namespace'
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getCompareListIds, addToCompare, removeFromCompare, getCompareList} from "./thunks";
import {IServerCommonCompareItem, IServerCompareItem} from "../namespace";


const initialState: NS.IReduxState = {
    addsToCompareList: [],
    modelsToCompareList: [],
    data: [],
    loading: false,
}

const getStateKeyByType = (type: NS.CompareType) => type === 'ad' ? 'addsToCompareList' : 'modelsToCompareList'

const filterData = (data: IServerCompareItem[] | undefined | null, type: NS.CompareType) => {
    return data ? data
        .filter(el => el.type === type)
        .map(el => el.compare_item_id) : []
}

const parseCompares = (state: NS.IReduxState, data: NS.IServerCompareItem[]): Pick<NS.IReduxState, 'addsToCompareList' | 'modelsToCompareList'> => {
        return {
            addsToCompareList: filterData(data, 'ad') ,
            modelsToCompareList: filterData(data, "model")
        }
}

const compareSlice = createSlice({
    name: 'compare',
    initialState,
    reducers: {
        cleanCompareData(state){
            state.data = []
        },
        cleanAdsCompareList(state) {
            state.addsToCompareList = []
        },
        cleanModelsCompareList(state) {
            state.modelsToCompareList = []
        },
        cleanCompareList(state) {
            state.modelsToCompareList = []
            state.addsToCompareList = []
        },
        addElementToCompare(state, { payload }: PayloadAction<NS.IServerCommonCompareItem>) {
            const key = getStateKeyByType( payload.type)
            state[key] = [...state[key], payload.id]
        },
        removeElementFromCompare(state, { payload }: PayloadAction<NS.IServerCommonCompareItem>) {
            const key = getStateKeyByType(payload.type)
            state[key] = state[key].filter(id => id !== payload.id)
        },
        addModelToCompare(state, {payload}: PayloadAction<NS.CompareListItem>) {
            state.modelsToCompareList = [...state.modelsToCompareList, payload]
        },
        addAdToCompare(state, {payload}: PayloadAction<NS.CompareListItem>) {
            state.addsToCompareList = [...state.addsToCompareList, payload]
        },
        removeModelFromCompare(state, {payload}: PayloadAction<NS.CompareListItem>) {
            state.modelsToCompareList = state.modelsToCompareList.filter(id => id !== payload)
        },
        removeAdFromCompare(state, {payload}: PayloadAction<NS.CompareListItem>) {
            state.addsToCompareList = state.addsToCompareList.filter(id => id !== payload)
        },
    },
    extraReducers: builder => {
        builder.addCase(getCompareListIds.fulfilled, (state, {payload}) => {
            const parsedData = parseCompares(state, payload)
            state.addsToCompareList = parsedData.addsToCompareList
            state.modelsToCompareList = parsedData.modelsToCompareList
        })
        builder.addCase(addToCompare.fulfilled, (state, {payload}) => {
            const parsedData = parseCompares(state, payload)
            state.addsToCompareList = parsedData.addsToCompareList
            state.modelsToCompareList = parsedData.modelsToCompareList
        })
        builder.addCase(addToCompare.rejected, (state, {payload}) => {
            // @ts-ignore
            const key: keyof NS.IReduxState =  getStateKeyByType(payload.type)
            // @ts-ignore
            state[key] = state[key].filter(id => id !== payload.id)
        })
        builder.addCase(removeFromCompare.rejected, (state, {payload}) => {
            console.log('adfsdf')
            // @ts-ignore
            const key = getStateKeyByType(payload.type)
            // @ts-ignore
            state[key] = [...state[key], payload.id as number]

        })
        builder.addCase(removeFromCompare.fulfilled, (state, {payload}) => {
            const ids = (payload as any[]).map(el => el.compare_item_id)
            const parsedData = parseCompares(state, payload)
            state.addsToCompareList = parsedData.addsToCompareList
            state.modelsToCompareList = parsedData.modelsToCompareList
            state.data = state.data.filter(el => ids.includes(el.compare_item_id))
        })
        builder.addCase(getCompareList.pending, state => {
            state.loading = state.data.length === 0
        })
        builder.addCase(getCompareList.fulfilled, (state, { payload }) => {
            state.data = payload || []
            state.loading = false
        })
        builder.addCase(getCompareList.rejected, state => {
            state.loading = false
            state.data = []
        })
    }
})

export const compareReducer = compareSlice.reducer
export const {removeAdFromCompare, removeModelFromCompare,
    addModelToCompare, addAdToCompare, addElementToCompare, removeElementFromCompare,
    cleanModelsCompareList, cleanAdsCompareList, cleanCompareList, cleanCompareData
} = compareSlice.actions