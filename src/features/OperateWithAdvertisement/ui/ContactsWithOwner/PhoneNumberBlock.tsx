import {FC, useState} from "react";
import s from "./ContactWtihOwner.module.scss";
import {formatPhoneNumber} from "../../../../shared";
import {useAppDispatch, useAppSelector} from "../../../../app/services";
import {selectors as userSelectors} from "../../../../entities/User";
import {openModal} from "../../../../app/services/withPopupProvider";
import {useTranslation} from "react-i18next";
import {useAuthorize} from "../../../../entities/User/lib/hooks";

interface IProps {
    phoneNumber: string | null | undefined
}
export const PhoneNumberBlock: FC<IProps> = ({ phoneNumber }) => {
    const { authStatus, authorize: goToLogin } = useAuthorize()
    const [visiblePhoneNumber, setVisiblePhoneNumber] = useState(false)
    const showPhoneNumber = () => {
        if (authStatus) {
            setVisiblePhoneNumber(true)
        } else {
            goToLogin()
        }
    }
    const { t } = useTranslation()
    if (phoneNumber)
        return <button className={s.phone_number_wrapper}
                       onClick={showPhoneNumber}>
            {visiblePhoneNumber
                ? formatPhoneNumber(phoneNumber)
                : t("advertisement.show_phone_number")}
        </button>
    return <></>
}