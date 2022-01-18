import React, { FC, useContext, useEffect, useState } from 'react'
import { BiDislike, BiLike } from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import { AuthContext } from '../..'
import Preloader from '../../components/Preloader/Preloader'
import ReviewItem from '../../components/ReviewItem/ReviewItem'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { addErrorMessage, getReviews, setReviews } from '../../store/reducers/reviews'
import './ReviewsPage.css'

const ReviewsPage: FC = () => {
	const [checked, setChecked] = useState<string>('')
	const [reviewText, setReviewText] = useState<string>('')
	const { user, db } = useContext(AuthContext)
	const dispatch = useDispatch()
	const { isLoading, reviews, error } = useTypedSelector(state => state.reviews)
	const isPositively = checked === 'like' ? true : false
	const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(event.target.value);
	}

	useEffect(() => {
		dispatch(getReviews(db))
	}, [db, dispatch])


	const submitHandler = (e: React.SyntheticEvent) => {
		e.preventDefault()
		if (checked.length) {
			dispatch(setReviews(db, { id: reviews.length - 1, email: user.email, isPositively: isPositively, text: reviewText }))
			setChecked('')
			setReviewText('')
			dispatch(addErrorMessage(''))
		} else {
			dispatch(addErrorMessage('Выберите положительный или отрицательный отзыв'))
		}
	}
	if (isLoading || !reviews) {
		return <Preloader />
	}
	return (

		<div className='reviews-page'>
			{error && <h2 style={{ color: 'red' }}>{error}</h2>}
			{user ? (<form className='reviews-page__form' onSubmit={(e: React.SyntheticEvent) => submitHandler(e)}>
				<div>
					<input required value={reviewText} onChange={(e) => setReviewText(e.target.value)} placeholder='Ваш текст...' id='review__text' type="text" />
				</div>
				<div>
					<input id='like' onChange={onChangeValue} type="radio" value="like" checked={checked === 'like'} />
					<input id='dislike' onChange={onChangeValue} type="radio" value="dislike" checked={checked === 'dislike'} />
					<label htmlFor='like' className='like-label'><BiLike size={25} /></label>
					<label htmlFor='dislike' className='dislike-label'><BiDislike size={25} /></label>
				</div>
				<button type='submit' className='reviews-page__form-button'>Отправить</button>
			</form>) : (<span>Чтобы оставить отзыв вы должны быть зарегестрированы</span>)}

			{reviews.length ? reviews.map(review => <ReviewItem {...review} key={review.id} />) : <span>Нету</span>}
		</div >
	)
}

export default ReviewsPage
