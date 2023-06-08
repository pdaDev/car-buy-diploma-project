import {FC} from "react";
import {ManagementPanel} from "../ManagementPanel/ManagementPanel";
import {getTranslationIndexCreator} from "../../../../shared";
import * as NS from '../../namespace'
import {mdiDeleteOutline, mdiPencil} from "@mdi/js";
import {useReviewManagement} from "../../../../entities/Review";
interface IProps {
    review_id: number
}
export const ReviewManagementPanel: FC<IProps> = ({ review_id }) => {
    const getIndex = getTranslationIndexCreator("review.managementPanel")
    const { setEditMode, deleteReview, isLoading } = useReviewManagement(review_id)
    const controls: NS.IControl[] = [
        { title: getIndex("delete"), onClick: deleteReview, icon: mdiDeleteOutline },
        { title: getIndex("edit"), onClick: setEditMode, icon: mdiPencil }
    ]

    return <ManagementPanel controls={controls} isLoading={isLoading} />
}
