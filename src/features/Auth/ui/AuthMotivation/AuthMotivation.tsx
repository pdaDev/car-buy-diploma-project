import React, {FC, ReactNode} from "react";
import {MotivationBlock} from "shared";
import {useAuthorize} from "entities/User/lib/hooks";
import {useTranslation} from "react-i18next";
import {selectInitializedStatus, useAppSelector} from "app/services";


interface IProps {
    children?: ReactNode,
    translationKey: string
    fullWidth?: boolean
    fullHeight?: boolean
    withTopMargin?: boolean
    withoutShadow?: boolean
}

export const AuthMotivation: FC<IProps> = ({
                                               children,
                                               translationKey,
                                               withoutShadow,
                                               withTopMargin,
                                               fullHeight,
                                               fullWidth = false
}) => {
    const {authWithoutActiveStatus: authStatus, authorize, activeStatus} = useAuthorize()
    const initStatus = useAppSelector(selectInitializedStatus)
    const {t} = useTranslation()
    const motivationTittle = !activeStatus && authStatus
        ? t("motivate.user.activation.title")
        :  undefined
    const motivationMessage = !activeStatus && authStatus
        ? t("motivate.user.activation.message")
        : t(`motivate.${translationKey}.authorize.message`)
    const motivationButtonLabel = !authStatus
        ? t(`motivate.garage.authorize.button`)
        : undefined
    if ((!authStatus || !activeStatus) && initStatus) {
        return <MotivationBlock handleAction={!authStatus ? authorize : undefined}
                                buttonLabel={motivationButtonLabel}
                                withTopMargin={withTopMargin}
                                title={motivationTittle}
                                withoutShadow={withoutShadow}
                                fullHeight={fullHeight}
                                fullWidth={fullWidth}
                                message={motivationMessage}
        />
    }
    return <>{children}</>
}