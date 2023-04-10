import {Component, FC} from 'react'

import s from './DoubleInputRange.module.scss'
import styled from "styled-components";
import {Input} from "../Inputs";
import {Stack} from "../Layout";


interface IValue {
    placeholder?: string
    limit?: number
    currentValue: number
}

interface IProps {
    min: IValue
    max: IValue
    onChange: Function
}

export class DoubleInputRange extends Component<IProps> {
    render() {
        let {
            min: {
                placeholder: minValuePlaceholder,
                currentValue: minCurrentValue,
                limit: minValueLimit
            },
            max: {
                placeholder: maxValuePlaceholder,
                currentValue: maxCurrentValue,
                limit: maxValueLimit
            },
            onChange
        } = this.props;
        const changeMin = (value: string | number) => {
            if ((minValueLimit && Number(value) >= minValueLimit) || minValueLimit === undefined) {
                onChange([value, maxCurrentValue])
            }
        }

        const changeMax = (value: string | number) => {
            if ((maxValueLimit && Number(value) <= maxValueLimit) || maxValueLimit === undefined) {
                onChange([minCurrentValue, value])
            }
        }

        return <div className={s.wrapper}>
            <Stack direction={'row'}>
                <Input placeholder={minValuePlaceholder} type={'number'} onChange={changeMin as any}
                       value={minCurrentValue}/>
                <Input placeholder={maxValuePlaceholder} type={'number'} onChange={changeMax as any}
                       value={maxCurrentValue}/>
            </Stack>
        </div>;
    }
}
