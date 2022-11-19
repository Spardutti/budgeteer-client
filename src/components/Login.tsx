import { apiManager } from "api";
import { useState } from "react";

export const Login = () => {
	interface LoginErrors {
		errors: { username?: string[]; password?: string[] };
	}
	const [loginErrors, setLoginErrors] = useState<LoginErrors>();
	const { mutateAsync, error, isLoading } = apiManager.useCreateUser("Churu", "");

	const create = async () => {
		try {
			const x = mutateAsync();
		} catch (error) {
			console.log("ERR", error);
			throw error;
		}
	};

	if (error) {
		return <p>errors</p>;
	}
	return (
		<>
			<>
				<div>Home</div>
				<button onClick={create}>click</button>
			</>
		</>
	);
};
