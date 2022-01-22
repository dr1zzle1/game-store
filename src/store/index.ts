import gameItemSlice  from './reducers/gameItem';
import reviewsSlice from './reducers/reviews';
import cartSlice  from './reducers/cart';
import gamesSlice  from './reducers/games';
import { configureStore } from '@reduxjs/toolkit'



export const store = configureStore({
	reducer: {
		games:gamesSlice,
		cart:cartSlice,
		reviews: reviewsSlice,
		gameItem:gameItemSlice
	}
  })
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch