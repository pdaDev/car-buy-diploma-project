import {FC} from "react";
import {useDeleteReviewMutation, useReviewManagement} from "../../../entities/Review";
import {useAppDispatch, useAppNavigate} from "../../../app/services";
import {Button, Card} from "../../../shared";
import {openModal} from "../../../app/services/withPopupProvider";

interface IProps {
    id: number
}

export const ReviewManagementBlock: FC<IProps> = ({id}) => {

    const  { deleteReview, setEditMode } = useReviewManagement(id)
    return <Card contentDirection={'row'} contentGap={4}>
        <Button type={'primary'} label={'удалить'} onClick={deleteReview}/>
        <Button type={'secondary'} label={'редактировать'} onClick={setEditMode}/>
    </Card>
}