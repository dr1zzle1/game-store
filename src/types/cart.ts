import { IGame } from "./games";

export enum CartActionTypes{
	ADD_PRODUCT='ADD_PRODUCT',
	REMOVE_PRODUCT='REMOVE_PRODUCT',
}


export interface CartState {
	products:Array<IGame>;
}
interface AddProduct{
	type:CartActionTypes.ADD_PRODUCT,
	payload:IGame
}
interface RemoveProduct{
	type: CartActionTypes.REMOVE_PRODUCT,
	payload:number
}

export type CartAction = AddProduct | RemoveProduct