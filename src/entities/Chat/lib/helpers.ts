import {IUserCommonData} from "../../../shared";
import {collection, doc, getDoc, setDoc, Timestamp} from "firebase/firestore";
import {db} from "./config";
import {addCar, addUser} from "../model";
import * as NS from '../namespace'
import {number} from "prop-types";
export const combineChatId = (initiatorId: number, receiverId: number, type: NS.ChatType, advertisementId?: number, carId?: number ) => {
    switch (type) {
        case 'sell':
            return `${initiatorId}:${receiverId}:${advertisementId}:${carId}`
        case 'support':
            return `${initiatorId}:support:${receiverId}`
    }
}


// export const writeMessage = async (currentUserId: number, adOwnerId: number, advertisement_id) => {
//     const chatId = combineChatId(currentUserId!, adOwnerId, advertisement_id)
//     const chatRef = collection(db, 'chats')
//     const userChatRef = collection(db, 'user_chats')
//
//     const chatDocRef = doc(db, 'chats', chatId)
//     try {
//         const res = await getDoc(chatDocRef)
//         if (!res.exists()) {
//             await setDoc(doc(chatRef, chatId), {
//                 messages: []})
//             await setDoc(doc(userChatRef,chatId), {
//                 carId: name.generation.id,
//                 type: 'sell',
//                 advertisementId: advertisement_id,
//                 lastMessage: {
//                     data: Timestamp.now(),
//                     text: '',
//                     senderId: currentUserId
//                 },
//                 initiatorId: currentUserId,
//                 receiverId: owner.id,
//             })
//             d(addUser(owner))
//             d(addCar(name))
//         }
//         n(p => p.chat._key_(chatId))
//     } catch (e) {
//         console.log(e)
//     }
// }

export const startChat = () => {

}

export const parseChatId = (chatId: string) => {
    const splitted = chatId.split(':')
    const initiatorId = +chatId[0]
    const type = splitted[1]

    if (type === 'support') {
        return {
            initiatorId,
            type,
            receiverId: +splitted[2],
            carId: null,
            advertisementId: null
        }
    }

    if (splitted.length === 4) {
        return  {
            initiatorId,
            type: 'sell',
            receiverId: +type,
            advertisementId: +splitted[2],
            carId: +splitted[3]
        }
    }
    return null

}