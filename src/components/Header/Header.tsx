import { AuthContext } from '../../index';
import React, { FC, MouseEvent } from 'react'
import { Link } from 'react-router-dom';
import CartBlock from '../CartBlock/CartBlock';
import './Header.css'
import Button from '../Button/Button';

const Header: FC = () => {
	const { user, ga } = React.useContext(AuthContext);
	const handleClick = (e: MouseEvent) => {
		e.preventDefault()
		ga.signOut()
	}
	return (
		<div className="header">
			<div>
				<Link to='/' className="header__store-title">
					Game Store
				</Link>
			</div>
			<div className='header__links links'>
				<Link to='/reviews'>Отзывы</Link>
			</div>
			<div className="wrapper header__cart-btn-wrapper">
				{user ? <div><span>{user.email}</span><Button type='secondary' onClick={handleClick}>Выйти</Button></div> : <div className='header__login-link'><Link to='/login'>Войти</Link></div>}
				<CartBlock />
			</div>
		</div>
	)
}

export default Header
