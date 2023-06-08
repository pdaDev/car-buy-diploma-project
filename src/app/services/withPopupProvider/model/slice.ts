import * as NS from '../namespace';
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    openModals: [],
} as NS.IReduxState;

const popupSlice = createSlice({
    name: 'popup',
    initialState,
    reducers: {
        openModal: (state, {payload}: PayloadAction<NS.Modal>) => {
            state.openModals = [...state.openModals.filter(modal => modal.key !== payload.key), payload]
        },
        closeModal: (state, {payload}: PayloadAction<{ key: NS.ModalsKeys }>) => {
            state.openModals = state.openModals.filter(modals => modals.key !== payload.key)
        }
    }
})

export const popupReducer = popupSlice.reducer;
export const {openModal, closeModal} = popupSlice.actions


