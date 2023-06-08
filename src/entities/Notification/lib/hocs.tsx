import {ComponentType, FC} from "react";

import {useNotificationInit} from "./hooks";


export const withNotifications = (Component: ComponentType<any>) => {
    const Container: FC = (props) => {
        useNotificationInit()
        return <Component {...props} />
    }
    return Container
}