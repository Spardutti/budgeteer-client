import { FormsManager } from "components/forms/FormsManager";
import { HashRouter, Routes, Route, useRoutes, Navigate } from "react-router-dom";
import { AuthRoute } from "components/auth/AuthRoute";
import { Provider } from "react-redux";
import { Home } from "components/home/Home"
import store from "store/store";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme/theme";

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
		<HashRouter  >
			<Provider store={store}>
				<ChakraProvider theme={theme}>
					<Routes>
						<Route path='/' element={<Navigate to={"/home"} />} />
						<Route path='/login' element={<FormsManager.Login />} />
						<Route path='/create' element={<FormsManager.CreateUser />} />
						<Route path='/home' element={<AuthRoute />}>
							<Route path='/home' element={<Home />} />
						</Route>
					</Routes>
				</ChakraProvider>
			</Provider>
		</HashRouter>
	);
}

export default App;
