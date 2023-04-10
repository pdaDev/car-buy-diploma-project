import { compose } from 'redux'
import {withStoreProvider, withCommonData, Router, withCommonLayout, withErrorBoundary, withRouter} from './services'
import {withThemeProvider, withErrorDispatcher, withLanguageProvider} from "./services";
import {ComponentType} from "react";
import {withInitAuth} from "entities/User";
import {withFavourites} from "../features/OperateWithAdvertisementFavourites";


export default compose(
    withErrorBoundary,
    withStoreProvider,
    withErrorDispatcher,
    withRouter,
    withCommonData,
    withThemeProvider,
    withLanguageProvider,
    withInitAuth,
    withFavourites,
    withCommonLayout
)(Router) as ComponentType