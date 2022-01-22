import React, { FC } from 'react'
import { IReview } from '../../types'
import './ReviewItem.css'

const ReviewItem: FC<IReview> = ({ email, isPositively, text }) => {
	return (
		<div className={isPositively ? 'review-item green' : 'review-item red'}>
			<span className='review-item__email'>{email}:</span>
			<span className='review-item__text'> {text}</span>
		</div>
	)
}

export default ReviewItem
