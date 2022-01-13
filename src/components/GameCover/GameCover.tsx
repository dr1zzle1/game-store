import React, { FC } from 'react';
import './GameCover.css'

type PropType = {
	image: string,
	onClick?: () => void
}

const GameCover: FC<PropType> = ({ image = '', onClick }) => {
	return (
		<div onClick={onClick}
			className="game-cover"
			style={{ backgroundImage: `url(${image})` }}
		/>
	)
}

export default GameCover