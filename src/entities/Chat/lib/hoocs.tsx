import {Component, ComponentType, FC, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../app/services";
import {
    selectCars,
    selectCarsId, selectChats,
    selectCurrentChat,
    selectModalCurrentChat,
    selectUsers,
    selectUsersId
} from "../model/selectors";
import {getChatCars, getChatUsers} from "../model/thunks";
import {collection, doc, getDocs, onSnapshot, query, where, or} from "firebase/firestore";
import {db} from "./config";
import {setCars, setChats, setUsers} from "../model";
import {selectUserId} from "../../User/model/selectors";
import {IChatCardData, IReduxChat} from "../namespace";
import {addChatNotification} from "../../Notification";
import {getUserName} from "../../User";
import {parseChatId} from "./helpers";
import {useTestResults} from "../../../features/Test/lib/hooks";
import {useAuthorize} from "../../User/lib/hooks";


export const withChat = (Component: ComponentType) => {

    const Container: FC = (props) => {

        const { getTestResults } = useTestResults()
        useEffect(() => {
            getTestResults()
        })

        const { authStatus } = useAuthorize()

        const carsId = useAppSelector(selectCarsId)
        const usersId = useAppSelector(selectUsersId)
        const d = useAppDispatch()

        const chatUsers = useAppSelector(selectUsers)
        const chatCars = useAppSelector(selectCars)
        const currentUserId = useAppSelector(selectUserId)
        const currentChat = useAppSelector(selectCurrentChat)
        const currentModalChat = useAppSelector(selectModalCurrentChat)
        const chats = useAppSelector(selectChats)
        const [chatDocs, setChatDocs] = useState<IReduxChat[]>([])

        useEffect(() => {
           if (authStatus) {
               if (chatDocs.length > chats.length) {
                   const cars = chatDocs.map(doc => doc.carId)
                   const users = chatDocs.map(doc => doc.userId)
                   d(setUsers(users))
                   d(setCars(cars))
               }
               d(setChats(chatDocs))
           }
        }, [chatDocs, chats])

        useEffect(() => {
            if (authStatus) {
                const currentChatsId = chats.map(chat => chat.id)
                // const newChats = chatDocs.filter(chat => !currentChatsId.includes(chat.id))

                const changedChats = chatDocs
                    .filter(chat => currentChatsId.includes(chat.id))
                    .filter((chat) => chats.find(c => c.id === chat.id)!.lastMessage.date.seconds !== chat.lastMessage.date.seconds
                    )

                changedChats.forEach(chat => {
                    if (![currentChat, currentModalChat].includes(chat.id)) {
                        const { lastMessage: { text, date, senderId } } = chat
                        const user = chatUsers.find(u => u.id === senderId)
                        if (user) {
                            d(addChatNotification({
                                message: text,
                                chatId: chat.id,
                                avatar: user.avatar,
                                name: getUserName('full', user.first_name, user.last_name)
                            }))
                        }
                    }
                })
            }

        }, [chatDocs, chats, currentChat, currentModalChat, chatCars, chatUsers, authStatus])


        useEffect(() => {
            if (authStatus) {
                if (carsId.length > 0)
                    d(getChatCars({cars: carsId}))
            }
        }, [carsId, authStatus])

        useEffect(() => {
            if (authStatus) {
                if (usersId.length > 0)
                    d(getChatUsers({users: usersId}))
            }
        }, [usersId, authStatus])

        useEffect(() => {
            if (currentUserId && authStatus) {
                const q = query(collection(db, 'user_chats'),
                    or(
                        where('initiatorId', '==', currentUserId),
                        where('receiverId', '==', currentUserId)
                    ))


                const unsubscribe = onSnapshot(q, (docs) => {

                    const chats: IReduxChat[] = []

                    docs.forEach(doc => {
                        const parsedChatId = parseChatId(doc.id)
                        if (parsedChatId) {
                            const { initiatorId, type, advertisementId, receiverId, carId } = parsedChatId
                            const userId = receiverId === currentUserId ? initiatorId : receiverId
                            chats.push({
                                id: doc.id,
                                userId,
                                initiatorId,
                                type,
                                lastMessage: doc.get('lastMessage'),
                                advertisementId,
                                receiverId,
                                carId,
                            } as IReduxChat)
                        }
                    })
                    setChatDocs(chats)
                })


                return () => {
                    unsubscribe()
                }
            }

        }, [currentUserId])


        return <Component {...props}/>
    }
    return Container
}

