import {FC, useState} from 'react'

import s from './CountSetter.module.scss'
import {Register} from "../../lib";
import {Stack} from "../Layout";
import {Label} from "../Label/Label";
import {Button} from "../Buttons";
import {IncrementAndDecrementButton} from "./IncrementAndDecrementButton";

interface IProps {
    max?: number
    min?: number
    value: number
    onChange?: (value: number) => void
    register?: Register
    title?: string
}

export const CountSetter: FC<IProps> = ({
                                            max,
                                            min,
                                            register,
                                            value,
                                            onChange,
                                            title,

                                        }) => {

    const onValueChange = (value: number) => {
        register ? register.onChange({target: {value, name: register.name}}) : onChange && onChange(value)
    }
    const increment = () => {
        onValueChange(value + 1)
    }
    const decrement = () => {
        onValueChange(value - 1)
    }
    return <Stack spacing={3}>
        <Label label={title} level={4} weight={'regular'}/>
        <Stack spacing={4} direction={'row'} size={'content'} hAlign={'start'}>
            <IncrementAndDecrementButton onClick={decrement}
                                         label={'-'}
                                         disabled={min !== undefined ? value === min : false}
            />
            <Label label={value}/>
            <IncrementAndDecrementButton onClick={increment}
                                         label={'+'}
                                         disabled={max !== undefined ? value === max : false}
            />
        </Stack>
    </Stack>
}
