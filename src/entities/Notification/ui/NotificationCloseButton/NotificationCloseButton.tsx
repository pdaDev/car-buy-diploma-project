import {FC, MouseEventHandler} from 'react'

import s from './NotificationCloseButton.module.scss'
import {closeSymbol} from "shared";

interface IProps {
    onClick: Function
}
export const NotificationCloseButton: FC<IProps> = ({
    onClick
}) => {
    return <div className={s.close_button}
                onClick={onClick as MouseEventHandler}
    >
        { closeSymbol }
    </div>
}
