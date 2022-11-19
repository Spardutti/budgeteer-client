import { apiManager } from "api";
import axios, { Axios, AxiosError } from "axios";
import { useState } from "react";

function App() {
	const [errors, setErrors] = useState();
	const create = async () => {
		try {
			const response = await apiManager.createUser("Churus", "12345");
		} catch (err) {
			if (axios.isAxiosError(err)) {
				const data = err.response?.data;
				setErrors(data);
			}
		}
	};

	return (
		<>
			<div>Home</div>
			<button onClick={create}>Click</button>
			<p>Username</p>
			{errors ? errors["username"] : null}
			<p>Password</p>
			{errors ? errors["password"] : null}
		</>
	);
}

export default App;
