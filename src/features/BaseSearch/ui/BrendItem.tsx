import {FC, MouseEventHandler} from "react";
import s from './BaseSearch.module.scss'
interface IProps {
    name: string;
    selected: boolean;
    onClick: MouseEventHandler<HTMLDivElement>
}

export const BrendItem: FC<IProps> = ({
    name,
    selected,
    onClick

                                      }) => {
    return <div onClick={onClick} className={s.brend_item}>
        <div className={s.brend_logo}/>
        <div className={s.brend_title} data-selected={selected}>
            { name }
        </div>
    </div>

}