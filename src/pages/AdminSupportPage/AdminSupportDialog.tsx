import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Message from '../../components/Message/Message';
import { AuthContext } from '../../index';
import { IMessage } from '../../types';
import { FormValues } from '../SupportPage/SupportPage';

const AdminSupportDialog: FC = () => {
	const { id } = useParams();
	const { db, user } = React.useContext(AuthContext);
	const [messages, setMessages] = useState<IMessage[]>([]);
	const initialValues: FormValues = {
		messageText: '',
	}
	useEffect(() => {
		if (id) {
			const unsub = onSnapshot(doc(db, "messages", id), (doc) => {
				setMessages(doc.data()?.messages)
			});
			return () => {
				unsub()
			}
		}
	}, [id, db]);
	const handleSubmit = async (values: FormValues, { resetForm }: FormikHelpers<FormValues>) => {
		resetForm()
		if (messages && id) {
			await setDoc(doc(db, 'messages', id), {
				messages: [...messages, {
					text: values.messageText,
					userEmail: user.email,
					userId: user.uid
				}]
			})
		} else if (id) {
			await setDoc(doc(db, 'messages', id), {
				messages: [{
					text: values.messageText,
					userEmail: user.email,
					userId: user.uid
				}]
			})
		}
	}
	if (user.email !== 'admin@mail.ru') {
		return <input type='password' />
	}
	return <div className='messages__wrapper'>
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
	</div>;
};

export default AdminSupportDialog;
