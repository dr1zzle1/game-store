export enum ReviewsActionTypes{
	FETCH_REVIEWS='FETCH_REVIEWS',
	FETCH_REVIEWS_SUCCESS='FETCH_REVIEWS_SUCCESS',
	FETCH_REVIEWS_ERROR='FETCH_REVIEWS_ERROR',
	ADD_REVIEW="ADD_REVIEW"
}

export interface IReview {
	id:number,
	email: string,
	text: string,
	isPositively: boolean
}

export interface ReviewsState{
	reviews:Array<IReview>,
	isLoading:boolean,
	error:null | string
}
interface FetchReviewsAction{
	type:ReviewsActionTypes.FETCH_REVIEWS
}
interface FetchReviewsSuccess{
	type:ReviewsActionTypes.FETCH_REVIEWS_SUCCESS,
	payload:Array<IReview>
}
interface FetchReviewsError{
	type:ReviewsActionTypes.FETCH_REVIEWS_ERROR,
	payload:string
}
interface AddReview{
	type:ReviewsActionTypes.ADD_REVIEW,
	payload:IReview
}

export type ReviewsAction = FetchReviewsAction | FetchReviewsSuccess | FetchReviewsError | AddReview;