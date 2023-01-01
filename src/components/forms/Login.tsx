import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Center, FormControl, FormErrorMessage, FormLabel, Input, useBoolean } from "@chakra-ui/react";
import { useProvideAuth } from "hooks/useAuth";

export const Login = () => {
	type FormData = {
		username: string;
		password: string;
	};
	const [isLoading, setIsLoading] = useBoolean();

	const { signin, loginErrors, setLoginErrors } = useProvideAuth()
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isValid },
	} = useForm<FormData>({ mode: "onChange" });

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		setIsLoading.on()
		const { username, password } = data;
		await signin(username, password)
		setIsLoading.off()
	};
	watch(() => setLoginErrors(undefined))

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<FormControl isInvalid={Boolean(errors.username)}>
				<FormLabel htmlFor='username'>Username</FormLabel>
				<Input
					placeholder='username'
					{...register("username", { required: "Username is required" })}
					disabled={isLoading}
				/>
				<FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>
				<FormLabel>{loginErrors && loginErrors["username"]}</FormLabel>
			</FormControl>
			<FormControl isInvalid={Boolean(errors.password)}>
				<FormLabel htmlFor='password'>Password</FormLabel>
				<Input
					disabled={isLoading}
					type='password'
					autoComplete='off'
					placeholder='password'
					{...register("password", {
						required: "password is required",
					})}
				/>
				<FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
				<FormLabel>{loginErrors && loginErrors["password"]}</FormLabel>
				<FormLabel>{loginErrors && loginErrors["detail"]}</FormLabel>
			</FormControl>
			<Center>
				<Button mt={4} type='submit' isLoading={isLoading} disabled={!isValid || isLoading}>
					Sign in
				</Button>
			</Center>
		</form>
	);
};
