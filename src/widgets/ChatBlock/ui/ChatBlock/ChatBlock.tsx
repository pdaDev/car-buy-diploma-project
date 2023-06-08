import {FC} from "react";

import {Chat} from "../Chat/Chat";
import {ChatList} from "../ChatList/ChatList";

import 'firebase/firestore'
import {useAuthorize} from "../../../../entities/User/lib/hooks";
import {Button, Container, getTranslationIndexCreator, Label, Stack, Text} from "../../../../shared";
import {useTranslation} from "react-i18next";
import {AuthMotivation} from "../../../../features/Auth";


interface IProps {
    selectChat: (chatId: string | null) => void
    selectedChat: string | null
    isWidget: boolean
}

export const ChatBlock: FC<IProps> = ({selectChat, selectedChat, isWidget}) => {
    const leaveChat = () => selectChat(null)
    const {authStatus, authorize} = useAuthorize()
    const { t } = useTranslation()
    const getIndex = getTranslationIndexCreator('chat.not_authed')


    return <AuthMotivation translationKey={'chat'}
                           fullHeight
                           fullWidth
                           withoutShadow
                           withTopMargin={false}>
        {
            selectedChat
                ? <Chat selectedChat={selectedChat}
                        leaveChat={leaveChat}
                        isWidget={isWidget}
                />
                : <ChatList selectChat={selectChat}/>
        }

    </AuthMotivation>
}


