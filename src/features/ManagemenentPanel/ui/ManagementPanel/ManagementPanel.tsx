import React, {FC, MouseEventHandler} from "react";
import s from './ManagementPanel.module.scss'
import {useTranslation} from "react-i18next";
import Icon from "@mdi/react";
import {Stack} from "../../../../shared";
import * as NS from '../../namespace'


interface IProps {
    controls: NS.IControl[]
}
export const ManagementPanel: FC<IProps> = ({ controls }) => {
    const { t } = useTranslation()
    const renderIconButton = (icon: any, handleClick: Function, title: string) => {
        return <div tabIndex={0}
                    onClick={handleClick as MouseEventHandler}
                    title={t(title) as string}
                    className={s.icon_button}>
            <Icon path={icon} size={1} />
        </div>
    }

    return <div className={s.management_panel}>
        <Stack spacing={3}>
            { controls.map(control => renderIconButton(control.icon, control.onClick, control.title)) }
        </Stack>
    </div>
}