import {FC} from "react";
import {ChatLabel} from "./ChatLabel";
import {Card, Clickable, getTimeWithoutSeconds, Symbol} from "shared";
import * as NS from '../../namespace'

interface IProps {
    data: NS.IChatCardData
    onClick: Function
}

export const ChatCard: FC<IProps> = ({data, onClick}) => {
    const onChatCardClick = () => {
        onClick(data.id)
    }



    const chatWithSupport = data.type === 'support'
    return <Clickable onClick={onChatCardClick}>
        <Card shadow={3}
              border={2}
              color={'light-card'}
              height={'60px'}
              width={'100%'}
              paddings={3}>
            <ChatLabel user={data.user}
                       car={data.car}
                       withSupport={chatWithSupport}
                       message={data.lastMessage}>
                <Symbol content={getTimeWithoutSeconds(data.lastMessage.date.toDate())}
                        weight={'medium'}
                        size={3}
                        color={'grey-1'}
                />
            </ChatLabel>

        </Card>
    </Clickable>
}