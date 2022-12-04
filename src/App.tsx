import { FormsManager } from "components/forms/FormsManager";
import { BrowserRouter, Routes, Route, useRoutes } from "react-router-dom";
import { AuthRoute } from "components/auth/AuthRoute";
import { Provider } from "react-redux";
import store from "store/store";
import { Home } from "components/home/home";

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
					<Route path='/create' element={<AuthRoute />}>
						<Route path='/create' element={<FormsManager.CreateUser />} />
					</Route>
					<Route path='/home' element={<Home />} />
				</Routes>
			</Provider>
		</BrowserRouter>
	);
}

export default App;
