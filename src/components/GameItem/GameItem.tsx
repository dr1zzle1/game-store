import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { IGame } from '../../types'
import GameBuy from '../GameBuy/GameBuy'
import GameCover from '../GameCover/GameCover'
import GameGenre from '../GameGenre/GameGenre'
import './GameItem.css'



const GameItem: FC<IGame> = (game) => {

	const navigate = useNavigate()
	return (
		<div className="game-item" onClick={() => navigate(`/game/${game.id}`)}>
			<GameCover image={game.image} />
			<div className="game-item__details">
				<div className="descr_block">
					<span className="game-item__title">{game.title}</span>
					<div className="game-item__genre">
						{game.genres.map((genre) => (
							<GameGenre genre={genre} key={genre + game.id} />
						))}
					</div>
				</div>
				<GameBuy game={game} />
			</div>
		</div>
	)
}

export default GameItem
