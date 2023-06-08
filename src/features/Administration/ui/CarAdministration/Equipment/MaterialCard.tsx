import {FC, MouseEventHandler} from "react";
import s from './Equipment.module.scss'
import {cn, Label} from "../../../../../shared";
import Icon from "@mdi/react";
import {mdiCircle} from "@mdi/js/commonjs/mdi";

interface IProps {
    name: string
    selected?: boolean
    onSelect?: Function
}
export const MaterialCard: FC<IProps> = ({
    selected= true,
    name,
    onSelect

}) => {
    return <div className={cn(s.material_card, selected && s.active)} onClick={onSelect as MouseEventHandler}>
        <Label label={name} weight={'regular'} level={4}/>
        <Icon path={mdiCircle} size={0.5}/>
    </div>
}