import {FC} from "react";
import {selectors} from 'entities/User'
import {useAppSelector} from "../../../app/services";

import {ProfileUserCard} from "../../../entities/User/ui/ProfileUserCard/ProfileUserCard";
import {
    Card,
    Clickable,
    Container,
    Input,
    Stack,
    Tooltip,
    useNavigationPermission,
    useQueryParamsFormMode
} from "../../../shared";
import Icon from "@mdi/react";
import {mdiPencil} from "@mdi/js/commonjs/mdi";
import {ProfileEditForm} from "../../../features/ProfileEditForm/ui/ProfileEditForm";

export const UserPersonalCabinet: FC = () => {
    const {id, isAdmin, data} = useAppSelector(selectors.selectCurrentUser)
    const {setEditMode, setViewMode, isEditMode} = useQueryParamsFormMode()
    useNavigationPermission(['authorized'])

    return <Container max_w={'800px'}>
        <Stack size={'container'} spacing={4} hAlign={"center"} vAlign={'start'}>
            {isEditMode
                ? <ProfileEditForm setViewMode={setViewMode}
                                   initialData={data}
                />
                : <ProfileUserCard type={'owner'}
                                   editButton={<Tooltip text={'редактировать профиль'}
                                                        position={"right"}
                                                        time={1000}
                                   >
                                       <Clickable onClick={setEditMode}>
                                           <Icon path={mdiPencil} size={1} color={'black'}/>
                                       </Clickable>
                                   </Tooltip>}
                                   {...data}
                />}
        </Stack>
    </Container>

}