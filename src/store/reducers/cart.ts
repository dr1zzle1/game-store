import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGame } from '../../types';

interface CartState {
	products:Array<IGame>;
}

const initialState:CartState = {
	products:[] as Array<IGame>
}

export const cartSlice = createSlice({
	name:'cart',
	initialState,
	reducers:{
		addProduct: (state, action:PayloadAction<IGame>) =>{
			state.products=[...state.products,action.payload]
		},
		removeProduct: (state,action:PayloadAction<number>) => {
			const newCart = state.products.filter(game => game.id !== action.payload)
			state.products=newCart
		}
	}
})


export const {addProduct,removeProduct} = cartSlice.actions
export default cartSlice.reducer

