import React, { FC } from 'react'
import classnames from 'classnames'
import './Button.css'

type PropType = {
	onClick: React.MouseEventHandler<HTMLButtonElement>
	type?: 'secondary' | 'primary'
	children?: React.ReactNode
	size?: 's' | 'm'
}

const Button: FC<PropType> = ({ type, children, onClick, size }) => {
	const btnClass = classnames({
		'btn': true,
		'btn--secondary': type === 'secondary',
		'btn--primary': type === 'primary',
		'btn--small': size === 's',
		'btn--medium': size === 'm',
	});

	return (
		<button className={btnClass}
			onClick={onClick}
		>
			{children}
		</button>
	)
}

export default Button

