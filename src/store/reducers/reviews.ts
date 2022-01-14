import { ReviewsAction, ReviewsActionTypes, IReview } from './../../types/reviews';
import { ReviewsState } from "../../types/reviews"
import { doc, Firestore, getDoc, setDoc } from 'firebase/firestore/lite';

const initialState: ReviewsState= {
	reviews:[],
	isLoading: false,
	error:null
}

export const reviews = (state: ReviewsState = initialState,action: ReviewsAction):ReviewsState => {
	switch (action.type) {
		case ReviewsActionTypes.FETCH_REVIEWS:
			return {...state, isLoading:true}
		case ReviewsActionTypes.FETCH_REVIEWS_SUCCESS:
			return {...state, isLoading:false, reviews:action.payload}
		case ReviewsActionTypes.FETCH_REVIEWS_ERROR:
			return {...state, isLoading:false, error: action.payload}
		default:
			return state
	}
}

export const getReviews = (db:Firestore) => async (dispatch:any) => {
	dispatch({type:ReviewsActionTypes.FETCH_REVIEWS})
	const docRef = doc(db, "reviews",'reviews');
	try {
		const response = await getDoc(docRef)
		if (response.exists()){
		dispatch({type:ReviewsActionTypes.FETCH_REVIEWS_SUCCESS,payload:response.data().reviews ? response.data().reviews : [] })
		}
	} catch (error) {
		dispatch({type:ReviewsActionTypes.FETCH_REVIEWS_ERROR, payload:'Произошла ошибка'})
	}
	
}

export const setReviews = (db:Firestore,review:IReview) => async (dispatch:any,getState:any) => {
	dispatch({type:ReviewsActionTypes.FETCH_REVIEWS})
	const reviewsState3 = getState().reviews.reviews
	await setDoc(doc(db, "reviews", "reviews"), {reviews:[review,...reviewsState3]});
	dispatch({type:ReviewsActionTypes.FETCH_REVIEWS_SUCCESS,payload:[review,...reviewsState3,]})
}
