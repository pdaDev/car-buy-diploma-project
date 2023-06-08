import {FC, useState} from "react";

import {NS} from 'entities/Advertisement'
import {selectors as userSelectors} from 'entities/User'
import {Box, Container, formatPhoneNumber, Stack} from "../../../../shared";
import {UserBlock} from "../../../../shared/ui/User/UserBlock/UserBlock";
import s from './ContactWtihOwner.module.scss'
import {useTranslation} from "react-i18next";
import {useAppDispatch, useAppNavigate, useAppSelector} from "../../../../app/services";
import {PhoneNumberBlock} from "./PhoneNumberBlock";
import {useStartChat} from "../../../../entities/Chat";



export const ContactWithOwnerBlock: FC<Pick<NS.IServerAdvertisement, 'owner' | 'name' | 'advertisement_id'>> = (
    {
        owner,
        name,
        advertisement_id
    }) => {
    const {phone_number, email, ...user} = owner
    const {t} = useTranslation()

    const startChat = useStartChat('sell', owner, advertisement_id, name)



    return <div className={s.wrapper}>
        <Container pl={4} pt={3} pb={3}>
            <UserBlock user={user} withNavigate/>
        </Container>
        <button className={s.write_message} onClick={startChat.navigate}>
            {t("advertisement.write")}
        </button>
        <PhoneNumberBlock phoneNumber={phone_number}/>
    </div>
}
