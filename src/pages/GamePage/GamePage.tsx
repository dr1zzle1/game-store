import React, { FC, useContext, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../index'
import Button from '../../components/Button/Button'
import GameCover from '../../components/GameCover/GameCover'
import GameGenre from '../../components/GameGenre/GameGenre'
import Preloader from '../../components/Preloader/Preloader'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { addToCart, removeFromCart } from '../../store/reducers/cart'
import { getGame } from '../../store/reducers/gameItem'
import './GamePage.css'

const GamePage: FC = () => {
	const { game, error, isLoading } = useTypedSelector(state => state.gameItem)
	const { products } = useTypedSelector(state => state.cart)
	const { id } = useParams();
	const isItemInCart = products.some((item) => item.id === game.id);
	const dispatch = useDispatch();
	const { db } = useContext(AuthContext)


	const handleClick = (e: React.MouseEvent<HTMLElement>) => {
		if (isItemInCart) {
			dispatch(removeFromCart(game.id))
		} else {
			dispatch(addToCart(game))
		}
	}
	useEffect(() => {
		dispatch(getGame(Number(id), db));
	}, [id, dispatch, db])
	if (isLoading) {
		return <Preloader />
	}
	if (error) {
		return <span>{error}</span>
	}

	return (
		<div className="game-page">
			<h1 className="game-page__title">{game.title}</h1>
			<div className="game-page__content">
				<div className="game-page__left">
					<iframe
						width="90%"
						height="400px"
						src={game.video}
						title="YouTube video player"
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					></iframe>
				</div>
				<div className="game-page__right">
					<GameCover image={game.image} />
					<p>{game.description}</p>
					<p className="secondary-text">Популярные метки для этого продукта:</p>
					{game.genres.map((genre) => (
						<GameGenre genre={genre} />
					))}
					<div className="game-page__buy-game">
						<div className="game-buy">
							<span className="game-buy__price">{game.price} руб.</span>
							<Button
								type={isItemInCart ? "secondary" : "primary"}
								onClick={handleClick}
							>
								{isItemInCart ? "Убрать из корзины" : "В Корзину"}
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default GamePage
