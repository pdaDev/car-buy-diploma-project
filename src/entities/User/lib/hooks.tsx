import {useAppDispatch, useAppSelector} from "app/services";
import {openModal} from "app/services/withPopupProvider";
import {selectActiveStatus, selectAuthStatus, selectUserId} from "../model/selectors";


export const useAuthorize = () => {
    const d = useAppDispatch()
    const userId = useAppSelector(selectUserId)
    const authStatus = useAppSelector(selectAuthStatus)
    const activeStatus = useAppSelector(selectActiveStatus)
    const authorize = () => d(openModal({ key: "auth" }))

    return {
        userId,
        authorize,
        authStatus: authStatus && activeStatus,
        authWithoutActiveStatus: authStatus,
        activeStatus
    }
}