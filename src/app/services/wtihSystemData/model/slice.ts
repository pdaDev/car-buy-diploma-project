import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import * as NS from '../namespace'



const initialState = {
   theme: {
       current: 'light',
       themes: ['light', 'dark', 'auto']
   },
    language: null,
    fatalError: null,
    errors: []
} as NS.IReduxState;

export const systemDataSlice = createSlice({
    name: 'theme',
    initialState: initialState as NS.IReduxState,
    reducers: {
        setTheme(state, { payload }: PayloadAction<NS.Theme>) {
            state.theme.current = payload;
        },
        setFatalError(state, {payload}) {
            state.fatalError = payload
        },
        setLanguage(state, {payload}: PayloadAction<NS.Language>) {
            state.language = payload
        },
        parseError(state, {payload}: PayloadAction<any>) {
            state.errors = [...state.errors, payload]
        }
    }
})

export const systemDataReducer = systemDataSlice.reducer
export const { setFatalError, setTheme, parseError, setLanguage } = systemDataSlice.actions