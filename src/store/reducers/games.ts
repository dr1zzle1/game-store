import { doc, Firestore, getDoc } from 'firebase/firestore/lite';
import { GamesAction, GamesActionTypes, GamesState } from './../../types/games';

const initialState: GamesState= {
	games:[],
	isLoading:false,
	error:null
}


export const games = (state:GamesState = initialState, action:GamesAction):GamesState => {
	switch (action.type) {
		case GamesActionTypes.FETCH_GAMES:
			return {...state, isLoading:true}
		case GamesActionTypes.FETCH_GAMES_SUCCESS:
			return {...state, isLoading:false, games: action.payload}
		case GamesActionTypes.FETCH_GAMES_ERROR:
			return {...state, isLoading:false, error: action.payload}
		default:
			return state
	}
}

export const getGames = (db:Firestore) => async (dispatch:any) => {
	dispatch({type:GamesActionTypes.FETCH_GAMES})
	const docRef = doc(db, "games",'games');
	try {
		const response = await getDoc(docRef)
		if (response.exists()){
			dispatch({type:GamesActionTypes.FETCH_GAMES_SUCCESS,payload:response.data().games})
		}
	} catch (error) {
		dispatch({type:GamesActionTypes.FETCH_GAMES_ERROR, payload:'Произошла ошибка'})
	}
	
}
