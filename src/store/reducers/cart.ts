import { IGame } from '../../types/games';
import { CartState, CartAction, CartActionTypes } from './../../types/cart';

const initialState:CartState = {
	products:[] as Array<IGame>
}
export const cart = (state:CartState = initialState,action:CartAction):CartState => {
	switch (action.type) {
		case CartActionTypes.ADD_PRODUCT:
			return {products:[...state.products, action.payload]}
		case CartActionTypes.REMOVE_PRODUCT:
			const newCart = state.products.filter(game => game.id !== action.payload)
			return {products:newCart}
		default:
			return state
	}
}

export const addToCart = (game:IGame) => ({
	type:CartActionTypes.ADD_PRODUCT,
	payload:game
})

export const removeFromCart = (id:number) => ({
	type:CartActionTypes.REMOVE_PRODUCT,
	payload:id
})

