import {FC, useMemo, useState} from "react";
import {useTranslation} from "react-i18next";
import {
    Button,
    Container,
    createMultiLanguageOptions, Details,
    getTranslationIndexCreator,
    Label,
    Separator,
    Stack,
    Switcher, Symbol
} from "shared";
import {ChatCard, NS, useStartChat} from 'entities/Chat'
import {useAppSelector} from "app/services";
import {selectAdminStatus, selectUserId} from "entities/User/model/selectors";
import {selectCars, selectChats, selectUsers} from "entities/Chat/model/selectors";
import Icon from "@mdi/react";
import {mdiFaceAgent} from "@mdi/js/commonjs/mdi";
import {IChatCardData} from "entities/Chat/namespace";
import {getUserName} from "entities/User";
import s from './ChatList.module.scss'

interface IProps {
    selectChat: (id: string) => void
}

type GroupingType = 'all' | 'userId' | 'carId'
type ChatTypes = Extract<keyof NS.IServerChat, 'receiverId' | 'initiatorId'> | 'all'
export const ChatList: FC<IProps> = ({selectChat}) => {
    const {t} = useTranslation()
    const getIndex = getTranslationIndexCreator('chat.list')

    const advailableGrouping: GroupingType[] = ['all', 'userId', 'carId']
    const availableChatsTypes: ChatTypes[] = ['all', 'receiverId', 'initiatorId']
    const chatTypesOptions = createMultiLanguageOptions(availableChatsTypes, t, getIndex('chat_type'))
    const [types, setType] = useState<ChatTypes>('all')

    const [groupByType, setGroupByType] = useState<GroupingType>('all')
    const groupOptions = createMultiLanguageOptions(advailableGrouping, t, getIndex('group'))
    const currentUserId = useAppSelector(selectUserId)
    const chatCars = useAppSelector(selectCars)
    const chatUsers = useAppSelector(selectUsers)

    const chats = useAppSelector(selectChats)
    const filteredChats = useMemo(() => {
        return chats.filter(chat => types === 'all' || chat[types] === currentUserId!).map(chat => {

                return {
                    ...chat,
                    user: chatUsers.find(u => u.id === chat.userId),
                    car: chatCars.find(c => c.generation.id === chat.carId)
                } as IChatCardData
            }
        )
    }, [chats, types, chatCars, chatUsers, currentUserId])
    const groupedChats = useMemo(() => {
        if (groupByType !== "all") {
            return filteredChats.reduce<Record<string, IChatCardData[]>>((acc, chat) => {
                acc[chat[groupByType]] = acc[chat[groupByType]] || []
                acc[chat[groupByType]].push(chat)
                return acc
            }, {})
        }
        return null
    }, [filteredChats, groupByType])

    const startChat = useStartChat('support')
    const goToSupportChat = () => {
        startChat.setChat(selectChat)
    }

    const isAdmin = useAppSelector(selectAdminStatus)
    const getGroupLabel = (chat: IChatCardData) => {
        if (groupByType === 'carId') {
            const car = chat.car
            return car ? `${car.brend.name} ${car.model.name}` : null
        }
        if (groupByType === 'userId') {
            const user = chat.user
            return getUserName('with-short-last-name', user.first_name, user.last_name)
        }
        return null
    }

    return <Container p={4} >
        <Stack spacing={5} size={'width'}>
            <Stack spacing={4} size={'width'}>
                <Stack spacing={4} size={'width'}>
                    <Label label={t(getIndex("label"))}
                           level={2}
                           size={6}
                           weight={'medium'}/>
                    <Separator/>
                    <Symbol content={t(getIndex("group.label"))}
                            weight={'regular'}
                            size={4}
                    />
                    <Stack direction={'row'} hAlign={'start'} wrap spacing={4}>
                        <Switcher options={groupOptions}
                                  activeOptions={groupByType}
                                  onChange={setGroupByType}
                        />
                        <Switcher options={chatTypesOptions}
                                  activeOptions={types}
                                  onChange={setType}
                        />
                    </Stack>

                </Stack>
                <div className={s.chats_list}>
                    {
                        groupedChats
                            ? Object.keys(groupedChats).map(key => {
                                const chats = groupedChats[key as keyof typeof groupedChats]
                                return <Details label={getGroupLabel(chats[0])}>
                                    <Stack spacing={3} size={'container'}>
                                        {chats
                                            .map(chat => <ChatCard data={chat}
                                                                   key={chat.id}
                                                                   onClick={selectChat}
                                            />)}
                                    </Stack>
                                </Details>

                            })
                            : filteredChats.map(chat => <ChatCard data={chat}
                                                                  key={chat.id}
                                                                  onClick={selectChat}
                            />)

                    }
                </div>
            </Stack>
            {!isAdmin && <Button type={'secondary'}
                                 onClick={goToSupportChat}
            >
                <Stack direction={'row'} size={'width'} vAlign={'center'}>
                    <Symbol color={'fnt-black'} content={t("chat.chat_with_support") as string}
                    />
                    <Icon path={mdiFaceAgent} size={1}/>
                </Stack>
            </Button>}
        </Stack>
    </Container>
}