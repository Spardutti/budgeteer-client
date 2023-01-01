import { FormsManager } from "components/forms/FormsManager";
import { BrowserRouter, Routes, Route, useRoutes, Navigate } from "react-router-dom";
import { AuthRoute } from "components/Auth/AuthRoute";
import { Provider } from "react-redux";
import { Home } from "components/Home/Home"
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
		<BrowserRouter>
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
		</BrowserRouter>
	);
}

export default App;
