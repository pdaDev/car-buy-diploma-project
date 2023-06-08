import {FC, MouseEventHandler, useEffect, useRef} from "react";
import {cn} from "../../lib";
import s from "./FullScreenImageViewer.module.scss";


interface IProps {
    active: boolean
    image: string
    setActive: Function
}

export const NavigationImageItem: FC<IProps> = ({ image, setActive, active }) => {
    const onNavigationClick: MouseEventHandler = e => {
        e.stopPropagation()
        setActive()
    }
    return <div className={cn(s.navigation_item, active && s.active)}
    >
        <img src={image}
             tabIndex={0}
             onClick={onNavigationClick}
        />
    </div>
}