import {FC} from "react";
import s from "./MessagesMenu.module.scss";
import Icon from "@mdi/react";
import {mdiClose, mdiContentCopy} from "@mdi/js/commonjs/mdi";
import {
    checkIsRussian,
    Clickable,
    createRuWordEndingByNumberGetter,
    getTranslationIndexCreator, IUserCommonData,
    Label,
    Stack,
    Text, UserNickname
} from "../../../../shared";
import {mdiDeleteOutline} from "@mdi/js";
import {useTranslation} from "react-i18next";
import {IMessage} from "../../namespace";
import {arrayUnion, arrayRemove, doc, Timestamp, updateDoc} from "firebase/firestore";
import {db, storage} from "../../lib/config";
import {v4 as uuid} from "uuid";
import {ref, deleteObject} from "firebase/storage";
import {getUserName, IUser, IUserData} from "../../../User";

interface IProps {
    selectedMessages: IMessage[]
    setSelectedMessages: Function
    editedMessage: IMessage | null
    addMessageToEdited: Function
    setRepliedMessage: Function
    repliedMessage: IMessage | null
    repliedMessageUser: Partial<IUserData & IUserCommonData> | null | undefined
    deleteMessages: Function
}


export const MessagesMenu: FC<IProps> = ({
                                             editedMessage,
                                             selectedMessages,
                                             setSelectedMessages,
                                             addMessageToEdited,
                                             setRepliedMessage,
                                             deleteMessages,
                                             repliedMessage,
                                             repliedMessageUser
                                         }) => {
    const {i18n, t} = useTranslation()
    const getIndex = getTranslationIndexCreator('chat')

    const getMessages = createRuWordEndingByNumberGetter({
        root: 'cообщени',
        single: {ip: 'е', rp: 'я'}, multiple: {value: 'й'}
    })
    const countOfSelectedMessages = selectedMessages.length
    const countSelectedMessagesLabel = checkIsRussian(i18n) ? getMessages(countOfSelectedMessages) : 'messages'
    const declineSelection = () => setSelectedMessages([])
    const showMessagesMenuWrapper = editedMessage || selectedMessages.length > 0 || repliedMessage
    const deleteEditedMessage = () => {
        addMessageToEdited(null)
    }
    const deleteRepliedMessage = () => {
        setRepliedMessage(null)
    }
    const copySelectedMessagesTextToBuffer = () => {
        const textForCopy = selectedMessages.reduce<string>((acc, message) => {
            acc += (acc.length > 0 ? '. ' : '') + message.text
            return acc
        }, '')
        navigator.clipboard.writeText(textForCopy)
        setSelectedMessages([])
    }
    const repliedMessageAuthorFirstName = repliedMessageUser ?
        repliedMessageUser.firstName || repliedMessageUser.first_name
        : ''
    const repliedMessageAuthorLastName = repliedMessageUser ?
        repliedMessageUser.secondName || repliedMessageUser.last_name
        : ''

    if (showMessagesMenuWrapper) {
        return (
            <div className={s.menu}>
                {
                    editedMessage && <div className={s.edited_message}>
                    <span className={s.decline_selection} onClick={deleteEditedMessage}>
                        <Icon path={mdiClose} size={0.8}/>
                    </span>
                        <Stack>
                            <Label label={t(getIndex('edited_message'))} size={1} weight={'regular'} level={4}
                                   type={'secondary'}/>
                            <Text content={editedMessage.text} weight={'regular'} size={2}/>
                        </Stack>
                    </div>
                }
                {
                    repliedMessage && <div className={s.replied_message}>
                    <Stack direction={'row'} spacing={3} vAlign={'center'}>
                        <span className={s.decline_selection} onClick={deleteRepliedMessage}>
                        <Icon path={mdiClose} size={0.8}/>
                    </span>
                        <Stack>
                            <Label label={getUserName("with-short-last-name",
                                repliedMessageAuthorFirstName, repliedMessageAuthorLastName)}
                                   type={'secondary'}
                                   level={5}
                                   weight={'regular'}
                            />
                            <Text content={repliedMessage.text} weight={'regular'} size={2}/>
                        </Stack>
                    </Stack>
                        <Label label={t(getIndex('reply'))} size={3}
                               weight={'regular'} level={4}
                               type={'secondary'}/>
                    </div>
                }
                {countOfSelectedMessages > 0 && <div className={s.selected_messages_menu}>
                    <Stack direction={'row'} spacing={3}>
                    <span className={s.decline_selection} onClick={declineSelection}>
                        <Icon path={mdiClose} size={0.8}/>
                    </span>
                        <Label label={`${countOfSelectedMessages} ${countSelectedMessagesLabel}`}
                               level={3}
                               size={3}
                               weight={"regular"}
                        />
                    </Stack>
                    <div className={s.selected_els_management_buttons}>
                        <Clickable onClick={deleteMessages}>
                            <Icon path={mdiDeleteOutline} size={1}/>
                        </Clickable>
                        <Clickable onClick={copySelectedMessagesTextToBuffer}>
                            <Icon path={mdiContentCopy} size={1}/>
                        </Clickable>
                    </div>
                </div>}
            </div>
        )
    }
    return <></>
}