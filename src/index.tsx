import React, { createContext, Dispatch, FC, SetStateAction, useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './store';
import { initializeApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore/lite';
import { Auth, getAuth, onAuthStateChanged } from 'firebase/auth';

const app = initializeApp({
	apiKey: "AIzaSyDcBX_-uKTewLgt0TdihrvHWHxFSGG-rdg",
	authDomain: "game-store-7d2d6.firebaseapp.com",
	projectId: "game-store-7d2d6",
	storageBucket: "game-store-7d2d6.appspot.com",
	messagingSenderId: "461813350020",
	appId: "1:461813350020:web:42d3128919d70ffd90ccd1"
});
const db = getFirestore(app);

interface IContext {
	user: any,
	setUser: Dispatch<SetStateAction<any>>,
	ga: Auth,
	db: Firestore
}

export const AuthContext = createContext({} as IContext)

const AuthProvider: FC = ({ children }) => {
	const [user, setUser] = useState<any>(null)
	const ga = getAuth()
	useEffect(() => {
		const unListen = onAuthStateChanged(ga, authUser => {
			setUser(authUser || null)
		})
		return () => {
			unListen()
		}
	}, [ga])
	const values = useMemo(() => ({ user, setUser, ga, db }), [user, ga])
	return (
		<AuthContext.Provider value={values}>{children}</AuthContext.Provider>
	)
}

ReactDOM.render(
	<React.StrictMode>
		<AuthProvider>
			<Provider store={store}>
				<HashRouter>
					<App />
				</HashRouter>
			</Provider>
		</AuthProvider>
	</React.StrictMode>,
	document.getElementById('root')
);