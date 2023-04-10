import {FC, useState} from "react";

import {NS} from 'entities/Advertisement'
import {selectors as userSelectors} from 'entities/User'
import {Box, Container, Stack} from "../../../../shared";
import {UserBlock} from "../../../../shared/ui/User/UserBlock/UserBlock";
import s from './ContactWtihOwner.module.scss'
import {useTranslation} from "react-i18next";
import {useAppDispatch, useAppSelector} from "../../../../app/services";
import {openModal} from "../../../../app/services/withPopupProvider";


export const ContactWithOwnerBlock: FC<Partial<NS.IServerAdvertisement['owner']>> = (props) => {
    const {phone_number, email, ...user} = props
    const {t} = useTranslation()
    const authStatus = useAppSelector(userSelectors.selectAuthStatus)
    const d = useAppDispatch()
    const [visiblePhoneNumber, setVisiblePhoneNumber] = useState(false)
    const goToLogin = () => d(openModal({key: "auth"}))
    const showPhoneNumber = () => {
        if (authStatus) {
            setVisiblePhoneNumber(true)
        } else {
            goToLogin()
        }
    }

    const writeMessage = () => {

    }

    return <div className={s.wrapper}>
        <Container pl={4} pt={3} pb={3}>
            <UserBlock user={user} withNavigate />
        </Container>
        <button className={s.write_message} onClick={writeMessage}>
            {t("advertisement.write")}
        </button>
        {phone_number && <button className={s.phone_number_wrapper}
                              onClick={showPhoneNumber}>
            {visiblePhoneNumber ? phone_number : t("advertisement.show_phone_number")}
        </button>}

    </div>
}
