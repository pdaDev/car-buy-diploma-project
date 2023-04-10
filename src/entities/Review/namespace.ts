import {ICarName, IUserCommonData, ReviewPoints, IServerCarName} from "../../shared";


export interface IServerReviewListItem {
    title: string
    date: string
    score: number
    message: string
    owner: IUserCommonData
    car: ICarName
    review_id: number
    photos: string[]
}



export type IReview = Omit<IServerReviewListItem, 'score'> & {
    car: IServerCarName
    score_point: ReviewPoints
    other_reviews: {
        count: number
        results: IServerReviewListItem[]
    }
}

export type IReviewPatchPayload = Partial<{
    id: number
    title: string
    message: string
    photos: string[]
}>



