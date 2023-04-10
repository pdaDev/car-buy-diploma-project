import * as NS from '../namespace'
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addFavourite, getFavouritesIdsList, removeFavourite} from "./thunks";


const initialState: NS.IReduxState = {
    favouritesIdsList: []
}

const favouritesSlice = createSlice({
    name: 'favourites',
    initialState,
    reducers: {
        cleanFavourites(state) {
          state.favouritesIdsList = []
        },
        addFavouriteAd(state, {payload}: PayloadAction<NS.FavaouriteIdsListItem>) {
            state.favouritesIdsList = [...state.favouritesIdsList, payload]
        },
        removeFavouriteAd(state, {payload}: PayloadAction<NS.FavaouriteIdsListItem>) {
            state.favouritesIdsList = state.favouritesIdsList.filter(id => id !== payload)
        },
    },
    extraReducers: builder => {
        builder.addCase(getFavouritesIdsList.fulfilled, (state, { payload }) => {
            state.favouritesIdsList = payload || []
        })
        builder.addCase(addFavourite.fulfilled, (state, { payload }) => {
            state.favouritesIdsList = payload || []
        })
        builder.addCase(addFavourite.rejected, (state, {payload}) => {
            state.favouritesIdsList = state.favouritesIdsList.filter(id => id !== payload)
        })
        builder.addCase(removeFavourite.rejected, (state, {payload}) => {
            state.favouritesIdsList = [...state.favouritesIdsList, payload as number]
        })
        builder.addCase(removeFavourite.fulfilled, (state, { payload }) => {
            state.favouritesIdsList = payload || []
        })
    }
})

export const favouritesReducer = favouritesSlice.reducer
export const { addFavouriteAd, cleanFavourites, removeFavouriteAd } = favouritesSlice.actions