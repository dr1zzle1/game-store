import React, { FC, useEffect, useState } from 'react';
import { AuthContext } from '../../index';
import Message from '../../components/Message/Message';
import { IMessage } from '../../types';
import './SupportPage.css'
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { onSnapshot, setDoc, doc } from 'firebase/firestore';
import { spawn } from 'child_process';


export interface FormValues {
	messageText: string,
}

interface PropTypes {
	user: any
}

const SupportPage: FC<PropTypes> = ({ user }) => {
	const { db } = React.useContext(AuthContext);
	const [messages, setMessages] = useState<IMessage[]>([]);
	useEffect(() => {
		if (user) {
			const unsub = onSnapshot(doc(db, "messages", user.uid), (doc) => {
				setMessages(doc.data()?.messages)
			});
			return () => {
				unsub()
			}
		}
	}, [user, db]);
	const initialValues: FormValues = {
		messageText: '',
	}
	const handleSubmit = async (values: FormValues, { resetForm }: FormikHelpers<FormValues>) => {
		resetForm()
		if (messages) {
			await setDoc(doc(db, 'messages', user.uid), {
				messages: [...messages, {
					text: values.messageText,
					userEmail: user.email,
					userId: user.uid
				}]
			})
		} else {
			await setDoc(doc(db, 'messages', user.uid), {
				messages: [{
					text: values.messageText,
					userEmail: user.email,
					userId: user.uid
				}]
			})
		}
	}
	if (!user) {
		return (<span>Чтобы написать в поддержку нужно быть зарегестрированным</span>)
	}
	return <>
		<div className='messages'>
			{messages?.map(message => <Message text={message.text} key={message.text + message.userId} isAuthor={user?.uid === message.userId} />)}
		</div>
		<div className='dialog__wrapper'>
			<Formik initialValues={initialValues} onSubmit={handleSubmit}>
				<Form id='supportDialog'>
					<Field id='messageText' name='messageText' className='dialog__inp' />
					<button type="submit" className="btn dialog__btn">Отправить</button>
				</Form>
			</Formik>
		</div>
	</>;
};

export default SupportPage;
