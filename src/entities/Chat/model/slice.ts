import * as NS from '../namespace'
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getChatCars, getChatUsers} from "./thunks";

const initialState: NS.IReduxState = {
    users: [],
    cars: [],
    loading: false,
    usersId: [],
    carsId: [],
    chats: [],
    modalCurrentChat: null,
    currentChat: null
}

export const chatSlice = createSlice({
    name: 'chatSlice',
    initialState,
    reducers: {
        addUserId(state, {payload}: PayloadAction<number>) {
            state.usersId = state.usersId.includes(payload)
                ? state.usersId
                : [...state.usersId, payload]
        },
        removeUserId(state, {payload}: PayloadAction<number>) {
            state.usersId = state.usersId.filter(id => id !== payload)
        },
        addCarId(state, {payload}: PayloadAction<number>) {
            state.carsId = state.carsId.includes(payload)
                ? state.carsId
                : [...state.carsId, payload]
        },
        removeCarId(state, {payload}: PayloadAction<number>) {
            state.carsId = state.carsId.filter(id => id !== payload)
        },
        setUsers(state, {payload}: PayloadAction<number[]>) {
            // @ts-ignore
            // state.usersId = Array.from(new Set(...state.usersId, ...payload))
            state.usersId = payload
        },
        setCars(state, {payload}: PayloadAction<number[]>) {
            // @ts-ignore
            // state.carsId = Array.from(new Set(...state.carsId, ...payload))
            state.carsId = payload
        },
        addUser(state, {payload}: PayloadAction<NS.ChatDataUsers>) {
            state.users = state.users.some(user => user.id === payload.id)
                ? state.users
                : [...state.users, payload]
        },
        addCar(state, {payload}: PayloadAction<NS.ChatDataCars>) {
            state.cars = state.cars.some(car => car.generation.id === payload.generation.id)
                ? state.cars
                : [...state.cars, payload]
        },
        setChats(state, {payload}) {
            state.chats = payload
        },
        setCurrentChat(state, {payload}) {
            state.currentChat = payload
        },
        setModalCurrentChat(state, { payload }) {
            state.modalCurrentChat = payload
        }
    },
    extraReducers: builder => {
        builder.addCase(getChatCars.pending, state => {
            state.loading = true
        })
        builder.addCase(getChatCars.rejected, state => {
            state.loading = false
        })
        builder.addCase(getChatCars.fulfilled, (state, {payload}: PayloadAction<NS.ChatDataCars[]>) => {
            state.cars = payload
            state.loading = false
        })
        builder.addCase(getChatUsers.pending, state => {
            state.loading = true
        })
        builder.addCase(getChatUsers.rejected, state => {
            state.loading = false
        })
        builder.addCase(getChatUsers.fulfilled, (state, {payload}: PayloadAction<NS.ChatDataUsers[]>) => {
            state.loading = false
            state.users = payload
        })
    }
})

export const chatReducer = chatSlice.reducer
export const {addUserId, addCarId, addUser, addCar, setCars, setChats, setCurrentChat, setModalCurrentChat, setUsers, removeUserId, removeCarId} = chatSlice.actions