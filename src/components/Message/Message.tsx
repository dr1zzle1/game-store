import React, { FC } from 'react';
import './Message.css'

type PropType = {
	text: string,
	isAuthor: boolean
}

const Message: FC<PropType> = ({ text, isAuthor }) => {
	return <div className={isAuthor ? 'message-author message' : 'message-notTheAuthor message'}>
		{text}
	</div>;
};

export default Message;
