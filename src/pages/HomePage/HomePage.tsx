import React, { FC, useContext, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getGames } from '../../store/reducers/games'
import './HomePage.css'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import Preloader from '../../components/Preloader/Preloader'
import GameItem from '../../components/GameItem/GameItem'
import { AuthContext } from '../../index'



const Home: FC = () => {
	const dispatch = useDispatch()
	const { db } = useContext(AuthContext)
	const { isLoading, error, games } = useTypedSelector(state => state.games)
	useEffect(() => {
		dispatch(getGames(db))
	}, [dispatch])
	if (isLoading) {
		return <Preloader />
	}
	if (error) {
		return <div>{error}</div>
	}
	return (
		<div className={'home-page'}>
			{games.map(game => <GameItem {...game} key={`${game.id}__${game.title}`} />)}
		</div>
	)
}

export default Home
