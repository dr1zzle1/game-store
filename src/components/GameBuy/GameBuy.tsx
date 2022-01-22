import React, { FC } from 'react'
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { addProduct, removeProduct } from '../../store/reducers/cart';
import { IGame } from '../../types';
import Button from '../Button/Button';
import './GameBuy.css'

type PropType = {
	game: IGame
}

const GameBuy: FC<PropType> = ({ game }) => {
	const { products } = useTypedSelector(state => state.cart)
	const isItemInCart = products.some((item) => item.id === game.id);
	const dispatch = useDispatch()
	const handleClick = (e: React.MouseEvent<HTMLElement>) => {
		e.stopPropagation();
		if (isItemInCart) {
			dispatch(removeProduct(game.id))
		} else {
			dispatch(addProduct(game))
		}
	}
	return (
		<div className="game-buy">
			<span className="game-buy__price">{game.price} руб.</span>
			<Button
				type={isItemInCart ? "secondary" : "primary"}
				onClick={handleClick}
			>
				{isItemInCart ? "Убрать из корзины" : "В Корзину"}
			</Button>
		</div>
	)
}

export default GameBuy
