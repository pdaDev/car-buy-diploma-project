import {FC, useEffect} from "react";
import {useParams} from "react-router-dom";
import {ChatBlock} from "../../../widgets/ChatBlock";
import {useAppDispatch, useAppNavigate} from "../../../app/services";
import {Card, Container, useNavigationPermission, useTabTile} from "../../../shared";
import {setCurrentChat} from "../../../entities/Chat";
import {AuthMotivation} from "../../../features/Auth";
import {useTranslation} from "react-i18next";

export const Chat: FC = () => {
    const {id} = useParams()
    const n = useAppNavigate()
    const chatId = id ? id : null

    const selectChat = (id: string | null) => n(p => id ? p.chat._key_(id) : p.chat)
    const d = useAppDispatch()
    useEffect(() => {
        d(setCurrentChat(chatId))
        return () => {
            d(setCurrentChat(null))
        }
    }, [chatId, d])
    const { t } = useTranslation()
    useTabTile(t("pages.chats"))

    return <AuthMotivation translationKey={'chat'}>
        <Container max_w={'800px'} h={'100%'} max_h={!!chatId ? '80%': undefined} pb={5} >
            <Card width={'100%'} height={'100%'}>
                <ChatBlock selectChat={selectChat}
                           selectedChat={chatId}
                           isWidget={false}
                />
            </Card>
        </Container>
    </AuthMotivation>
}