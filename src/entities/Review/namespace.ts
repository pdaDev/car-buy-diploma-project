import {
    ICarName,
    IUserCommonData,
    ReviewPoints,
    IServerCarName,
    IServerReviewListItem,
    ICarSearch,
    RangeFilter, ReviewPointsWithoutTotal, IRetrieveImage
} from "../../shared";



export type IReview = Omit<IServerReviewListItem, 'score' | 'photos'> & {
    car: IServerCarName
    score_point: ReviewPoints
    photos:  IRetrieveImage[]
    other_reviews: {
        count: number
        results: IServerReviewListItem[]
    }
}

export type ReviewCreatePatchPayload = {
    car?: number
} & ReviewPointsWithoutTotal & Pick<IReview,   'title' | 'message'>



export interface IReviewSearchData {
    score: RangeFilter
    safety_point?: RangeFilter
    comfort_point?: RangeFilter,
    reliable_point?: RangeFilter,
    contrallabilty_point?: RangeFilter,
    economic_point?: RangeFilter,
    cross_country_point?: RangeFilter,
}

export type ReviewPatchPayload = {
    id: number
} & Partial<ReviewCreatePatchPayload>



