import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/Button/Button'
import { validateEmail } from '../../components/utils'
import './RegisterPage.css'

const RegisterPage: FC = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const auth = getAuth();




	const handleClick = (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault()
		if (validateEmail(email)) {
			createUserWithEmailAndPassword(auth, email, password)
				.catch((error) => {
					password.length < 5 ?
						setError('Пароль слишком короткий')
						:
						setError('Проверьте введеные данные')
				});
		} else {
			setError('Не валидный E-mail')
		}
	}

	return (
		<div className="register">
			{error && <h2 style={{ color: 'red' }}>{error}</h2>}
			<div className="register__wrapper">
				<form id='register'>
					<label htmlFor="e-mail">E-mail</label>
					<input className='register__inp' value={email} onChange={(e) => setEmail(e.target.value)} type="text" id='e-mail' />
					<label htmlFor="password">Password</label>
					<input className='register__inp' value={password} onChange={(e) => setPassword(e.target.value)} type="password" id='password' />
					<Button onClick={handleClick} children="Зарегистрироваться" type='primary' />
				</form>

				<span className='register__register-link'>или <Link style={{ textDecoration: 'underline' }} to='game-store/login'>Войдите</Link></span>
			</div>
		</div >
	)
}

export default RegisterPage
