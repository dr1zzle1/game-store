import { AppDispatch, RootState } from './../index';
import { IReview } from '../../types';
import { doc, Firestore, getDoc, setDoc } from 'firebase/firestore';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ReviewsState{
	reviews:Array<IReview>,
	isLoading:boolean,
	error:null | string
}

const initialState: ReviewsState= {
	reviews:[],
	isLoading: false,
	error:null
}

export const reviewsSlice = createSlice({
	name:'reviews',
	initialState,
	reducers:{
		fetchReviews:(state) => {
			state.isLoading=true
		},
		fetchReviewsSuccess:(state,action:PayloadAction<Array<IReview>>) =>{
			state.isLoading=false;
			state.reviews=action.payload
		},
		fetchReviewError:(state,action:PayloadAction<string>) =>{
			state.isLoading=false;
			state.error=action.payload
		}
	}
})

export const {fetchReviews,fetchReviewsSuccess,fetchReviewError} = reviewsSlice.actions

export const getReviews = (db:Firestore) => async (dispatch:AppDispatch) => {
	dispatch(fetchReviews())
	const docRef = doc(db, "reviews",'reviews');
	try {
		const response = await getDoc(docRef)
		if (response.exists()){
		dispatch(fetchReviewsSuccess(response.data().reviews ? response.data().reviews : [] ))
		}
	} catch (error) {
		dispatch(fetchReviewError('Произошла ошибка'))
	}
	
}

export const setReviews = (db:Firestore,review:IReview) => async (dispatch:AppDispatch,getState:() => RootState) => {
	dispatch(fetchReviews())
	const reviewsState3 = getState().reviews.reviews
	await setDoc(doc(db, "reviews", "reviews"), {reviews:[review,...reviewsState3]});
	dispatch(fetchReviewsSuccess([review,...reviewsState3,]))
}

export default reviewsSlice.reducer

