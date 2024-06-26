import {ComponentType, FC, useEffect} from "react";
import {useAppDispatch} from "app/services";
import {getCompareListIds} from "../../model";
import {useAuthorize} from "entities/User/lib/hooks";


export const withCompare = (Component: ComponentType) => {
    const Container: FC = (props) => {
        const { authStatus } = useAuthorize()
        const d = useAppDispatch()
        useEffect(() => {
            d(getCompareListIds())
        }, [authStatus, d])

        return <Component {...props}/>
    }
    return Container
}