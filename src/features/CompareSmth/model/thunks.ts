import {createAsyncThunk} from "@reduxjs/toolkit";
import * as NS from '../namespace'
import {addElementToCompare, removeElementFromCompare} from "./slice";
import * as api from '../api'
import {selectActiveStatus, selectAuthStatus} from "entities/User/model/selectors";
import {StateType} from "app/services";




export const getCompareListIds = createAsyncThunk(
    'getCompareListIds',
    async (_, thunkAPI) => {
        try {
            const authStatus = selectAuthStatus(thunkAPI.getState() as StateType)
            const activeStatus = selectActiveStatus(thunkAPI.getState() as StateType)
            const response = await api.getCompareListIds(authStatus && activeStatus)
            return response.data.results
        } catch (e) {

        }
    }
)

export const getCompareList = createAsyncThunk(
    'getCompareList',
    async ({ type, equipments }: { type: NS.CompareType, equipments?: string }, thunkAPI) => {
        try {
            const authStatus = selectAuthStatus(thunkAPI.getState() as StateType)
            const activeStatus = selectActiveStatus(thunkAPI.getState() as StateType)
            const response = await api.getCompareList(authStatus && activeStatus, type, equipments)
            return response.data

        } catch (e) {}
    }
)

export const addToCompare = createAsyncThunk(
    'addToCompare',
    async (arg: NS.IServerCommonCompareItem, thunkAPI) => {
        thunkAPI.dispatch(addElementToCompare(arg))
        try {
            const authStatus = selectAuthStatus(thunkAPI.getState() as StateType)
            const activeStatus = selectActiveStatus(thunkAPI.getState() as StateType)
            const response = await api.addToCompare(authStatus && activeStatus, arg)
            if (response.status > 300) {
                return thunkAPI.rejectWithValue(arg)
            }
            return response.data.results
        } catch (e) {
            return thunkAPI.rejectWithValue(arg)
        }
    }
)

export const removeFromCompare = createAsyncThunk(
    'removeFromCompare',
    async (arg: NS.IServerCommonCompareItem, thunkAPI) => {
        thunkAPI.dispatch(removeElementFromCompare(arg))
        try {

            const authStatus = selectAuthStatus(thunkAPI.getState() as StateType)
            const activeStatus = selectActiveStatus(thunkAPI.getState() as StateType)
            const response = await api.removeFromCompare(authStatus && activeStatus, arg)

            if (response.status > 300) {
                return thunkAPI.rejectWithValue(arg)
            }
            return response.data.results
        } catch (e) {
            return thunkAPI.rejectWithValue(arg)
        }
    }
)