import {FC} from "react";

import {NS} from 'entities/Advertisement'
import { Container, UserBlock} from "shared";
import s from './ContactWtihOwner.module.scss'
import {useTranslation} from "react-i18next";
import {PhoneNumberBlock} from "./PhoneNumberBlock";
import {useStartChat} from "entities/Chat";

interface IProps {
    loading?: boolean
}


export const ContactWithOwnerBlock: FC<IProps & Partial<Pick<NS.IServerAdvertisement, 'name' | 'owner' | 'advertisement_id'>>> = (
    {
        owner,
        name,
        loading,
        advertisement_id
    }) => {
    const {t} = useTranslation()
    const startChat = useStartChat('sell', owner, advertisement_id, name)

    const startChatWithUser = () => {
        if (!loading && advertisement_id) {
            startChat.navigate()
        }
    }


    return <div className={s.wrapper}>
        <Container pl={4} pt={3} pb={3}>
            <UserBlock user={owner || null} loading={loading} withNavigate/>
        </Container>
        { !loading &&  <button className={s.write_message} data-loading={loading} onClick={startChatWithUser}>
            {t("advertisement.write")}
        </button>}
        { !loading && <PhoneNumberBlock phoneNumber={owner?.phone_number}/> }
    </div>
}
