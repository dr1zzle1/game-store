import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { doc, Firestore, getDoc, setDoc } from 'firebase/firestore/lite';
import { IGame } from './../../types/games';

interface GamesState {
	games:Array<IGame>;
	isLoading:boolean;
	error: null | string;
}


const initialState: GamesState= {
	games:[],
	isLoading:false,
	error:null
}

export const gamesSlice = createSlice({
	name:'games',
	initialState,
	reducers:{
		fetchGame:(state) => {
			state.isLoading=true
		},
		fetchGamesSuccess:(state,action:PayloadAction<Array<IGame>>) => {
			state.isLoading=false;
			state.games=action.payload
		},
		fetchGamesError:(state,action:PayloadAction<string>) => {
			state.isLoading=false;
			state.error=action.payload
		}
	}
})
const {fetchGame,fetchGamesSuccess,fetchGamesError} = gamesSlice.actions

export const getGames = (db:Firestore) => async (dispatch:any) => {
	dispatch(fetchGame())
	const docRef = doc(db, "games",'games');
	try {
		const response = await getDoc(docRef)
		if (response.exists()){
			dispatch(fetchGamesSuccess(response.data().games))
		}
	} catch (error) {
		dispatch(fetchGamesError('Произошла ошибка'))
	}
	
}

export const addGame = (db:Firestore, game:IGame) => async (dispatch: any,getState:any) => {
	dispatch(fetchGame())
	const gamesState = getState().games.games
	if (gamesState){
		await setDoc(doc(db, "games", "games"), {games:[game,...gamesState ]});
		dispatch(fetchGamesSuccess([game,...gamesState,]))
	}else{
		await setDoc(doc(db, "games", "games"), {games:[game]});
		dispatch(fetchGamesSuccess([game]))
	}
	
}

export default gamesSlice.reducer
