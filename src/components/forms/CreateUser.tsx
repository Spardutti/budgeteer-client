import { apiManager } from "api";
import axios from "axios";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const CreateUser = () => {
	type FormData = {
		username: string;
		password: string;
	};

	const navigate = useNavigate();

	const [loginErrors, setLoginErrors] = useState();
	const create = async (username: string, password: string) => {
		try {
			const response = await apiManager.createUser(username, password);
			if (response.status == 201) {
				navigate("/login");
			}
		} catch (err) {
			if (axios.isAxiosError(err)) {
				const data = err.response?.data;
				setLoginErrors(data);
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

		create(username, password);
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
			<button type='submit' disabled={!isValid}>
				Create Account
			</button>
		</form>
	);
};
