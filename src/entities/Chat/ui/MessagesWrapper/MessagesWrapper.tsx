import {DragEventHandler, FC, MouseEventHandler, useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react'
import {NS} from 'entities/Chat'
import s from './MessagesWrapper.module.scss'
import {useAppSelector} from "app/services";
import {selectCurrentUser, selectUserId} from "../../../User/model/selectors";
import {Message} from "../Message/Message";
import {
    Card,
    cn, Container,
    getTranslationIndex, Calendar,
    getTranslationIndexCreator, IUserCommonData,
    Label,
    Loader,
    Text, useFileDrop,
} from "shared";
import {IMessage} from "../../namespace";

import {useTranslation} from "react-i18next";
import Icon from "@mdi/react";
import {mdiCamera} from "@mdi/js/commonjs/mdi";
import {getUserName, IUserData} from "../../../User";

interface IProps {
    messages: NS.IMessage[]
    onImageChanges: (files: FileList) => void
    canDrop: boolean
    addMessageToEdited: Function
    selectedMessages: IMessage[]
    selectMessage: Function
    loading: boolean
    replyMessage: Function
    viewMessage: (id: string) => void
    currentUserData: IUserData
    opponentUserData: IUserCommonData | undefined
    searchMessage: string
}

export const MessagesWrapper: FC<IProps> = ({
                                                searchMessage,
                                                messages,
                                                addMessageToEdited,
                                                canDrop,
                                                onImageChanges,
                                                selectedMessages,
                                                selectMessage,
                                                replyMessage,
                                                loading,
                                                currentUserData,
                                                opponentUserData,
                                                viewMessage,
                                            }) => {

    const currentUserId = useAppSelector(selectUserId)

    const {dragStatus, dragUnderBLock, onDragOver, onDragLeave, onDrop} = useFileDrop()


    const getMessageType = (message: IMessage) => (
        message.senderId === currentUserId ? 'me' : 'opponent'
    )
    const onMessageClick = (message: IMessage) => () => {
        if (getMessageType(message) === 'me') {
            selectMessage(message)
        }
    }
    const onMessageEdit = (message: IMessage) => () => {
        addMessageToEdited(message)
    }

    const {t} = useTranslation()
    const getIndex = getTranslationIndexCreator('chat')
    const isEmptyChat = messages.length === 0
    const chat = useRef<HTMLDivElement>(null)
    const scrollHeight = chat.current?.scrollHeight

    // useLayoutEffect(() => {
    //     if (scrollHeight) {
    //         chat.current.scroll(0, scrollHeight)
    //         // setTimeout(() => forceUpdate())
    //         console.log(scrollHeight)
    //     }
    // }, [scrollHeight, chat])

    const groupedMessagesByDate = useMemo(() => (
        messages.filter(m => searchMessage.length === 0 || m.text.indexOf(searchMessage) > -1).reduce<Record<string, { date: Date, messages: IMessage[] }>>((acc, message) => {
            const todayDate = new Date()
            const today = todayDate.toLocaleDateString()
            todayDate.setDate(todayDate.getDay() - 1)
            const yesterday = todayDate.toLocaleDateString()
            let messageDateLabel = message.date.toDate().toLocaleDateString() as string
            const messageDate = message.date.toDate()
            messageDateLabel = messageDateLabel === today ? t("chat.today") : messageDateLabel
            messageDateLabel = messageDateLabel === yesterday ? t("chat.yesterday") : messageDateLabel
            acc[messageDateLabel] = acc[messageDateLabel] || {date: messageDate, messages: []}
            acc[messageDateLabel].messages.push(message)
            return acc
        }, {})
    ), [messages, searchMessage])


    const onMessageReply = (message: IMessage) => () => {
        replyMessage(message)
    }
    const onMessageView = (message: IMessage) => () => {
        viewMessage(message.id)
    }

    const [openedCalendar, setOpenedCalendar] = useState<null | string>(null)
    const toggleCalenderOpen = (date: string) => setOpenedCalendar(openedCalendar ? null : date)
    const goToMessageWithDate = (date: { toDate: Date }) => {
        const d = date.toDate
        let sinceMessageId = null
        do {
            const dateString = d.toLocaleDateString()
            sinceMessageId = messages.find(m => m.date.toDate().toLocaleDateString() === dateString)?.id || null
            if (sinceMessageId) {
                const el = document.getElementById(sinceMessageId)!
                el.setAttribute('tabIndex', '0')
                el.focus()
                setTimeout(() => el.removeAttribute('tabIndex'), 2000)
            } else {
                d.setDate(d.getDate() + 1)
            }

        } while (!sinceMessageId)
    }

    return (
        <div className={cn(s.container, isEmptyChat && s.empty_chat)}>
            {dragStatus && <div className={cn(s.drag_form, dragUnderBLock && s.can_drop)}
                                onDragOver={onDragOver}
                                onDragLeave={onDragLeave}
                                onDrop={onDrop(onImageChanges)}
            >
                <div>
                    <Icon path={mdiCamera} size={2}/>
                    <Text content={t(getIndex(canDrop ? 'drop.allowed' : "drop.denied"))}
                          weight={'medium'}
                          size={3}
                          align={'center'}

                    />
                </div>
            </div>}
            <div className={cn(s.chat)} ref={chat}>
                { loading && <Container contentAlign={'center'}>
                    <Loader type={'line'} size={'medium'}/>
                </Container> }
                {isEmptyChat && !loading && <Container mb={5} size={'content'} max_w={'250px'}>
                    <Card width={'100%'}
                          contentDirection={'column'}
                          contentGap={3}
                          paddings={4}>
                        <Label label={t(getIndex(getTranslationIndex('title', 'empty_chat')))}
                               weight={'medium'}
                               size={6}
                        />
                        <Text content={t(getIndex(getTranslationIndex('text', 'empty_chat')))}
                              weight={'regular'}
                              size={3}
                              color={'grey-1'}
                        />
                    </Card>
                </Container>}

                {Object.keys(groupedMessagesByDate).map((key, index) => {
                    return <>
                        <div className={s.date}
                        >
                           <span onClick={() => toggleCalenderOpen(key)}
                           >
                               { key }
                           </span>
                            {
                                openedCalendar === key && <div className={s.calendar_wrapper}>
                                    <Calendar setDate={goToMessageWithDate}
                                              closeBehavior={'blur'}
                                              min={messages[0].date.toDate()}
                                              max={'today'}
                                              defaultDates={groupedMessagesByDate[key as keyof typeof groupedMessagesByDate].date}
                                              close={() => setOpenedCalendar(null)}/>
                                </div>
                            }
                        </div>
                        {groupedMessagesByDate[key as keyof typeof groupedMessagesByDate]?.messages
                            .map(message => {
                                const repliedMessage = message.replied ? messages.find(m => m.id === message.replied) : null
                                const repliedMessageContent = repliedMessage ? {
                                    text: repliedMessage.images.length > 0 && repliedMessage.text.length === 0
                                        ? 'photo' : repliedMessage?.text,
                                    id: message.replied!,
                                    authorName: repliedMessage.senderId === opponentUserData?.id ?
                                        getUserName('with-short-last-name', opponentUserData.first_name, opponentUserData.last_name)
                                        : getUserName('with-short-last-name', currentUserData.firstName, currentUserData.secondName)
                                } : null
                                return <Message images={message.images}
                                                id={message.id}
                                                isEdited={message.isEdited}
                                                onClick={onMessageClick(message)}
                                                message={message.text}
                                                date={message.date}
                                                viewed={message.viewed}
                                                viewMessage={onMessageView(message)}
                                                isSelected={!!selectedMessages.find(m => m.id === message.id)}
                                                onMessageEdit={onMessageEdit(message)}
                                                replied={repliedMessageContent}
                                                onMessageReply={onMessageReply(message)}
                                                type={getMessageType(message)}/>
                            })}
                    </>
                })}
            </div>
        </div>)

}
