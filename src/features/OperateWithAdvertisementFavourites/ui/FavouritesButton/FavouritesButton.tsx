import {FC, MouseEventHandler} from 'react'

import {Button, HeartIconFilled} from "shared";

import s from './FavouritesButton.module.scss'


interface IProps {
    countOfFavourites: number;
    onClick: MouseEventHandler
}
export const FavouritesButton: FC<IProps> = ({
    countOfFavourites, onClick
}) => {

    return <Button label={'Избранные'} onClick={onClick} type={'secondary'} size={'medium'} >
        <div className={s.icon_wrapper}>
            <img src={HeartIconFilled} />
            { countOfFavourites > 0 && <div className={s.count_of_favourites}>
                +{countOfFavourites}
                </div> }
        </div>
    </Button>
}
