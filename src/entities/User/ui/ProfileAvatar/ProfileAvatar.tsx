import { FC } from 'react'

import s from './ProfileAvatar.module.scss'
import Icon from "@mdi/react";
import {mdiAccountOutline} from "@mdi/js";

interface IProps {
    avatar: string | null
}
export const ProfileAvatar: FC<IProps> = ({
    avatar
}) => {
    return <div className={s.profile_avatar}>
        <Icon path={mdiAccountOutline} size={5} color={'white'}/>
    </div>
    // <img className={s.profile_avatar} src={avatar || ''}/>

}
