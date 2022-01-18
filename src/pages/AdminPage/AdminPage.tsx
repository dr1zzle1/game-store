import React, { FC, useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Preloader from '../../components/Preloader/Preloader'
import { AuthContext } from '../../index'
import { IGame } from './../../types/games';
import { addGame, getGames } from '../../store/reducers/games'
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Formik, Form, Field, FormikHelpers } from 'formik'
import './AdminPage.css'

interface FormValues {
	descr: string
	genres: string,
	img: string,
	price: string,
	title: string
	vid: string
}


const AdminPage: FC = () => {
	const dispatch = useDispatch()
	const { user, db } = useContext(AuthContext)
	useEffect(() => {
		dispatch(getGames(db))
	}, [db, dispatch])
	const [passwordText, setPasswordText] = useState('')
	const { games } = useTypedSelector(state => state.games)
	const handleSubmit = (values: FormValues, { resetForm }: FormikHelpers<FormValues>) => {
		const game: IGame = {
			description: values.descr,
			genres: values.genres.split(', '),
			id: games ? games.length : 0,
			image: values.img,
			price: +values.price,
			title: values.title,
			video: values.vid

		}
		dispatch(addGame(db, game))
		resetForm()
	}
	if (!user) {
		return <Preloader />
	}
	if (user.email !== 'admin@mail.ru') {
		return <input type='password' value={passwordText} onChange={e => setPasswordText(e.currentTarget.value)} />
	}
	const initialValues: FormValues = {
		title: '',
		descr: '',
		price: '',
		genres: '',
		img: '',
		vid: ''
	}
	return (
		<div className='admin-page'>
			<Formik initialValues={initialValues} onSubmit={handleSubmit}>
				{({ values }) => (<Form>
					<label htmlFor="title">Название</label>
					<Field required={true} className='admin-page__input' id='title' name='title' />
					<label htmlFor="descr">Описание</label>
					<Field required={true} className='admin-page__input' id='descr' name='descr' />
					<label htmlFor="price">Цена</label>
					<Field required={true} className='admin-page__input' id='price' name='price' />
					<label htmlFor="genres">Жанры</label>
					<Field required={true} className='admin-page__input' id='genres' name='genres' />
					<label htmlFor="img">Изображение</label>
					<Field required={true} className='admin-page__input' id='img' name='img' />
					<div>
						{<img src={values.img} className='admin-page__prev' alt='' />}
					</div>
					<label htmlFor="vid">Видео</label>
					<Field required={true} className='admin-page__input' id='vid' name='vid' />
					<button className='btn' type='submit'>Отправить</button>
				</Form>)}
			</Formik>
		</div >
	)
}

export default AdminPage
