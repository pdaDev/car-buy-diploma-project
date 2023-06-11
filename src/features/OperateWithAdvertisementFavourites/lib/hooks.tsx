import {useAppDispatch, useAppSelector} from "app/services";
import {addFavourite, removeFavourite, selectors} from "../model";

export const useAdvertisementsFavourites = (advertisementId: number) => {

    const favourites = useAppSelector(selectors.selectIdsList)
    const isFavourite = favourites.includes(advertisementId)
    const d = useAppDispatch()
    const switchFavouriteStatus = () => {
        d(isFavourite ? removeFavourite(advertisementId) : addFavourite(advertisementId))
    }

    const addToFavourites = () => d(addFavourite(advertisementId))
    const removeFromFavourites = () => d(removeFavourite(advertisementId))

    return {
        isFavourite,
        switchFavouriteStatus,
        addToFavourites,
        removeFromFavourites
    }
}