import React, { FC } from 'react'
import GameCover from '../GameCover/GameCover'
import { AiOutlineCloseCircle } from "react-icons/ai";
import { IGame } from '../../types/games';
import './OrderItem.css'
import { useDispatch } from 'react-redux';
import { removeProduct } from '../../store/reducers/cart';

type PropType = {
	game: IGame
}

const OrderItem: FC<PropType> = ({ game }) => {
	const dispatch = useDispatch()
	const handleDeleteClick = () => {
		dispatch(removeProduct(game.id))

	}
	return (
		<div className="order-item">
			<div className="order-item__cover">
				<GameCover image={game.image} />
			</div>
			<div className="order-item__title">
				<span> {game.title} </span>
			</div>
			<div className="order-item__price">
				<span>{game.price} руб.</span>
				<AiOutlineCloseCircle
					size={25}
					className="cart-item__delete-icon"
					onClick={handleDeleteClick}
				/>
			</div>
		</div>
	)
}

export default OrderItem
