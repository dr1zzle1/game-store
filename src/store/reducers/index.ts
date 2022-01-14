import { reviews } from './reviews';
import { combineReducers } from "@reduxjs/toolkit";
import { cart } from "./cart";
import { gameItem } from "./gameItem";
import { games } from "./games";

export const rootReducer = combineReducers({
	games,
	gameItem,
	cart,
	reviews
})