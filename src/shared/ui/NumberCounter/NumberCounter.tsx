import { FC } from 'react'

import s from './NumberCounter.module.scss'

interface IProps {
    total: number
    current: number
}
export const NumberCounter: FC<IProps> = ({
    total,
    current
}) => {
    return <div className={s.number_counter}>
        <div className={s.current_wrapper}>
            { current }
        </div>
        <div className={s.total_wrapper}>
            { total }
        </div>
    </div>
}
