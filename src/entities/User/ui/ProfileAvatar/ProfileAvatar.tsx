import { FC } from 'react'

import s from './ProfileAvatar.module.scss'
import Icon from "@mdi/react";
import {mdiAccountOutline} from "@mdi/js";

interface IProps {
    avatar: string | null
    loading?: boolean
}
export const ProfileAvatar: FC<IProps> = ({
    loading,
    avatar
}) => {
    return <div className={s.profile_avatar}>
        { !avatar
            ? <Icon path={mdiAccountOutline} size={5} color={'white'}/>
            : <img className={s.profile_avatar} data-loading={loading} src={avatar || ''}/>
        }
    </div>
}
