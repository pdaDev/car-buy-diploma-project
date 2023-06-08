import {FC} from "react";
import {ReviewCreateForm} from "../../../widgets/ReviewCreateForm";
import {useCreateReviewMutation, NS} from "../../../entities/Review";
import {useAppNavigate} from "../../../app/services";
import {useNavigationPermission} from "../../../shared";

export const CreateReview: FC = () => {

    const [create, { isError, data: id, isLoading }] = useCreateReviewMutation()
    const n = useAppNavigate()
    useNavigationPermission(['authorized'])

    const createReview = async (data: FormData) => {
        await create(data).unwrap().then(id => n(p => p.reviews._key_(+id)))
    }

    return <ReviewCreateForm withCarChoose
                             loading={isLoading}
                             onSubmit={createReview}
    />
}