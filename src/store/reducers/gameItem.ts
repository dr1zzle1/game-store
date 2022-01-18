import { GameItemActionTypes, GameItemState } from './../../types/gameItem';
import { GameItemAction } from "../../types/gameItem"
import { doc, getDoc, Firestore } from 'firebase/firestore/lite';

const initialState:GameItemState = {
	game:{
		image:'',
	title:'',
	genres:[],
	price:0,
	video:'',
	id:0,
	description:''
	} ,
	isLoading:false,
	error:null
}

export const gameItem = (state=initialState,action:GameItemAction):GameItemState => {
	switch (action.type){
		case GameItemActionTypes.FETCH_GAME:
			return {...state, isLoading: true}
		case GameItemActionTypes.FETCH_GAME_SUCCESS:
			return {game:action.payload,isLoading: false,error:null}
		case GameItemActionTypes.FETCH_GAME_ERROR:
			return {...state,isLoading: false, error:action.payload}
		default:
			return state
	}
}

export const getGame = (id:number,db:Firestore) => async (dispatch:any) => {
	dispatch({type:GameItemActionTypes.FETCH_GAME})
	const docRef = doc(db, "games",'games');
	try {
		const response = await getDoc(docRef)
		if (response.exists()){
			const length = response.data().games.length
			dispatch({type:GameItemActionTypes.FETCH_GAME_SUCCESS,payload:response.data().games[length-id-1]})
		}
	} catch (error) {
		dispatch({type:GameItemActionTypes.FETCH_GAME_ERROR, payload:'Произошла ошибка'})
	}
	
}
