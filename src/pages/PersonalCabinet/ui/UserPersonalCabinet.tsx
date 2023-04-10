import {FC} from "react";
import {selectors} from 'entities/User'
import {useAppSelector} from "../../../app/services";

import {ProfileUserCard} from "../../../entities/User/ui/ProfileUserCard/ProfileUserCard";

export const UserPersonalCabinet: FC = () => {
    const {id, isAdmin, data} = useAppSelector(selectors.selectCurrentUser)


    return <ProfileUserCard type={'owner'}
                            {...data}
    />
}