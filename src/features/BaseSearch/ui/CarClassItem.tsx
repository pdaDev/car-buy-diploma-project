import {FC, MouseEventHandler} from "react";

import s from './BaseSearch.module.scss'

interface IProps {
    name: string;
    description: string;
    selected: boolean
    onClick: MouseEventHandler<HTMLDivElement>
}

export const CarClassItem: FC<IProps> = ({
                                             name,
                                             description,
                                             onClick,
                                             selected
                                         }) => {
    return <div onClick={onClick}
                data-selected={selected}
                className={s.car_class_item}>
        <div className={s.car_class_title}>
            { name }
        </div>
        <div className={s.car_class_description}>
            { description }
        </div>
    </div>
}