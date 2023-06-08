import { FC } from 'react'

import s from './Price.module.scss'
import {Label} from "../Label/Label";
import {formatPrice} from "../../lib";
import {Symbol} from "../Symbol/Symbol";

interface IProps {
    price: number | null | undefined
}
export const Price: FC<IProps> = ({
    price
}) => {

    if (price) {
        return <div className={s.price}>
            <Symbol content={formatPrice(price || 0)} size={3} color={'fnt-black'} weight={'medium'}/>
        </div>
    }

    return <></>
}
