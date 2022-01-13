import { AuthContext } from '../../index';
import React, { FC, MouseEvent } from 'react'
import { Link } from 'react-router-dom';
import CartBlock from '../CartBlock/CartBlock';
import './Header.css'

const Header: FC = () => {
	const { user, ga } = React.useContext(AuthContext);
	const handleClick = (e: MouseEvent) => {
		e.preventDefault()
		ga.signOut()
	}
	return (
		<div className="header">
			<div className="wrapper">
				<Link to='/' className="header__store-title">
					Game Store
				</Link>
			</div>
			<div className="wrapper header__cart-btn-wrapper">
				{user ? <div><span>{user.email}</span><button onClick={handleClick}>Выйти</button></div> : <Link to='/login'>Войти</Link>}
				<CartBlock />
			</div>
		</div>
	)
}

export default Header
