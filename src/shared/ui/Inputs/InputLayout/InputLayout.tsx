import {FC, ReactNode} from 'react'

import s from './InputLayout.module.scss'
import {ChangeHandler} from "react-hook-form";
import {ElementSize, ElementWidth} from "../../../types";
import {addPrefix, cn} from "../../../lib";
import {InputWrapper} from "../InputWrapper/InputWrapper";
import {Label} from "../../Label/Label";

export interface IBaseInputProps {
    error?: string
    width?: ElementWidth
    size?: ElementSize
    placeholder?: string
    textAlign?: 'center' | 'start' | 'end'
    title?: string
}

interface IProps extends IBaseInputProps {
    children: ReactNode
}

export const InputLayout: FC<IProps> = ({
                                            error,
                                            title,
                                            width = 'full',
                                            children,
                                            size = 'medium'
                                        }) => {
    return <InputWrapper title={title} error={error}>
        <div className={cn(
            s.input_wrapper,
            addPrefix('width', width, s),
            addPrefix('size', size, s),
            error && s.has_error
        )}>
            {children}
        </div>
    </InputWrapper>
}
