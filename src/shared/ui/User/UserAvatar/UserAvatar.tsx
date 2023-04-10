import { FC } from 'react'

import s from './UserAvatar.module.scss'
import {addPrefix, cn, ElementSize} from "../../../index";
import {Simulate} from "react-dom/test-utils";
import load = Simulate.load;

interface IProps {
    size?: ElementSize
    avatar: string | null
    loading?: boolean
}
export const UserAvatar: FC<IProps> = ({
    avatar ,
    loading,
    size= 'medium',
}) => {
    return <div className={cn(s.user_avatar, addPrefix('size', size, s))} data-loading={loading}>
        { avatar && <img src={avatar} /> }
    </div>
}
