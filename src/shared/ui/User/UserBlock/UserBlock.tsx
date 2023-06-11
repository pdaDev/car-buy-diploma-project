import {FC} from "react";
import {UserAvatar} from "../UserAvatar/UserAvatar";
import {UserNickname} from "../UserNickname/UserNickname";
import {Stack} from "../../Layout";
import {ElementSize, IUserCommonData, UserNicknameType} from "../../../types";
import {useAppNavigate} from "app/services";


interface IProps {
    size?: ElementSize
    loading?: boolean
    user: Partial<IUserCommonData> | null
    withNavigate?: boolean
    nameRenderType?: UserNicknameType
}
export const UserBlock: FC<IProps> = ({
    size = 'small',
    loading,
    user,
    withNavigate = false,
    nameRenderType
                                      }) => {
    const n = useAppNavigate()
    const onUserBlockClick = () => {
        if (withNavigate && user) {
            n(p => p.user._key_(user.id))
        }
    }
    const loadingStatus = loading ?? !user
    return <Stack spacing={3} direction={'row'} vAlign={'center'} onClick={onUserBlockClick}>
        <UserAvatar avatar={user?.avatar || null}
                    loading={loadingStatus}/>
        <UserNickname first_name={user?.first_name}
                      last_name={user?.last_name}
                      type={nameRenderType}
                      loading={loadingStatus} />
    </Stack>
}