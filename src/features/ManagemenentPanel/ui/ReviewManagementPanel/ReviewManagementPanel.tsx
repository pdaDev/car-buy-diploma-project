import {FC} from "react";
import {ManagementPanel} from "../ManagementPanel/ManagementPanel";
import {getTranslationIndexCreator} from "../../../../shared";
import * as NS from '../../namespace'
import {mdiDeleteOutline, mdiPencil} from "@mdi/js";
interface IProps {

}
export const ReviewManagementPanel: FC<IProps> = () => {
    const getIndex = getTranslationIndexCreator("review.managementPanel")
    const deleteReview = () => {

    }

    const editReview = () => {

    }
    const controls: NS.IControl[] = [
        { title: getIndex("delete"), onClick: deleteReview, icon: mdiDeleteOutline },
        { title: getIndex("edit"), onClick: editReview, icon: mdiPencil }
    ]

    return <ManagementPanel controls={controls}/>
}
