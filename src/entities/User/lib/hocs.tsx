import {Component, ComponentType, FC, useEffect} from "react";
import {useAppDispatch, useAppNavigate, useAppSelector} from "../../../app/services";
import {activateUser, authme} from "../model";
import {selectActiveStatus, selectBanStatus} from "../model/selectors";
import {Card, Container as UIContainer, Label, Stack, Text} from "../../../shared";
import {useTranslation} from "react-i18next";
import {useSearchParams} from "react-router-dom";
import {addSystemNotification} from "../../Notification";

export const withInitAuth = (Component: ComponentType) => {
    const Container: FC = (props) => {
        const d = useAppDispatch()
        useEffect(() => {
            d(authme())
        }, [])

        // d(addSystemNotification({ type: 'success', message: "Аккаунт успешно активирован" }))
        return <Component {...props} />
    }
    return Container
}


export const withActivation = (Component: ComponentType) => {
    const Container: FC = (props) => {
        const isActive = useAppSelector(selectActiveStatus)
        const d = useAppDispatch()
        const [query] = useSearchParams()
        const activated = Boolean(query.get('activated')) || false
        useEffect(() => {
            if (isActive && activated) {
                d(addSystemNotification({ type: 'success', message: "Аккаунт успешно активирован" }))
            }
        }, [isActive, activated])

        return <Component />
    }

    return Container
}

export const withBan = (Component: ComponentType) => {
    const Container: FC = (props) => {
        const isBanned = useAppSelector(selectBanStatus)
        const authStatus = useAppSelector(selectActiveStatus)
        const { t } = useTranslation()

        if (authStatus && isBanned) {
            return <UIContainer contentAlign={'center'}>
                <Card paddings={4} width={'400px'}>
                    <Stack size={'width'} spacing={4}>
                        <Label label={t("banned.title")}
                               level={1}
                               weight={'medium'}
                        />
                        <Text size={3}
                              weight={'regular'}
                              content={t("banned.message")}
                        />
                    </Stack>
                </Card>
            </UIContainer>
        }

        return <Component />
    }

    return Container
}