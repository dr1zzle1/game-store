export enum GamesActionTypes{
	FETCH_GAMES='FETCH_GAMES',
	FETCH_GAMES_SUCCESS='FETCH_GAMES_SUCCESS',
	FETCH_GAMES_ERROR='FETCH_GAMES_ERROR',
	ADD_GAME="ADD_GAME"
}

export interface IGame{
	image:string;
	title:string;
	genres:Array<string>;
	price:number;
	video:string;
	id:number
	description:string;
}
export interface GamesState {
	games:Array<IGame>;
	isLoading:boolean;
	error: null | string;
}

interface FetchGamesAction{
	type:GamesActionTypes.FETCH_GAMES
}
interface FetchGamesSuccess{
	type:GamesActionTypes.FETCH_GAMES_SUCCESS,
	payload:Array<IGame>
}
interface FetchGamesError{
	type:GamesActionTypes.FETCH_GAMES_ERROR,
	payload:string
}
interface AddGame{
	type:GamesActionTypes.ADD_GAME,
	payload:IGame
}
export type GamesAction = FetchGamesAction | FetchGamesSuccess | FetchGamesError | AddGame