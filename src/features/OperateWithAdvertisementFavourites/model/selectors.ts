import {StateType} from "app/services";

const selectData = (state: StateType) => state.favourites
export const selectIdsList = (state: StateType) => selectData(state).favouritesIdsList
export const selectIdsListLen = (state: StateType) => selectIdsList(state).length