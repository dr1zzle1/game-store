import React, { FC } from 'react'
import Button from '../../components/Button/Button'
import OrderItem from '../../components/OrderItem/OrderItem'
import { calcTotalPrice, enumerate } from '../../components/utils'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import './CartPage.css'

const CartPage: FC = () => {
	const { products } = useTypedSelector(state => state.cart)
	const onClick = () => {
		console.log('hi');

	}
	if (products.length < 1) {
		return <h1>Ваша корзина пуста!</h1>
	}
	return (
		<div className="order-page">
			<div className="order-page__top">
				<div className="order-page__total-price">
					<span>{products.length} {enumerate(products.length, ['товар', 'товара', 'товаров'])} на сумму {calcTotalPrice(products)} руб.</span>
				</div>
			</div>
			<div className="order-page__bottom">
				{products.map(game => <OrderItem game={game} />)}
			</div>
			<Button type="primary" size="m" onClick={onClick}>
				Оформить заказ
			</Button>
		</div>

	)
}

export default CartPage
