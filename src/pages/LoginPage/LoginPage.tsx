import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { FC, useState } from 'react'
import { Link } from 'react-router-dom';
import { validateEmail } from '../../components/utils';
import { Formik, Form, Field } from 'formik'
import './LoginPage.css'

export interface FormValues {
	email: string,
	password: string
}

const LoginPage: FC = () => {
	const [error, setError] = useState<string>('')
	const auth = getAuth();
	const handleSubmit = (values: FormValues) => {
		if (validateEmail(values.email)) {
			signInWithEmailAndPassword(auth, values.email, values.password)
				.catch(() => {
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
	return (<div className="login">
		{error && <h2 style={{ color: 'red' }}>{error}</h2>}
		<div className="login__wrapper">
			<Formik initialValues={initialValues} onSubmit={handleSubmit}>
				<Form id='login'>
					<label htmlFor="email">E-mail</label>
					<Field className='login__inp' id='email' name='email' required={true} />
					<label htmlFor="password">Password</label>
					<Field type='password' className='login__inp' id='password' name='password' required={true} />
					<button className='btn' type='submit'>Войти</button>
				</Form>
			</Formik>
			<span className='login__register-link'>или <Link style={{ textDecoration: 'underline' }} to='/register'>Зарегистрируйтесь</Link></span>
		</div>
	</div >
	)
}

export default LoginPage
