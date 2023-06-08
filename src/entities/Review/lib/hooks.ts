import {useDeleteReviewMutation} from "../api";
import {useAppDispatch, useAppNavigate} from "../../../app/services";
import {openModal} from "../../../app/services/withPopupProvider";


export const useReviewManagement = (id: number) => {
    const [deleteR, {isError, isLoading}] = useDeleteReviewMutation()
    const d = useAppDispatch()
    const n = useAppNavigate()
    const deleteReview = () => {
        d(openModal({
            key: 'confirm', payload: {
                onConfirm: async () => {
                    await deleteR(id).unwrap()
                    if (!isError) {
                        n(p => p.reviews)
                    }
                },
                index: 'delete_review'
            }
        }))
    }
    const setEditMode = () => {
        n(p => p.reviews._key_(id), {mode: 'edit'})
    }

    return { setEditMode, deleteReview, isLoading }
}