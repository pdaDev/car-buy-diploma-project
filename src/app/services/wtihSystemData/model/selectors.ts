import {StateType} from "../../withStore/model/store.js.js";

export const selectData = (state: StateType) => state.systemData;

export const selectThemes = (state: StateType) => selectData(state).theme.themes
export const selectCurrentTheme = (state: StateType) => selectData(state).theme.current
export const selectFatalError = (state: StateType) => selectData(state).fatalError
export const selectLanguage = (state: StateType) => selectData(state).language

