import {useAppDispatch, useAppNavigate, useAppSelector} from "../../../app/services";
import {combineChatId} from "./helpers";
import * as NS from '../namespace'
import {addCar, addCarId, addUser, addUserId} from "../model";

import {selectCarsId, selectUsers, selectUsersId} from "../model/selectors";
import {ADMIN_USER_ID, ICarNameWithId, IUserCommonData} from "../../../shared";
import {selectUserId} from "../../User/model/selectors";

export const useStartChat = (type: NS.ChatType, receiver?: IUserCommonData, advertisementId?: number, car?: ICarNameWithId) => {
    const currentUserId = useAppSelector(selectUserId)
    const chatCarsId = useAppSelector(selectCarsId)
    const chatUsersId = useAppSelector(selectUsersId)
    const d = useAppDispatch()
    const n = useAppNavigate()
    const getKey = () => {
        if (currentUserId) {
            const key = combineChatId(currentUserId, type === 'support' ? ADMIN_USER_ID : receiver!.id, type === 'admin' ? 'support' : type, advertisementId, car?.generation.id)

            if (car && !chatCarsId.includes(car?.generation.id))
                d(addCar(car))
            if (type !== 'support' && receiver && !chatUsersId.includes(receiver.id))
                d(addUser(receiver))

            return key
        }
        return null
    }
    const key = getKey()

    return {
        navigate: () => key &&  n(p => p.chat._key_(key!)),
        setChat: (set: (chat: string) => void) => key && set(key!),
        key
    }

}