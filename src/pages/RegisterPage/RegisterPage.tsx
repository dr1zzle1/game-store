import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { validateEmail } from '../../components/utils'
import './RegisterPage.css'
import { Formik, Form, Field } from 'formik'


export interface FormValues {
	email: string,
	password: string
}
const RegisterPage: FC = () => {
	const [error, setError] = useState<string>('')
	const auth = getAuth();




	const handleSubmit = (values: FormValues) => {
		if (validateEmail(values.email)) {
			createUserWithEmailAndPassword(auth, values.email, values.password)
				.catch((error) => {
					values.password.length < 5 ?
						setError('Пароль слишком короткий')
						:
						setError('Проверьте введеные данные')
				});
		} else {
			setError('Не валидный E-mail')
		}
	}
	const initialValues = {
		email: '',
		password: ''
	}
	return (
		<div className="register">
			{error && <h2 style={{ color: 'red' }}>{error}</h2>}
			<div className="register__wrapper">
				<Formik initialValues={initialValues} onSubmit={handleSubmit}>
					<Form id='register'>
						<label htmlFor="email">E-mail</label>
						<Field className='register__inp' id='email' name='email' />
						<label htmlFor="password">Password</label>
						<Field className='register__inp' id='password' name='password' type='password' />
						<button type="submit" className="btn">Зарегистрироваться</button>
					</Form>
				</Formik>
				<span className='register__register-link'>или <Link style={{ textDecoration: 'underline' }} to='/login'>Войдите</Link></span>
			</div>
		</div >
	)
}

export default RegisterPage
