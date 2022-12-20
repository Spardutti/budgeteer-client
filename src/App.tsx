import { FormsManager } from "components/forms/FormsManager";
import { BrowserRouter, Routes, Route, useRoutes } from "react-router-dom";
import { AuthRoute } from "components/auth/AuthRoute";
import { Provider } from "react-redux";
import { Home } from "components/home/Home";
import store from "store/store";

function App() {
	const Nav = () =>
		useRoutes([
			// { path: "/home", element: <NavBar /> },
			// { path: "/upcoming", element: <NavBar /> },
			// { path: "/category/:categoryId", element: <NavBar /> },
			// { path: "/history", element: <NavBar /> },
			// {},
		]);
	return (
		<BrowserRouter>
			<Provider store={store}>
				<Routes>
					<Route path='/' element={<FormsManager.CreateUser />} />
					<Route path='/login' element={<FormsManager.Login />} />
					<Route path='/home' element={<AuthRoute />}>
						<Route path='/home' element={<Home />} />
					</Route>
				</Routes>
			</Provider>
		</BrowserRouter>
	);
}

export default App;
