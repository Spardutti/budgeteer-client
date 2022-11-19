import { apiManager } from "api";
import axios from "axios";
import { useState } from "react";

export const Login = () => {
	const [loginErrors, setLoginErrors] = useState();
	const { mutateAsync, error, isLoading } = apiManager.useCreateUser("Churu", "");

	const create = async () => {
		try {
			const x = mutateAsync();
		} catch (error) {}
	};

	if (error) {
		console.log("ERR", error);
		if (axios.isAxiosError(error)) {
			const data = error.response?.data;
			setLoginErrors(data);
		}
	}

	return (
		<>
			<>
				<div>Home</div>
				<button onClick={create}>click</button>
				{loginErrors ? loginErrors["username"] : null}
			</>
		</>
	);
};
