import React, {FC, MouseEventHandler} from "react";
import s from './BaseSearch.module.scss'
import {Image} from 'shared'

interface IProps {
    name: string;
    selected: boolean;
    logo: string | null
    onClick: MouseEventHandler<HTMLDivElement>
}

export const BrendItem: FC<IProps> = ({
                                          name,
                                          logo,
                                          selected,
                                          onClick

                                      }) => {
    return <div onClick={onClick} className={s.brend_item}>
        {logo
            ? <Image src={logo}
                     fit={'contain'}
                     alt={'logo'}
                     width={'52px'}
                     height={'52px'}
            />
            : <div className={s.brend_logo}/>}
        <div className={s.brend_title} data-selected={selected}>
            {name}
        </div>
    </div>

}