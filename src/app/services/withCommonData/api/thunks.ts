import {createAsyncThunk} from "@reduxjs/toolkit";
import {HandbookOption, SetHandbookPayload} from "../namespace";
import {api} from "shared";


export const getHandbook = createAsyncThunk(
    'getHandbook',
    async (option: HandbookOption, thunkAPI) => {
        try {
            const response = await api.get(`/handbook/?key=${option.key}`).then(data => data)

            if (response.status < 400) {
                return {key: option.name, handbook: response.data.data} as SetHandbookPayload
            } else throw new Error('babui')
        } catch (e) {
            throw new Error('message')
            return thunkAPI.rejectWithValue(e)
        }
    }
)

export const getBrends = createAsyncThunk(
    'getBrends',
    async (_, thhunkAPI) => {
        const response = await api.get('car/brends/')
        return response.data.results
    }
)

export const getModels = createAsyncThunk(
    'getModels',
    async (_, thunkAPI) => {
        const response = await api.get('car/models/')
        return response.data.results
    }
)

export const getGenerations = createAsyncThunk(
    'getGenerations',
    async (_, thunkAPI) => {
        const response = await api.get('car/generations/')
        return response.data.results
    }
)