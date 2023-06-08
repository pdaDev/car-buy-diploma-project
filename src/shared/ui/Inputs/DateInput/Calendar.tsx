import {FC, MouseEventHandler, useEffect, useRef} from "react";
import s from './DateInput.module.scss'
import {useCalendar, useSelectDate} from './Calendar.hooks'
import {Button, Label, ArrowButton, Symbol, Text} from '../../index'
import {cn} from "../../../lib";
import {Selector} from "../../Selector/Selector";
import './Calendar.scss'


export interface IDates {
    sinceDate: Date
    toDate: Date
}

export interface ICalendar {
    setDate: Function
    close: () => void
    defaultDates?: IDates | Date
    defaultChangeStatus?: 'sinceDate' | 'toDate'
    type?: 'single' | 'range'
    local?: 'rus' | 'eng'
    min?: Date | 'today'
    max?: Date | 'today'
    saveBehavior?: 'select' | 'button'
    closeBehavior?: 'button' | 'blur'

}

export const Calendar: FC<ICalendar> = ({
                                            setDate,
                                            defaultDates,
                                            defaultChangeStatus,
                                            close,
                                            type = 'single',
                                            max,
                                            min,
                                            local = 'rus',
                                            saveBehavior = 'select',
                                            closeBehavior = 'blur'
                                        }) => {
    const currentDate = new Date()
    const timer = useRef(0)

    const isEngLanguage = local === 'eng'

    const daysOfWeekEngFormat = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
    const daysOfWeekRuFormat = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']
    const monthsNames = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь']
    const monthsNamesEngFormat = ['january', 'february', 'march', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']
    const {
        date,
        setYear,
        upMonth,
        downMonth,
        countOfMonthDays,
        daysOfPastMonth,
    } = useCalendar(isEngLanguage)

    const defDate = type === "range" ? defaultDates as IDates : {
        sinceDate: new Date(),
        toDate: (defaultDates || new Date()) as Date
    }
    const {
        dates,
        setSinceChangeStatus,
        setToChangeStatus,
        selectDate,
        changeStatus
    } = useSelectDate(date, defDate, type === 'single' ? 'toDate' : defaultChangeStatus)
    const isCurrentDay = (day: number, month: number, year: number) => currentDate.getFullYear() === year &&
        currentDate.getMonth() === month && day === currentDate.getDate()
    const isSelectedDay = (day: number, month: number, year: number) => ((dates.current.sinceDate.getFullYear() === year &&
            dates.current.sinceDate.getMonth() === month && dates.current.sinceDate.getDate() === day) && type === 'range')
        || (dates.current.toDate.getFullYear() === year &&
            dates.current.toDate.getMonth() === month && dates.current.toDate.getDate() === day)
    const isStartOfWeek = (i: number) => (i) % 7 === 0
    const isEndOfWeek = (i: number) => (i + 8) % 7 === 0
    const isStartOfRange = (day: number, month: number, year: number) => dates.current.sinceDate.getFullYear() === year
        && month === dates.current.sinceDate.getMonth() && day === dates.current.sinceDate.getDate()
    const isEndOfRange = (day: number, month: number, year: number) => dates.current.toDate.getFullYear() === year
        && month === dates.current.toDate.getMonth() && day === dates.current.toDate.getDate()
    const isEnterOfRange = (day: number, month: number, year: number, range: (Date | undefined)[]) => {
        const startDate = range[0]
        const endDate = range[1]
        if ((startDate ? year >= startDate.getFullYear() : true) && (endDate ? year <= endDate.getFullYear() : true)) {
            if ((startDate ? month >= startDate.getMonth() : true) && (endDate ? month <= endDate.getMonth() : true)) {
                const isStartMonth = startDate ? month === startDate.getMonth() : true
                const isEndMonth = endDate ? month === endDate.getMonth() : true
                const isLeftDay = startDate ? day >= startDate.getDate() : true
                const isRightDay = endDate ? day <= endDate.getDate() : true

                if (isStartMonth && isEndMonth) {
                    return isLeftDay && isRightDay;
                }
                if (isStartMonth) {
                    return isLeftDay;
                }
                if (isEndMonth) {
                    return isRightDay;
                }
                return true
            }
        }
        return false

    }
    const isAvailableToSubmit = type === 'range' ? dates.current.toDate.getTime() < dates.current.sinceDate.getTime() : true
    const submit = () => {
        setDate(type === 'range' ? dates.current : dates.current.toDate)
    }

    const daysOfCurrentMonth = [...new Array(countOfMonthDays)].map((_, i) => i + 1)
    const daysOfNextMonth = [...new Array(42 - countOfMonthDays! - daysOfPastMonth.length)]
        .map((_, i) => i + 1)

    const previousYear = date.getMonth() === 0 ? date.getFullYear() - 1 : date.getFullYear()
    const nextYear = date.getMonth() === 11 ? date.getFullYear() + 1 : date.getFullYear()
    const previousMonth = date.getMonth() === 0 ? 11 : date.getMonth() - 1
    const nextMonth = date.getMonth() === 11 ? 0 : date.getMonth() + 1
    const getMinMaxDate = (d?: Date | 'today') => d === 'today' ? new Date() : d

    const printNumbers = (numbers: number[], month: number, year: number, style: any, startIndex: number) => {
        return numbers.map((x, i) => {

                const isInNotDisabledRange = isEnterOfRange(x, month, year, [getMinMaxDate(min), getMinMaxDate(max)])
                const onNumberClick: MouseEventHandler = () => {
                    if (isInNotDisabledRange) {
                        selectDate(x, month, year)

                        if (type === 'single' && saveBehavior === 'select') {
                            setTimeout(() => close(), 200)
                        }
                        if (saveBehavior === 'select') {
                            submit()
                        }
                    }
                }
                return (
                    <div
                        className={cn(
                            style,
                            isCurrentDay(x, month, year) && s.current_day,
                            isSelectedDay(x, month, year) && s.active,
                            type === 'range' && isEnterOfRange(x, month, year, [dates.current.sinceDate, dates.current.toDate]) && s.sub_active,
                            type === 'range' && !isEndOfWeek(i + startIndex) && !isEndOfRange(x, month, year) && i + startIndex !== 41 && s.right_with_no_border,
                            type === 'range' && !isStartOfWeek(i + startIndex) && !isStartOfRange(x, month, year) && i + startIndex !== 0 && s.left_with_no_border,
                            !isInNotDisabledRange && s.click_disabled
                        )}
                        onClick={onNumberClick}>
                        {x}
                    </div>
                )
            }
        )
    }


    const onBlur = () => {
        if (closeBehavior === 'blur') {
            timer.current = setTimeout(close, 10) as any
        }
    }

    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (ref.current) {
            ref.current.focus()
        }
    }, [ref])

    const minYear = min ? min === 'today' ? new Date().getFullYear() : min.getFullYear() : 1880
    const calendarOptions = [...new Array(new Date().getFullYear() - minYear)].map((_, i) => ({
        value: (minYear + i + 1),
        label: (minYear + i + 1).toString()
    })).reverse()

    const onSelectYear = (value: number) => {
        setYear(value)
        // @ts-ignore
        ref?.current.focus()
    }

    const onFocus = () => {
        clearTimeout(timer.current)
    }

    console.log(date.getFullYear())


    return <div className={s.calendar}
                tabIndex={0}
                ref={ref}
                onFocus={onFocus}
                onBlur={onBlur}>
        <div className={s.legend}>
            {calendarOptions.length === 1
                ? <Label label={date.getFullYear()} level={3} weight={'medium'}/>
                : <Selector options={calendarOptions}
                            onChange={onSelectYear}
                            current={date.getFullYear()}
                            classNamePrefix={'calendar'}
                />
            }

            <div className={s.navigation_block}>
                <ArrowButton direction={"left"} size={"small"} onClick={downMonth}/>
                <Text content={(isEngLanguage ? monthsNamesEngFormat : monthsNames)[date.getMonth()]}
                      weight={'medium'}
                      size={4}
                />
                <ArrowButton direction={"right"} size={"small"} onClick={upMonth}/>
            </div>
        </div>
        <div className={s.grid}>
            {(isEngLanguage ? daysOfWeekEngFormat : daysOfWeekRuFormat)
                .map(day => <div className={s.primary_el} key={day}>{day}</div>)}
            {printNumbers(daysOfPastMonth, previousMonth, previousYear, s.secondary_el, 0)}
            {printNumbers(daysOfCurrentMonth, date.getMonth(), date.getFullYear(), s.primary_el, daysOfPastMonth.length)}
            {printNumbers(daysOfNextMonth, nextMonth, nextYear, s.secondary_el, daysOfPastMonth.length + daysOfCurrentMonth.length)}
        </div>
        <div className={s.output}
             style={{marginBottom: (closeBehavior === 'button' || saveBehavior === 'button') ? 10 : 0}}>
            {type === 'range' &&
                <>
                    <div onClick={setSinceChangeStatus} className={`${changeStatus === 'sinceDate' && s.active}`}>
                        <Label level={5} label={'c'} color={'primary'}/>
                        &nbsp;
                        <Label level={5} label={dates.current.sinceDate.toLocaleDateString()}/>
                    </div>
                    <div onClick={setToChangeStatus} className={`${changeStatus === 'toDate' && s.active}`}>
                        <Label level={5} label={'по'} color={'primary'}/>
                        &nbsp;
                        <Label level={5}
                               label={dates.current.toDate.toLocaleDateString()}
                        />
                    </div>
                </>
            }

        </div>
        {
            (closeBehavior === 'button' || saveBehavior === 'button') && <div className={s.buttons_block}>
                {
                    closeBehavior === 'button' && <Button type={'secondary'}
                                                          label={'отменить'}
                                                          size={"small"}
                                                          width={'full'}
                                                          onClick={close}
                    />
                }
                {
                    saveBehavior === 'button' && <Button type={"primary"}
                                                         label={'принять'}
                                                         size={"small"}
                                                         width={'full'}
                                                         onClick={submit}
                                                         disabled={isAvailableToSubmit}
                    />
                }
            </div>
        }
    </div>
}
