import {Component, FC} from 'react'

import s from './DoubleInputRange.module.scss'
import styled from "styled-components";
import {Input, InputWrapper} from "../Inputs";
import {Stack} from "../Layout";
import {formatNumber} from "../../lib";


interface IValue {
    placeholder?: string
    limit?: number
    currentValue: number | null
}

interface IProps {
    min: IValue
    max: IValue
    title?: string
    onChange: Function
}

export class DoubleInputRange extends Component<IProps> {
    render() {
        let {
            min: {
                placeholder: minValuePlaceholder,
                currentValue: minCurrentValue,
                limit: minValueLimit = 0
            },
            max: {
                placeholder: maxValuePlaceholder,
                currentValue: maxCurrentValue,
                limit: maxValueLimit
            },
            onChange,
            title
        } = this.props;
        const changeMin = (value: number) => {
            console.log(value, minValueLimit)
            if ((minValueLimit !== undefined && value >= minValueLimit) || minValueLimit === undefined) {
                console.log(value, minValueLimit)
                onChange([value, maxCurrentValue])
            }
        }

        const changeMax = (value: number) => {
            if ((maxValueLimit !== undefined && value <= maxValueLimit) || maxValueLimit === undefined) {
                onChange([minCurrentValue, value])
            }
        }

        const parseStringToNumber = (value: string): number => {
            const str = value.replace(/[^\d\\.]/g, '')
            return +str
        }

        const formattedMinValue = minCurrentValue ? formatNumber(minCurrentValue) : ''
        const formattedMaxValue = maxCurrentValue ? formatNumber(maxCurrentValue) : ''


        return <InputWrapper title={title}>
            <div className={s.wrapper}>
                <Stack direction={'row'}>
                    <Input placeholder={minValuePlaceholder}
                           type={'text'}
                           onChange={value => changeMin(parseStringToNumber(value as string))}
                           value={formattedMinValue}/>
                    <Input placeholder={maxValuePlaceholder}
                           type={'text'}
                           onChange={value => changeMax(parseStringToNumber(value as string))}
                           value={formattedMaxValue}/>
                </Stack>

            </div>
        </InputWrapper>
    }
}
