import {ComponentType, FC, useEffect} from "react";
import {useAppDispatch} from "../../../app/services";
import {authme} from "../model";

export const withInitAuth = (Component: ComponentType) => {
    const Container: FC = (props) => {
        const d = useAppDispatch()
        useEffect(() => {
            d(authme())
        }, [])

        return <Component {...props} />
    }
    return Container
}