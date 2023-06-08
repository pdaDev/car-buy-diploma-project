import React, {FC, ReactNode} from 'react'

import s from './Form.module.scss'
import {Stack} from "../Layout";
import {RenderFormLine} from "../../../widgets/ReviewCreateForm/ui/RenderFormLine";
import {Input} from "../Inputs";
import {validators} from "../../../widgets/ReviewCreateForm/lib/validators";
import {TextArea} from "../TextArea/TextArea";
import {ReviewSetScore} from "../../../features/ReviewSetScore";
import {LoadImages} from "../LoadImages/LoadImages";
import {Button} from "../Buttons";

interface IProps {
    onSubmit: Function
    controls: ReactNode[]
    children: ReactNode
}

export const Form: FC<IProps> = ({
                                     onSubmit,
                                     children,
                                     controls
                                 }) => {
    return <form onSubmit={onSubmit as any} className={s.form}>
        <Stack spacing={4} size={'width'}>
            {children}
            <Stack spacing={4} size={'container'}>
                <Stack size={'container'} hAlign={'end'}>
                    <Stack direction={'row'} spacing={4}>
                        {controls}
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    </form>
}
