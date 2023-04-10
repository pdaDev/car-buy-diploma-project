import {StateType} from "app/services";

export const selectData = (state: StateType) => state.user
export const selectCurrentUser = (state: StateType) => selectData(state).user
export const selectAnotherUser = (state: StateType) => selectData(state).anotherUser
export const selectAnotherUserData = (state: StateType) => selectAnotherUser(state).data
export const selectAuthStatus = (state: StateType) => Boolean(selectCurrentUser(state).id)
export const selectUserFirstName = (state: StateType) => selectCurrentUser(state).data?.firstName
export const selectUserSecondName = (state: StateType) => selectCurrentUser(state).data?.secondName
export const selectUserAvatar = (state: StateType) => selectCurrentUser(state).data?.avatar || null
export const selectUserEmail = (state: StateType) => selectCurrentUser(state).data?.email
export const selectUserDataLoadingStatus = (state: StateType) => selectData(state).loading
export const selectUserId = (state: StateType) => selectCurrentUser(state).id
