import React, { FC, useContext, useEffect, useState } from 'react';
import { collection, query, onSnapshot } from "firebase/firestore";
import { AuthContext } from '../../index';
import { Link } from 'react-router-dom';

interface ICompanion {
	userId: string,
	userEmail: string

}


const AdminSupportPage: FC = () => {
	const { db } = useContext(AuthContext);
	const [companions, setСompanions] = useState<ICompanion[]>([]);
	useEffect(() => {
		const q = query(collection(db, "messages"));
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const newCompanions: ICompanion[] = [];
			querySnapshot.forEach((doc) => {
				newCompanions.push({ userId: doc.data()?.messages[0].userId, userEmail: doc.data()?.messages[0].userEmail })
			});
			setСompanions(newCompanions)
		});
		return () => {
			unsubscribe()
		};
	}, [db]);
	console.log(companions);
	return <div>
		{companions.map(comp => <Link to={comp.userId}> {comp.userEmail}</Link>)
		}
	</div >;
};

export default AdminSupportPage;
