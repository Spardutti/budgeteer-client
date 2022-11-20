import { apiManager } from "api";
import axios from "axios";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "store/store";
import { getTokens, getUser } from "store/slices/user/action";
import { TokensInterface, UserInterface } from "_types";
import { useNavigate } from "react-router-dom";

export const Login = () => {
	type FormData = {
		username: string;
		password: string;
	};
	const navigate = useNavigate();
	const [loginErrors, setLoginErrors] = useState();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const dispatch = useAppDispatch();

	const setTokens = (tokens: TokensInterface) => {
		getTokens(dispatch, tokens);
	};

	const setUser = (user: UserInterface) => {
		getUser(dispatch, user);
	};

	const login = async (username: string, password: string) => {
		try {
			setIsLoading(true);
			const response = await apiManager.loginUser(username, password);
			if (response.status == 200) {
				setTokens(response.data);
				const user = await apiManager.getUser(response.data.access);
				setUser(user.data);
				setIsLoading(false);
				navigate("/home");
			}
		} catch (err) {
			if (axios.isAxiosError(err)) {
				const data = err.response?.data;
				setLoginErrors(data);
				setIsLoading(false);
			}
		}
	};
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<FormData>({ mode: "onChange" });
	const onSubmit: SubmitHandler<FormData> = (data) => {
		const { username, password } = data;

		login(username, password);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<label>Username</label>
			<input {...register("username", { required: true })} />
			{loginErrors ? <label>{loginErrors["username"]}</label> : null}
			{errors.username?.type === "required" && <label>Username is required</label>}
			<label>Password</label>
			<input type='password' {...register("password", { required: true, minLength: 5 })} />
			{loginErrors ? <label>{loginErrors["password"]}</label> : null}
			{errors.password?.type === "minLength" && <label>Password must be at least 5 chars long</label>}
			{errors.password?.type === "required" && <label>Password is required</label>}
			<button type='submit' disabled={!isValid || isLoading}>
				{isLoading ? "Loading" : "Sign in"}
			</button>
		</form>
	);
};
