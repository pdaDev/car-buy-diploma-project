import {createAsyncThunk} from "@reduxjs/toolkit";
import * as NS from '../namespace'
import {privateApi} from "../../../shared";


export const getChatCars = createAsyncThunk(
    'getChatCars',
    async (body: Pick<NS.IGetChatsData, 'cars'>, thunkAPI) => {
        try {
            const response = await privateApi.post<NS.ChatDataCars[]>('chat/cars/', body)
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)
export const getChatUsers = createAsyncThunk(
    'getChatUsers',
    async (body: Pick<NS.IGetChatsData, 'users'>, thunkAPI) => {
        try {
            const response = await privateApi.post<NS.ChatDataUsers[]>('chat/users/', body)
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)