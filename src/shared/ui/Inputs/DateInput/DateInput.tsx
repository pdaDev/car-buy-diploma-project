import {FC, useState} from 'react'

import s from './DateInput.module.scss'
import {useBlurFocus} from "../../../lib";
import {ElementSize} from "../../../types";
import {Calendar, ICalendar, IDates} from "./Calendar";

export interface IProps extends Pick<ICalendar, 'type' | 'closeBehavior' | 'saveBehavior'> {
    size?: ElementSize
    value: Date | IDates | null
    onChange: Function
}

export const DateInput: FC<IProps> = ({
                                          value,
                                          onChange,
                                          size= 'medium',
                                          type,
                                          closeBehavior,
                                          saveBehavior
                                      }) => {
    const [isCalendarShow, setCalendarShowStatus] = useState<boolean>()
    const {onBlur, onFocus} = useBlurFocus(() => closeBehavior === 'blur' && setCalendarShowStatus(false))
    const closeCalendar = () => setCalendarShowStatus(false)
    const toggleCalendarStatus = () => setCalendarShowStatus(!isCalendarShow)
    return <div className={s.date_input_wrapper}
                onFocus={onFocus}
                onBlur={onBlur}
                tabIndex={0}
    >
        <div className={s.current_value_wrapper} onClick={toggleCalendarStatus}>
            {
                type === 'range' ? (
                    <>
                        <div className={s.symbol_wrapper}>
                            c
                        </div>
                        { (value as IDates).sinceDate }
                        <div className={s.symbol_wrapper}>
                            по
                        </div>
                        { (value as IDates).toDate }
                    </>
                ) : (value as Date)?.toLocaleDateString()
            }
        </div>
        <div className={s.calendar_wrapper}>
            {isCalendarShow && <Calendar type={type}
                                         closeBehavior={closeBehavior}
                                         saveBehavior={saveBehavior}
                                         setDate={onChange}
                                         close={closeCalendar}
            />}
        </div>
    </div>
}
