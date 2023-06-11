import {FC} from "react";
import {Card, Label} from "shared";
import Icon from "@mdi/react";
import s from './Administration.module.scss'

interface IProps {
    onClick: Function
    label: any
    icon: any
}

export const NavigationCard: FC<IProps> = ({onClick, icon, label}) => {
    return <Card onClick={onClick} width={'100%'} paddings={4} contentDirection={'column'} contentGap={'4'}
                 contentAlign={'center'}>
     <span className={s.icon_wrapper}>
            <Icon path={icon} size={2}/>
     </span>
        <Label label={label} level={2} weight={'medium'}/>
    </Card>
}