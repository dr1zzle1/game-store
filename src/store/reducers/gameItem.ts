import { IGame } from './../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { doc, getDoc, Firestore } from 'firebase/firestore/lite';

type GameItemState = {
	game:IGame,
	isLoading:boolean,
	error:string | null,
}

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


export const gameItemSlice = createSlice({
	name:'gameItem',
	initialState,
	reducers:{
		fetchGame:(state) => {
			state.isLoading=true
		},
		fetchGameSuccess:(state,action:PayloadAction<IGame>) => {
			state.game=action.payload
			state.isLoading=false
			state.error=null
		},
		fetchGameError:(state, action:PayloadAction<string>) => {
			state.isLoading=false
			state.error=action.payload
		}
	}
})

const {fetchGame,fetchGameSuccess,fetchGameError} = gameItemSlice.actions

export const getGame = (id:number,db:Firestore) => async (dispatch:any) => {
	dispatch(fetchGame())
	const docRef = doc(db, "games",'games');
	try {
		const response = await getDoc(docRef)
		if (response.exists()){
			const length = response.data().games.length
			dispatch(fetchGameSuccess(response.data().games[length-id-1]))
		}
	} catch (error) {
		dispatch(fetchGameError('Произошла ошибка'))
	}
	
}
export default gameItemSlice.reducer