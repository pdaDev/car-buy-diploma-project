import React, {FC} from "react";
import s from './ManagementPanel.module.scss'
import {useTranslation} from "react-i18next";
import Icon from "@mdi/react";
import {Stack, Tooltip} from "shared";
import * as NS from '../../namespace'


interface IProps {
    controls: NS.IControl[]
    isLoading: boolean
}
export const ManagementPanel: FC<IProps> = ({ controls, isLoading }) => {
    const { t } = useTranslation()

    const renderIconButton = (icon: any, handleClick: Function, title: string) => {
        const onButtonClick = (e: React.MouseEvent) => {
            e.stopPropagation()
            if (!isLoading) {
                handleClick()
            }
        }
        return <div tabIndex={0}
                    onClick={onButtonClick}
                    className={s.icon_button}>
            <Tooltip text={t(title) as string} time={1000} position={'right'}>
                <Icon path={icon} size={1} />
            </Tooltip>
        </div>
    }

    return <div className={s.management_panel}>
        <Stack spacing={3} vAlign={'center'}>
            { controls.map(control => renderIconButton(control.icon, control.onClick, control.title)) }
        </Stack>
    </div>
}