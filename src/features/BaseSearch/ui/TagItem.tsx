import {FC, MouseEvent, MouseEventHandler} from "react";
import s from './BaseSearch.module.scss'
interface IProps {
    onClick: MouseEventHandler<HTMLDivElement>;
    selected: boolean;
    name: string;

}
export const TagItem: FC<IProps> = ({
    onClick,
    selected,
    name
                                    }) => {
    return <div onClick={onClick} data-selected={selected} className={s.tag_item}>
        { name }
    </div>
}