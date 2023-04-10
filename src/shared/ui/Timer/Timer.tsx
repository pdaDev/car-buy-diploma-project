import {FC, useEffect, useRef, useState} from 'react'

import s from './Timer.module.scss'
import {F} from "@storybook/react-webpack5/dist/types-6a41b796";
import {getPercents} from "../../lib";

interface IProps {
    countOfSec: number
    active: boolean
    onStart?: Function
    onFinish?: Function
    onPause?: Function
    onPlay?: Function
}

export const Timer: FC<IProps> = ({
                                      countOfSec,
                                      active,
                                      onPause,
                                      onStart,
                                      onFinish,
                                      onPlay
                                  }) => {

    const [timer, setTimer] = useState(countOfSec)
    const hours = Math.floor(timer / 3600)
    const minutes = Math.floor((timer - hours * 3600) / 60)
    const seconds = timer - hours * 3600 - minutes * 60
    const getTime = (time: number) => time.toString().padStart(2, '0')
    const interval = useRef<any>(0)

    useEffect(() => {
        if (active) {
            onPlay && onPlay()
            interval.current = setInterval(() => setTimer(t => t - 1), 1000)
        } else {
            onPause && onPause()
        }
        return () => {
            clearInterval(interval.current)
        }
    }, [active])

    useEffect(() => {
        if (active) {
            if (timer === countOfSec) {
                onStart && onStart()
            }
            if (timer === 0) {
                clearInterval(interval.current)
                onFinish && onFinish()
            }
        }
    }, [timer, active])
    return <div className={s.timer_wrapper}>
        <div className={s.timer_value_wrapper}>
            {getTime(hours)}:{getTime(minutes)}:{getTime(seconds)}
        </div>
        <div className={s.timer_line}>
            <div className={s.timer} style={{width: getPercents(100 - (timer / countOfSec) * 100)}}/>
        </div>
    </div>
}
