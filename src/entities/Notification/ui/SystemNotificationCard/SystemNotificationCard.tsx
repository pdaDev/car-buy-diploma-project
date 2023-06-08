import {FC, MouseEventHandler} from "react";
import {addPrefix, closeSymbol, cn, Label, Text} from "shared";

import s from './SystemNotificationCard.module.scss'
import * as NS from '../../namespace'
import {NotificationCloseButton} from "../NotificationCloseButton/NotificationCloseButton";
interface IProps extends NS.ISystemNotification {
    extra?: NS.NotificationComponentExtra
}

export const SystemNotificationCard: FC<IProps> = ({
                                                       type,
                                                       message,
                                                       extra
                                                   }) => {
    return <div className={cn(s.notification_wrapper, addPrefix('type', type, s))}>
        <Text content={message} />
        {/*{ extra && extra.close && <NotificationCloseButton onClick={extra.close} /> }*/}
    </div>
}