import {addToCompare, removeFromCompare} from "../model";
import {useAppDispatch, useAppSelector} from "app/services";
import {selectCompareAds, selectCompareModels} from "../model/selectors";


export const useContentCompare = (type: 'ad' | 'model', compare_item_id: number) => {
    const d = useAppDispatch()
    const compareAdvertisements = useAppSelector(selectCompareAds)
    const compareModels = useAppSelector(selectCompareModels)
    const isCompared = type === 'ad'
        ? compareAdvertisements.includes(compare_item_id)
        : compareModels.includes(compare_item_id)

    const add = () => d(addToCompare({type, id: compare_item_id}))
    const remove = () => d(removeFromCompare({type, id: compare_item_id}))
    const switchCompare = () => isCompared
        ? remove()
        : add()

    return {
        add, remove, switchCompare, isCompared
    }
}