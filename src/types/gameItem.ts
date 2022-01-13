import { IGame } from "./games";

export enum GameItemActionTypes{
	FETCH_GAME='FETCH_GAME',
	FETCH_GAME_SUCCESS='FETCH_GAME_SUCCESS',
	FETCH_GAME_ERROR='FETCH_GAME_ERROR',
}
export type GameItemState = {
	game:IGame,
	isLoading:boolean,
	error:string | null,
}
interface FetchGameAction{
	type:GameItemActionTypes.FETCH_GAME
}
interface FetchGameSuccessAction {
	type: GameItemActionTypes.FETCH_GAME_SUCCESS,
	payload: IGame
}
interface FetchGameError{
	type:GameItemActionTypes.FETCH_GAME_ERROR,
	payload:string
}

export type GameItemAction = FetchGameAction | FetchGameSuccessAction | FetchGameError