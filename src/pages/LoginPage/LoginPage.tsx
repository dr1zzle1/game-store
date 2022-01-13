import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { FC, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { validateEmail } from '../../components/utils';
import './LoginPage.css'


const LoginPage: FC = () => {

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const auth = getAuth();
	const navigate = useNavigate()

	const handleSubmit = (e: any) => {
		if (validateEmail(email)) {
			signInWithEmailAndPassword(auth, email, password)
				.catch(() => {
					setError('Проверьте введеныые данные')
				});
			navigate('/')
		} else {
			setError('Не валидный E-mail')
		}
	}
	return (<div className="login">
		{error && <h2 style={{ color: 'red' }}>{error}</h2>}
		<div className="login__wrapper">
			<form id='login'>
				<label htmlFor="e-mail">E-mail</label>
				<input className='login__inp' value={email} onChange={(e) => setEmail(e.target.value)} type="text" id='e-mail' />
				<label htmlFor="password">Password</label>
				<input className='login__inp' value={password} onChange={(e) => setPassword(e.target.value)} type="password" id='password' />
				<Button type='primary' onClick={e => handleSubmit(e)} >Войти</Button>
			</form>

			<span className='login__register-link'>или <Link style={{ textDecoration: 'underline' }} to='/game-store/register'>Зарегистрируйтесь</Link></span>
		</div>
	</div >
	)
}

export default LoginPage
