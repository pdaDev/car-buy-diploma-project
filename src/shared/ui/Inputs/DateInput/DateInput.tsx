import {FC, useEffect, useState} from 'react'

import s from './DateInput.module.scss'
import {Register, useBlurFocus} from "../../../lib";
import {ElementSize} from "../../../types";
import {Calendar, ICalendar, IDates} from "./Calendar";
import {Label} from "../../Label/Label";
import {InputWrapper} from "../InputWrapper/InputWrapper";
import {InputLayout} from "../InputLayout/InputLayout";

export interface IProps extends Pick<ICalendar, 'type' | 'closeBehavior' | 'saveBehavior'> {
    size?: ElementSize
    value?: Date | IDates | null | string
    error?: string
    title?: string
    onChange?: Function
    register?: Register
}

export const DateInput: FC<IProps> = ({
                                          value,
                                          title,
                                          onChange,
                                          register,
                                          size = 'medium',
                                          type = 'single',
                                          closeBehavior,
                                          saveBehavior,
                                          error
                                      }) => {
    const [isCalendarShow, setCalendarShowStatus] = useState<boolean>()
    const [selfValue, setSelfValue] = useState<Date | null>(null)
    const {onBlur, onFocus} = useBlurFocus(() => closeBehavior === 'blur' && setCalendarShowStatus(false))
    const calendarType = register ? 'single' : type

    const changeHandler = (value: Date | IDates) => {
        if (register) {
            setSelfValue(value as Date)
            const date = value as Date

            register.onChange({target: {value: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`, name: register.name}})
        } else {
            onChange && onChange(value)
        }
    }


    useEffect(() => {
        if (value && register) {
            setSelfValue(new Date())
        }
    }, [value, register])
    const closeCalendar = () => setCalendarShowStatus(false)
    const toggleCalendarStatus = () => setCalendarShowStatus(!isCalendarShow)
    return <div className={s.date_input_wrapper}
                onFocus={onFocus}
                onBlur={onBlur}
                tabIndex={0}
    >
        <InputWrapper title={title} error={error}>
            <div className={s.current_value_wrapper} onClick={toggleCalendarStatus}>
                {
                    register
                        ? selfValue ? selfValue.toLocaleDateString() : 'не выбрано'
                        : type === 'range' ? (
                            <>
                                <div className={s.symbol_wrapper}>
                                    self
                                </div>
                                {(value as IDates).sinceDate}
                                <div className={s.symbol_wrapper}>
                                    по
                                </div>
                                {(value as IDates).toDate}
                            </>
                        ) : (value as Date)?.toLocaleDateString()
                }
            </div>

        </InputWrapper>
        <div className={s.calendar_wrapper}>
            {isCalendarShow && <Calendar type={calendarType}
                                         defaultDates={register ? selfValue || undefined : undefined}
                                         closeBehavior={closeBehavior}
                                         saveBehavior={saveBehavior}
                                         setDate={changeHandler}
                                         close={closeCalendar}
            />}
        </div>
    </div>
}
