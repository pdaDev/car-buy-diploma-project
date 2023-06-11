import {FC, useState} from "react";
import {Button, Card, Clickable, ICarNameWithId, Input, IUserCommonData, Stack} from "shared";
import s from './ChatHeader.module.scss'
import {ChatLabel} from "entities/Chat";
import {useAppDispatch, useAppNavigate} from "app/services";
import Icon from "@mdi/react";
import {
    mdiChevronLeft,
    mdiClose,
    mdiMagnify,
    mdiOpenInNew
} from "@mdi/js/commonjs/mdi";
import {toggleSideMenuChat} from "app/services/withCommonLayout/model/slice";
import {useTranslation} from "react-i18next";

interface IProps {
    leaveChat: Function
    user: IUserCommonData | undefined
    car: ICarNameWithId | undefined
    isWidget: boolean
    currentChat: string
    withSupport: boolean
    searchMessage: string
    onSearchMessage: any
}

export const ChatHeader: FC<IProps> = ({
                                           leaveChat,
                                           user,
                                           car,
                                           searchMessage,
                                           onSearchMessage,
                                           currentChat,
                                           isWidget,
                                           withSupport
                                       }) => {
    const n = useAppNavigate()
    const d = useAppDispatch()
    const openFullChat = () => {
        n(p => p.chat._key_(currentChat))
        d(toggleSideMenuChat())
    }

    const [isSearchOpened, setSearchOpenedStatus] = useState(false)
    const { t } = useTranslation()
    const closeSearch = () => {
        setSearchOpenedStatus(false)
        onSearchMessage('')
    }

    return <Card paddings={[3, 4]} border={0} shadow={0}>
        {isSearchOpened ? <Stack direction={'row'} spacing={3} size={'width'}>
            <Stack direction={'row'} spacing={3} vAlign={'center'} size={'width'}>
                <Icon path={mdiMagnify} size={1}/>
                <div className={s.search_message}>
                    <Input value={searchMessage}
                           onChange={onSearchMessage}
                           width={'full'}
                           placeholder={t('chat.search_message') as string}
                    />
                    <span className={s.reset_search_message} onClick={() => onSearchMessage('')}>
                    <Icon path={mdiClose} size={0.8}/>
                </span>
                </div>
            </Stack>

            <Button type={'primary'}
                    label={t('form.decline') as string}
                    onClick={closeSearch}
            />
        </Stack> : <Stack direction={'row'} size={'container'} vAlign={'center'} spacing={3}>
            <Stack direction={'row'} spacing={3}>
                <Clickable onClick={leaveChat} color={'grey-1'}>
                    <Icon path={mdiChevronLeft} size={1.5}/>
                </Clickable>
                <ChatLabel user={user}
                           car={car}
                           withSupport={withSupport}
                />
            </Stack>
            <Stack direction={'row'} spacing={3}>
                <span className={s.open_full_chat_button}
                      onClick={() => setSearchOpenedStatus(true)}
                      tabIndex={0}>
                <Icon path={mdiMagnify} size={1}/>
            </span>
                {isWidget && <span className={s.open_full_chat_button}
                                   onClick={openFullChat}
                                   tabIndex={0}>
                <Icon path={mdiOpenInNew} size={1}/>
            </span>}
            </Stack>

        </Stack>}
    </Card>
}