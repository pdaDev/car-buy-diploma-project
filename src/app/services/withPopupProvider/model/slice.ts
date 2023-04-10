import * as NS from '../namespace';
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {modals} from "../namespace";

const initialState = {
    openModals: [],
    availableModals: modals,
} as NS.IReduxState;

const popupSlice = createSlice({
    name: 'popup',
    initialState,
    reducers: {
        openModal: (state, { payload }: PayloadAction<{ key: NS.ModalsKeys }>) => {
             state.openModals = [...state.openModals.filter(modal => modal !== payload.key), payload.key]
        },
        closeModal: (state, { payload }: PayloadAction<{ key: NS.ModalsKeys }>) => {
            state.openModals = state.openModals.filter(modals => modals !== payload.key)
        }
    }
})

export const popupReducer = popupSlice.reducer;
export const { openModal, closeModal } = popupSlice.actions


