import {createAsyncThunk} from "@reduxjs/toolkit";
import {privateApi} from "shared";
import {addFavouriteAd, removeFavouriteAd} from "./slice";


export const getFavouritesIdsList = createAsyncThunk(
    'favouritesIdsList',
    async (_, thunkAPI) => {
        try {
            const response = await privateApi.get('advertisements/favourites/ids/').then(data => data)
            return response.data.results
        } catch (e) {

        }
    }
)

export const addFavourite = createAsyncThunk(
    'addFavourite',
    async (id: number, thunkAPI) => {
        thunkAPI.dispatch(addFavouriteAd(id))
        try {
            const response = await privateApi.post('advertisements/favourites/', { id })
            if (response.status > 300) {
                return thunkAPI.rejectWithValue(id)
            }
            return response.data.results
        } catch (e) {

        }
    }
)

export const removeFavourite = createAsyncThunk(
    'removeFavourite',
    async (id: number, thunkAPI) => {
        thunkAPI.dispatch(removeFavouriteAd(id))
        try {
            const response = await privateApi.delete(`advertisements/favourites/${id}/`)
            if (response.status > 300) {
                return thunkAPI.rejectWithValue(id as number)
            }
            return response.data.results
        } catch (e) {

        }
    }
)