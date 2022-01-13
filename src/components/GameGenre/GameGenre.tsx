import React, { FC } from 'react'
import './GameGenre.css'

type PropType = {
	genre?: string
}

const GameGenre: FC<PropType> = ({ genre = '' }) => {
	return (
		<span className="game-genre">{genre}</span>
	)
}

export default GameGenre
