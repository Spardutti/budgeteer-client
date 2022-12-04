import { Button, Center, FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
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
		formState: { errors, isValid, isSubmitting },
	} = useForm<FormData>({ mode: "onChange" });
	const onSubmit: SubmitHandler<FormData> = (data) => {
		const { username, password } = data;

		create(username, password);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<FormControl isInvalid={Boolean(errors.username)}>
				<FormLabel htmlFor='username'>Username</FormLabel>
				<Input placeholder='username' {...register("username", { required: "Username is required" })} />
				<FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>
			</FormControl>
			<FormControl isInvalid={Boolean(errors.password)}>
				<FormLabel htmlFor='password'>Password</FormLabel>
				<Input
					type='password'
					autoComplete='off'
					placeholder='password'
					{...register("password", {
						required: "password is required",
						minLength: { value: 5, message: "Must be at least 5 characters long" },
					})}
				/>
				<FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
			</FormControl>
			<Center>
				<Button mt={4} isLoading={isSubmitting} type='submit' disabled={!isValid}>
					Create Account
				</Button>
			</Center>
		</form>
	);
};
