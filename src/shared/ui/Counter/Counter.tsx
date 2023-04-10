import { FC } from 'react'

import s from './Counter.module.scss'
import {addPrefix, cn} from "../../lib";

interface IProps {
    total: number;
    current: number;
    size?: 'small' | 'medium' | 'large'
    onChange?: (page: number) => void
}
export const Counter: FC<IProps> = ({
    total,
    current,
    size = 'medium',
    onChange
}) => {

    return <div className={s.counter}>
        { [...new Array(total)].map((x, i) => (
            <div className={cn(s.el,  addPrefix('size', size, s), current === i && s.active)}
                 onClick={() => onChange && onChange(i)}
                 key={i}
            />)) }
    </div>
}
