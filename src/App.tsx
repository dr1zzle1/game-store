import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import GamePage from './pages/GamePage/GamePage';
import CartPage from './pages/CartPage/CartPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import { useContext } from 'react';
import { AuthContext } from './index';
import ReviewsPage from './pages/ReviewsPage/ReviewsPage';
import AdminPage from './pages/AdminPage/AdminPage';
import SupportPage from './pages/SupportPage/SupportPage';
import AdminSupportPage from './pages/AdminSupportPage/AdminSupportPage';
import AdminSupportDialog from './pages/AdminSupportPage/AdminSupportDialog';

function App() {
	const { user } = useContext(AuthContext);
	return (
		<div className="App">
			<Header />
			<Routes>
				<Route path="/" element={<HomePage />}></Route>
				<Route path="/game/:id" element={<GamePage />}></Route>
				<Route path="/cart" element={<CartPage />}></Route>
				<Route path="/reviews" element={<ReviewsPage />}></Route>
				<Route path="/support" element={<SupportPage user={user} />}></Route>
				{user?.email === 'admin@mail.ru' && <>
					<Route path="/admin" element={<AdminPage />}></Route>
					<Route path="/adminsupport" element={<AdminSupportPage />}></Route>
					<Route path="/adminsupport/:id" element={<AdminSupportDialog />}></Route>
				</>
				}
				{!user ? (
					<Route path="/login" element={<LoginPage />} />
				) : (
					<Route path="/login" element={<Navigate to="/" />} />
				)}
				{!user ? (
					<Route path="/register" element={<RegisterPage />} />
				) : (
					<Route path="/register" element={<Navigate to="/" />} />
				)}
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</div>
	);
}


export default App;
