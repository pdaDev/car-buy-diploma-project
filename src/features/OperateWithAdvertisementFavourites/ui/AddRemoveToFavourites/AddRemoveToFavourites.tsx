import {FC, useState} from "react";

import s from './AddRemoveToFavourites.module.scss'
import {addFavourite, removeFavourite, selectors} from '../../model'
import {cn, HeartIconFilled, HeartIcon} from "../../../../shared";
import {useAppDispatch, useAppSelector} from "../../../../app/services";

interface IProps {
    advertisementId: number;
    withTransparentBackground?: boolean

}

export const AddRemoveToFavourites: FC<IProps> = ({
    advertisementId,
    withTransparentBackground = false
                                                  }) => {

    const favourites = useAppSelector(selectors.selectIdsList)
    const isActive = favourites.includes(advertisementId)
    const d = useAppDispatch()
    const switchActiveStatus = () => {
        d(isActive ? removeFavourite(advertisementId) : addFavourite(advertisementId))
    }

    return <div className={cn((isActive ? s.active : s.not_active), s.wrapper, !withTransparentBackground && s.with_wrapper)} onClick={switchActiveStatus}>
        <img src={isActive ? HeartIconFilled : HeartIcon} />
    </div>
}