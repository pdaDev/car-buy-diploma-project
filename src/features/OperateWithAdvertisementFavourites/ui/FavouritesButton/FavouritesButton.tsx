import {FC, MouseEventHandler} from 'react'

import {Button, HeartIconFilled} from "shared";

import s from './FavouritesButton.module.scss'
import {useTranslation} from "react-i18next";


interface IProps {
    countOfFavourites: number;
    onClick: MouseEventHandler
}
export const FavouritesButton: FC<IProps> = ({
    countOfFavourites, onClick
}) => {
    const { t} = useTranslation()
    return <Button label={t('header.favourites') as string} onClick={onClick} type={'secondary'} size={'medium'} >
        <div className={s.icon_wrapper}>
            <img src={HeartIconFilled} />
            { countOfFavourites > 0 && <div className={s.count_of_favourites}>
                +{countOfFavourites}
                </div> }
        </div>
    </Button>
}
