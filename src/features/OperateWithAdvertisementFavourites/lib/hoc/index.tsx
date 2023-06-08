import {ComponentType, FC, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../../app/services";
import {selectors as userSelectors} from 'entities/User'
import {cleanFavourites, getFavouritesIdsList} from "../../model";
import {useAuthorize} from "../../../../entities/User/lib/hooks";

export const withFavourites = (Component: ComponentType) => {
    const Container: FC = (props) => {
        const {authStatus} = useAuthorize()
        const d = useAppDispatch()
        useEffect(() => {
            if (authStatus) {
                d(getFavouritesIdsList())
            } else {
                d(cleanFavourites())
            }
        }, [authStatus, d])

        return <Component {...props}/>
    }
    return Container
}