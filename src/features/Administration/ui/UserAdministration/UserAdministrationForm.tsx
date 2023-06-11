import {FC, useEffect, useState} from "react";
import {useGetUsersQuery, usePatchUserStatusMutation} from "../../api";
import {
    Card,
    Container,
    debounce,
    Input, IOption,
    Label,
    List,
    Paginator,
    Stack, Switcher, useMultiLanguageHandbooks,
    usePaginationAndSorting
} from "shared";
import {UserCard} from "./UserCard";

import {CommonListForm} from "../CommonListForm";

import {useTranslation} from "react-i18next";


export const UserAdministrationForm: FC = () => {
    const [patch] = usePatchUserStatusMutation()

    const patchUser = async (status: 0 | 1, id: number) => {
        await patch({id, is_banned: status})
    }

    const { getHandbookOptions } = useMultiLanguageHandbooks()

    const banOptions: IOption[] = [
        { value: null, label: 'Все' }, { value: 0, label: 'Не забаненные' }, { value: 1, label: 'Забаненные' }
    ]
    const [banStatus, setBanStatus] = useState(null)
    const { t } = useTranslation()

    return (
     <>
        <Stack direction={'row'} spacing={4} hAlign={'start'}>
            <Label level={2}
                   weight={'medium'}
                   label={t('form.filter')}/>
            <Switcher options={banOptions}
                      activeOptions={banStatus}
                      onChange={setBanStatus}/>

        </Stack>
         <CommonListForm translationKey={'admin.user_management'}
                         useGetQuery={useGetUsersQuery}
                         withListCardWrapper={false}
                         extra={{ is_banned: banStatus }}

                         sortKeys={['first_name', 'last_name', 'id', 'date_joined', 'total_ads' ]}
                         renderListItem={(data, loading) => <UserCard data={data}
                                                                      onUserPatch={patchUser}
                                                                      loading={loading}/>
                         }
         />
     </>
    )

}

//'opened_ads', 'booked_ads', 'closed_ads'