import {configureStore} from "@reduxjs/toolkit";
import {systemDataReducer} from '../../wtihSystemData'
import {commonDataReducer} from '../../withCommonData'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {notificationReducer} from "entities/Notification";
import {popupReducer} from "../../withPopupProvider";
import {commonLayoutReducer} from "../../withCommonLayout";
import { advertisementAPI } from 'entities/Advertisement'
import {searchApi} from "pages/Search";
import {userReducer} from "entities/User";
import {favouritesReducer} from "features/OperateWithAdvertisementFavourites";
import {reviewAPI} from "entities/Review";
import {carApi} from "entities/Car";
import {compareReducer} from "features/CompareSmth";
import {chatReducer} from "entities/Chat";
import {adminAPI} from "features/Administration";
import {testAPI} from "features/Test/api";
import {savedTestResultReducer} from "features/Test/model/slice";



export const store = configureStore({
    reducer: {
        systemData: systemDataReducer,
        commonData: commonDataReducer,
        notification: notificationReducer,
        popup: popupReducer,
        commonLayout: commonLayoutReducer,
        user: userReducer,
        favourites: favouritesReducer,
        compares: compareReducer,
        chat: chatReducer,
        savedTestResults: savedTestResultReducer,
        [advertisementAPI.reducerPath]: advertisementAPI.reducer,
        [searchApi.reducerPath]: searchApi.reducer,
        [reviewAPI.reducerPath]: reviewAPI.reducer,
        [carApi.reducerPath]: carApi.reducer,
        [adminAPI.reducerPath]: adminAPI.reducer,
        [testAPI.reducerPath]: testAPI.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(advertisementAPI.middleware)
            .concat(searchApi.middleware)
            .concat(reviewAPI.middleware)
            .concat(carApi.middleware)
            .concat(adminAPI.middleware)
            .concat(testAPI.middleware)
    }
})


type storeType = typeof store;
type dispatchType = storeType["dispatch"];
export type StateType = ReturnType<typeof store.getState>

export const useAppSelector: TypedUseSelectorHook<StateType> = useSelector
// eslint-disable-next-line react-hooks/rules-of-hooks
export const useAppDispatch = () => useDispatch<dispatchType>()
