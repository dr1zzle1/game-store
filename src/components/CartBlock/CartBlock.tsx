import React, { FC } from 'react'
import { BiCartAlt } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { calcTotalPrice } from '../utils'
import './CartBlock.css'

const CartBlock: FC = () => {

	const { products } = useTypedSelector(state => state.cart)
	return (
		<div className='cart-block'>
			<Link to='/cart'>
				<BiCartAlt size={25} className='cart-block__icon' />
				<span className="total-price">{calcTotalPrice(products)} руб.</span>
			</Link>
		</div>
	)
}

export default CartBlock
