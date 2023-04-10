import {FC} from "react";
import {Container, List} from "../../../shared";
import {ReviewCard, useGetReviewsQuery, NS} from "../../../entities/Review";
import {useAppNavigate} from "../../../app/services";

export const Reviews: FC = () => {
    const limit = 10
    const offset = 0
    const {data, isLoading} = useGetReviewsQuery({ models: [], brends: [], generations: [], limit, offset, sort: null })
    const n = useAppNavigate()
    return <Container max_w={"700px"}>
        <List loading={isLoading}
              data={data?.results || []}
              renderListEl={(data: NS.IServerReviewListItem, loading: boolean) =>  <ReviewCard type={'small'}
                                                                                               data={data}
                                                                                               loading={loading}
                                                                                               onClick={() => data && n(p => p.reviews._key_(data.review_id))}
              />}
        />

    </Container>
}