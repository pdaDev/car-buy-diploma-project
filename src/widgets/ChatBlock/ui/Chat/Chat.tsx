import {FC, useEffect, useRef, useState} from "react";
import {ChatLoadedImage, Stack} from "shared";
import {MessagesWrapper} from "entities/Chat";
import {ChatHeader, SendMessage} from "features/Chat";
import {addCarId, addUserId, db, NS, parseChatId, storage} from 'entities/Chat'
import {
    arrayUnion,
    collection,
    doc,
    onSnapshot,
    setDoc,
    Timestamp,
    updateDoc,
} from "firebase/firestore";
import {useAppDispatch, useAppSelector} from "app/services";
import {
    selectCars,
    selectCarsId,
    selectChatDataLoadingStatus, selectChats, selectUsers,
    selectUsersId
} from "entities/Chat/model/selectors";
import {selectAuthStatus, selectCurrentUser} from "entities/User/model/selectors";
import {deleteObject, getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {v4 as uuid} from "uuid";
import {IMessage, LastMessage} from "entities/Chat/namespace";
import {MessagesMenu} from "entities/Chat/ui/MessagesMenu/MessagesMenu";
import {AuthMotivation} from "features/Auth";

interface IProps {
    selectedChat: string
    leaveChat: Function
    isWidget: boolean
}


export const Chat: FC<IProps> = ({leaveChat, selectedChat, isWidget}) => {

    const [messages, setMessages] = useState<NS.IMessage[]>([])
    const [currentChat, setCurrentChat] = useState<{ carId: number | null, userId: number | null, withSupport: boolean, created: boolean, advertisementId: number | null }>()
    const [firstMessagesLoading, setFirstMessagesLoading] = useState(true)
    const [isSending, setSendingStatus] = useState(false)
    const withSupport = currentChat?.withSupport || false

    const d = useAppDispatch()
    const chatCarsId = useAppSelector(selectCarsId)
    const chatUsersId = useAppSelector(selectUsersId)
    const chatCars = useAppSelector(selectCars)
    const chatUsers = useAppSelector(selectUsers)
    const currentUser = useAppSelector(selectCurrentUser)
    const loading = useAppSelector(selectChatDataLoadingStatus)
    const loadingStatus = firstMessagesLoading || loading
    const chats = useAppSelector(selectChats)

    const getCurrentChat = async () => {
        const data = chats.find(chat => chat.id === selectedChat)
        setFirstMessagesLoading(true)
        if (data) {
            const userId = data.receiverId === currentUser.id ? data.initiatorId : data.receiverId
            const withSupport = data?.type === 'support'
            if (!withSupport) {
                setCurrentChat({
                    carId: data.carId,
                    userId,
                    withSupport: false,
                    created: true,
                    advertisementId: data.advertisementId
                })
            } else {
                setCurrentChat({carId: null, userId: null, withSupport: true, created: true, advertisementId: null})
            }
        } else {
            const parsedChat = parseChatId(selectedChat)
            if (parsedChat) {
                const {type, receiverId, advertisementId, carId} = parsedChat
                if (type === 'support') {
                    setCurrentChat({
                        carId: null,
                        userId: receiverId,
                        withSupport: true,
                        created: false,
                        advertisementId: null
                    })
                } else {
                    if (!chatCarsId.includes(carId!))
                        d(addCarId(carId!))
                    if (!chatUsersId.includes(receiverId!))
                        d(addUserId(receiverId!))
                    setCurrentChat({carId, userId: receiverId, withSupport: false, created: false, advertisementId})
                }
                setFirstMessagesLoading(false)
            }
        }
    }

    useEffect(() => {
        getCurrentChat()
    }, [chats])

    useEffect(() => {
        if (selectedChat && currentChat?.created) {
            const unsubscribe = onSnapshot(doc(db, "chats", selectedChat), (doc) => {
                if (doc.exists()) {
                    setMessages(doc.get('messages'))
                    setFirstMessagesLoading(false)
                }
            })
            return () => unsubscribe()
        }
    }, [selectedChat, currentChat])

    const car = chatCars.find(car => car.generation.id === currentChat?.carId)
    const opponentUser = chatUsers.find(user => user.id === currentChat?.userId)
    const MAX_COUNT_OF_LOADED_IMAGES = 8

    const [message, setMessage] = useState<string>('')
    const [images, setImages] = useState<ChatLoadedImage[]>([])
    const onImagesChange = (loadedImages: FileList) => {
        setImages([...images, ...Array.from(loadedImages).slice(0, MAX_COUNT_OF_LOADED_IMAGES - images.length).map(img => ({
            object: img,
            url: URL.createObjectURL(img)
        }) as ChatLoadedImage)])
    }

    const [editedMessage, setEditedMessage] = useState<IMessage | null>(null)
    const [repliedMessage, setReplyiedMessage] = useState<IMessage | null>(null)
    useEffect(() => {
        if (editedMessage) {
            setMessage(editedMessage.text)
        } else setMessage('')
    }, [editedMessage])

    const deleteImage = (index: number) => () => setImages(images.filter((_, i) => i !== index))
    const createChat = async (lastMessage: NS.LastMessage, message: NS.IMessage) => {
        const chatRef = collection(db, 'chats')
        const userChatRef = collection(db, 'user_chats')

        if (currentUser && currentChat) {
            try {
                await setDoc(doc(chatRef, selectedChat), {
                    messages: [message]
                })
                await setDoc(doc(userChatRef, selectedChat), {
                    lastMessage: lastMessage,
                    receiverId: currentChat.userId,
                    initiatorId: currentUser.id
                })
                setCurrentChat({...currentChat!, created: true })
            } catch (e) {
                console.error(e)
            }
        }
    }


    const authStutus = useAppSelector(selectAuthStatus)

    const sendMessage = async () => {
        if (authStutus) {
            const messageDate = Timestamp.now()
            setSendingStatus(true)
            const commonMessage: NS.IMessage = {
                id: uuid(),
                text: message,
                senderId: currentUser.id!,
                date: messageDate,
                isEdited: false,
                images: [],
                viewed: false,
                replied: repliedMessage?.id || null
            }
            const commonLastMessage: LastMessage = {
                text: message || '%photo%',
                date: messageDate,
                senderId: currentUser.id!
            }

            if (images.length > 0) {
                let imagesURLs: string[] = []
                images.forEach((img, i) => {
                    const storageRef = ref(storage, uuid())
                    const upload = uploadBytesResumable(storageRef, img.object)
                    upload.then(snapshot => {
                        getDownloadURL(snapshot.ref).then(async (downloadUrl) => {
                            imagesURLs.push(downloadUrl)
                            if (i === images.length - 1) {
                                const m: NS.IMessage = {...commonMessage, images: imagesURLs}
                                if (currentChat?.created) {
                                    await updateDoc(doc(db, 'chats', selectedChat), {
                                        messages: arrayUnion(m)
                                    })
                                    await updateDoc(doc(db, 'user_chats', selectedChat), {
                                        lastMessage: commonLastMessage
                                    })
                                } else {
                                    await createChat(commonLastMessage, m)
                                }
                            }
                        })
                    })
                })
            } else if (message.length > 0) {
                if (!editedMessage) {
                    if (currentChat?.created) {
                        await updateDoc(doc(db, 'chats', selectedChat), {
                            messages: arrayUnion(commonMessage)
                        })
                        await updateDoc(doc(db, 'user_chats', selectedChat), {
                            lastMessage: commonLastMessage
                        })
                    } else {
                        await createChat(commonLastMessage, commonMessage)
                    }

                } else {
                    if (currentChat?.created) {
                        await updateDoc(doc(db, 'chats', selectedChat), {
                            messages: messages.map(m => m.id === editedMessage.id ? {
                                ...m,
                                text: message,
                                isEdited: true
                            } : m)
                        })
                    }
                }
            }
            setSendingStatus(false)
            setImages([])
            setMessage('')
            setEditedMessage(null)
            setReplyiedMessage(null)
        }
    }

    const [selectedMessages, setSelectedMessages] = useState<IMessage[]>([])
    const selectMessage = (message: IMessage) => setSelectedMessages(
        !!selectedMessages.find(m => m.id === message.id)
            ? selectedMessages.filter(m => m.id !== message.id)
            : [...selectedMessages, message]
    )
    const repliedMessageAuthor = repliedMessage
        ? repliedMessage.senderId === currentUser.id
            ? currentUser.data
            : opponentUser
        : null

    const deleteSelectedMessages = async () => {
        selectedMessages.forEach((message) => {
            if (editedMessage === message) {
                setEditedMessage(null)
            }
            if (repliedMessage === message) {
                setReplyiedMessage(null)
            }
            if (currentChat?.created) {
                updateDoc(doc(db, 'chats', selectedChat), {
                    messages: messages.filter(m => {
                        const isMessagedForDelete = selectedMessages.map(m => m.id).includes(m.id)
                        if (isMessagedForDelete) {
                            m.images.forEach(img => {
                                const desertRef = ref(storage, img);
                                deleteObject(desertRef)
                            })
                        }
                        return !isMessagedForDelete
                    })
                })
            }

        });
        setSelectedMessages([])
    }

    const [viewedMessages, setViewedMessages] = useState<string[]>([])

    const timer = useRef<any>(-1)
    useEffect(() => {
        if (viewedMessages.length > 0) {
            clearTimeout(timer.current)
            timer.current = setTimeout(async () => {
                const vw = viewedMessages
                await updateDoc(doc(db, 'chats', selectedChat), {
                    messages: messages.map(m => vw.includes(m.id) ? {...m, viewed: true} : m)
                })
                setViewedMessages(m => m.filter(id => !vw.includes(id)))
            }, 500)
        }

    }, [viewedMessages])

    const viewMessage = (id: string) => {
        setViewedMessages(vw => [...vw, id])
    }

    const [searchMessage, setSearchMessage] = useState<string>('')

    return <Stack size={'container'}>
       <AuthMotivation translationKey={'chat'}>
           <ChatHeader leaveChat={leaveChat}
                       car={car}
                       currentChat={selectedChat}
                       isWidget={isWidget}
                       withSupport={withSupport}
                       searchMessage={searchMessage}
                       onSearchMessage={setSearchMessage}
                       user={opponentUser}/>
           <MessagesMenu selectedMessages={selectedMessages}
                         deleteMessages={deleteSelectedMessages}
                         repliedMessageUser={repliedMessageAuthor}
                         setSelectedMessages={setSelectedMessages}
                         editedMessage={editedMessage}
                         repliedMessage={repliedMessage}
                         setRepliedMessage={setReplyiedMessage}
                         addMessageToEdited={setEditedMessage}
           />
           <MessagesWrapper messages={messages}
                            selectedMessages={selectedMessages}
                            loading={loadingStatus}
                            searchMessage={searchMessage}
                            currentUserData={currentUser.data}
                            opponentUserData={opponentUser}
                            viewMessage={viewMessage}
                            replyMessage={setReplyiedMessage}
                            selectMessage={selectMessage}
                            onImageChanges={onImagesChange}
                            addMessageToEdited={setEditedMessage}
                            canDrop={images.length < 8}
           />
           <SendMessage message={message}
                        images={images}
                        deleteImage={deleteImage}
                        showTemplates={messages.length === 0}
                        onImageChange={onImagesChange}
                        sendMessage={sendMessage}
                        onMessageChange={setMessage}
                        isSending={isSending}
           />
       </AuthMotivation>
    </Stack>

}
