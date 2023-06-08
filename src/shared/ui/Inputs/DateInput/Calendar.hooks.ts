import {useEffect, useRef, useState} from "react";
import {useForceUpdate} from "../../../lib";


export const useCalendar = (isEngLanguage: boolean) => {

    const date = useRef(new Date())
    const render = useForceUpdate()
    const getCountOfDays = (month: number) => {
        if ([0, 2, 4, 6, 7, 9, 11].includes(month)) {
            return 31
        }
        if ([3, 5, 8, 10].includes(month)) {
            return 30
        }
        if (month === 1) {
            return (date.current.getFullYear() - 1972) % 4 === 0 ? 29 : 28
        }
    }
    let dayOfWeekMonthStart = new Date(date.current.getFullYear(), date.current.getMonth()).getDay() - (isEngLanguage ? 0 : 1)
    dayOfWeekMonthStart = dayOfWeekMonthStart > 0 ? dayOfWeekMonthStart : 6

    const countOfDaysPsttMonth = getCountOfDays(new Date(date.current.getFullYear(), date.current.getMonth() - 1).getMonth())
    const daysOfPastMonth = Array.apply(null, new Array(dayOfWeekMonthStart)).map((x, i) => countOfDaysPsttMonth! - i).reverse()
    const upMonth = () => {
        date.current.setMonth(date.current.getMonth() + 1)
        render()
    }
    const downMonth = () => {
        date.current.setMonth(date.current.getMonth() - 1)
        render()
    }

    const setYear = (year: number) => {
        date.current.setFullYear(year)
        render()
    }
    return {
        setYear,
        date: date.current,
        upMonth,
        downMonth,
        countOfMonthDays: getCountOfDays(date.current.getMonth()),
        daysOfPastMonth,
        dayOfWeekMonthStart
    }
}

export const useSelectDate = (
    date: Date,
    defaultDates?: { sinceDate: Date, toDate: Date },
    defaultChangeStatus?: 'sinceDate' | 'toDate'
) => {
    const dates = useRef(defaultDates || {
        sinceDate: new Date(),
        toDate: new Date()
    }
    )
    const [changeStatus, setChangeStatus] = useState<'sinceDate' | 'toDate'>(defaultChangeStatus || 'toDate')
    useEffect(() => {
        defaultChangeStatus && setChangeStatus(defaultChangeStatus)
    }, [defaultChangeStatus])
    const render = useForceUpdate()
    const setToChangeStatus = () => setChangeStatus('toDate')
    const setSinceChangeStatus = () => setChangeStatus('sinceDate')
    const selectDate = (day: number, month: number, year: number) => {
        dates.current[changeStatus].setDate(day)
        dates.current[changeStatus].setMonth(month)
        dates.current[changeStatus].setFullYear(year)
        render()
    }
    return {dates, setToChangeStatus, setSinceChangeStatus, selectDate, changeStatus}
}