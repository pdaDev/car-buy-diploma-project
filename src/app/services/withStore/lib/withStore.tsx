
import {Provider} from "react-redux";
import { store } from '../model/store.js';
import {ComponentType, FC} from "react";

export const withStoreProvider = (Component: ComponentType) => {
    const Container: FC = () => <Provider  store={store} >
        <Component />
    </Provider>
    return Container
}