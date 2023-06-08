import {FC, MouseEventHandler, useState} from "react";

import s from './AddRemoveToFavourites.module.scss'

import {cn, HeartIconFilled, HeartIcon} from "../../../../shared";
import {useAdvertisementsFavourites} from "../../lib/hooks";

interface IProps {
    advertisementId: number;
    withTransparentBackground?: boolean

}

export const AddRemoveToFavourites: FC<IProps> = ({
    advertisementId,
    withTransparentBackground = false
                                                  }) => {
    const { isFavourite, switchFavouriteStatus } = useAdvertisementsFavourites(advertisementId)
    const onButtonClick: MouseEventHandler = e => {
        e.stopPropagation()
        switchFavouriteStatus()
    }
    return <div className={cn((isFavourite ? s.active : s.not_active), s.wrapper, !withTransparentBackground && s.with_wrapper)} onClick={onButtonClick}>
        <img src={isFavourite ? HeartIconFilled : HeartIcon} />
    </div>
}