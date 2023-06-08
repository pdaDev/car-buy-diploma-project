import {StateType} from "../../../app/services";

const selectData  = (state: StateType) => state.chat

export const selectUsers = (state: StateType) => selectData(state).users

export const selectUsersId = (state: StateType) => selectData(state).usersId
export const selectCars = (state: StateType) => selectData(state).cars
export const selectCarsId = (state: StateType) => selectData(state).carsId
export const selectChatDataLoadingStatus = (state: StateType) => selectData(state).loading
export const selectChats = (state: StateType) => selectData(state).chats
export const selectCurrentChat = (state: StateType) => selectData(state).currentChat
export const selectModalCurrentChat = (state: StateType) => selectData(state).modalCurrentChat