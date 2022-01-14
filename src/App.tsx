import {
	Routes,
	Route
} from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import GamePage from "./pages/GamePage/GamePage";
import CartPage from "./pages/CartPage/CartPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import { useContext } from "react";
import { AuthContext } from "./index";
import ReviewsPage from "./pages/ReviewsPage/ReviewsPage";

function App() {
	const { user } = useContext(AuthContext);
	return (
		<div className="App"><Header />
			<Routes>
				<Route path="game-store/" element={<HomePage />}>
				</Route>
				<Route path='game-store/game/:id' element={<GamePage />}></Route>
				<Route path='game-store/cart' element={<CartPage />}></Route>
				<Route path='game-store/reviews' element={<ReviewsPage />}></Route>
				{
					!user && <Route path="game-store/login" element={<LoginPage />} />
				}
				{
					!user && <Route path="game-store/register" element={<RegisterPage />} />
				}
			</Routes >
		</div>
	);
}

export default App;

