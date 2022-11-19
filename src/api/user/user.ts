import { UserInterface, TokenResponse } from "_types/index";
import { useMutation, useQuery } from "@tanstack/react-query";
import { instance } from "config/axiosConfig";
import { AxiosError } from "axios";

// Get user
const getUser = async (id: number): Promise<UserInterface> => {
	const response = await instance.get<UserInterface>(`/user/${id}`);
	return response.data;
};

const useGetUser = (id: number) => useQuery<UserInterface, Error>(["user", id], () => getUser(id));

// Create user
const createUser = async (username: string, password: string) => {
	try {
		const response = await instance.post<TokenResponse>("/users/", { username, password });
		return response.data;
	} catch (error) {
		throw error as AxiosError;
	}
};

const useCreateUser = (username: string, password: string) =>
	useMutation(() => createUser(username, password), {
		onError: (error: AxiosError) => error.response!.data,
		onSuccess: () => "hola",
	});
export { useGetUser, useCreateUser };
