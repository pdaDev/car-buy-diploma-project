import { compose } from 'redux'
import {withStoreProvider, withCommonData, Router, withCommonLayout, withErrorBoundary, withRouter} from './services'
import {withThemeProvider, withErrorDispatcher, withLanguageProvider} from "./services";
import {ComponentType} from "react";
import {withActivation, withBan, withInitAuth} from "entities/User";
import {withFavourites} from "features/OperateWithAdvertisementFavourites";
import {withCompare} from "features/CompareSmth";
import {withChat} from "entities/Chat";
import {withNotifications} from "entities/Notification";


export default compose(
    withErrorBoundary,
    withStoreProvider,
    withCommonData,
    withInitAuth,
    withErrorDispatcher,
    withRouter,
    withThemeProvider,
    withLanguageProvider,
    withBan,
    withCommonLayout,
    withNotifications,
    withActivation,
    withFavourites,
    withCompare,
    withChat,
)(Router) as ComponentType