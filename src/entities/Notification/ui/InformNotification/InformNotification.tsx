import {FC} from 'react'

import * as NS from '../../namespace'
import {Box, Label, Text} from "shared";
import {NotificationCloseButton} from "../NotificationCloseButton/NotificationCloseButton";

interface IProps extends NS.IInformNotification {

    extra?: NS.NotificationComponentExtra
}

export const InformNotification: FC<IProps> = ({
                                                   message,
                                                   title,
                                                   image,
                                                   extra
                                               }) => {
    return <Box brd={2}>
        <Label label={title}/>
        <Text content={message}/>
        { extra && extra.close && <NotificationCloseButton onClick={extra.close} /> }
    </Box>
}
