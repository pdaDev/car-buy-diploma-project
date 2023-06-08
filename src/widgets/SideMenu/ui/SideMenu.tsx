import {FC, useEffect, useState} from "react";
import s from './SideMenu.module.scss'
import Icon from "@mdi/react";
import {mdiBellOutline, mdiChatOutline} from "@mdi/js/commonjs/mdi";
import {cn} from "../../../shared";
import {ChatBlock} from "../../ChatBlock";
import {NotificationModule} from "../../Notification/ui/NotificationModule";
import {
    selectors as slc,
    useAppDispatch,
    useAppSelector
} from "../../../app/services";
import {toggleSideMenuChat, toggleSideMenuNotifications} from "../../../app/services/withCommonLayout/model/slice";
import {selectModalCurrentChat} from "../../../entities/Chat/model/selectors";
import {setModalCurrentChat} from "../../../entities/Chat";
import {SideMenuNotifications} from "../../../features/SideMenuNotifications/ui/SideMenyNotifications";
import {getNotViewedNotificationsCount} from "../../../entities/Notification/api";
import {selectNotViewedNotificationsCount} from "../../../entities/Notification/model/selectors";
import {useAuthorize} from "../../../entities/User/lib/hooks";


export const SideMenu: FC = () => {
    const isChatOpened = useAppSelector(slc.selectSideMenuChatOpenStatus)
    const isNotificationsBlockOpened = useAppSelector(slc.selectSideMenuNotificationsOpenStatus)
    const isSideMenuOpen = isChatOpened || isNotificationsBlockOpened
    const selectedChat = useAppSelector(selectModalCurrentChat)

    const d = useAppDispatch()
    const selectChat = (chat: string | null) => d(setModalCurrentChat(chat))
    const openChat = () => {
        d(toggleSideMenuChat())
    }
    const openNotifications = () => {
        d(toggleSideMenuNotifications())
    }
    useEffect(() => {
        if (isChatOpened) {
            return () => {
                selectChat(null)
            }
        }
    }, [isChatOpened])

    const countOfNotViewedNotifications = useAppSelector(selectNotViewedNotificationsCount)


    return <div className={cn(s.side_menu, isSideMenuOpen && s.active)}>
        <div className={s.buttons_block}>
            <span className={cn(s.button, isNotificationsBlockOpened && s.active)}
                  tabIndex={0}
                  onClick={openNotifications}
            >
                { countOfNotViewedNotifications > 0 && <span className={s.mark}>
                    { countOfNotViewedNotifications }
                </span> }
                    <Icon path={mdiBellOutline}
                          size={1}/>
            </span>
            <span className={cn(s.button, isChatOpened && s.active)}
                  tabIndex={0}
                  onClick={openChat}
            >
                    <Icon path={mdiChatOutline}
                          size={1}/>
            </span>
        </div>
        {isChatOpened && <ChatBlock selectedChat={selectedChat}
                                    isWidget={true}
                                    selectChat={selectChat}/>}
        {isNotificationsBlockOpened && <SideMenuNotifications/>}
    </div>
}