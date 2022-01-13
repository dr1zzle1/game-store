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
import { doc, setDoc } from "firebase/firestore/lite";

function App() {
	const { user } = useContext(AuthContext);

	return (
		<div className="App"><Header />
			<Routes>
				<Route path="/" element={<HomePage />}>
				</Route>
				<Route path='/game/:id' element={<GamePage />}></Route>
				<Route path='/cart' element={<CartPage />}></Route>
				{
					!user && <Route path="/login" element={<LoginPage />} />
				}
				{
					!user && <Route path="/register" element={<RegisterPage />} />
				}
			</Routes >
		</div>
	);
}

export default App;

