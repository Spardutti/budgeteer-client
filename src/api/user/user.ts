import { UserInterface, TokenResponse } from "_types/index";
import { useMutation, useQuery } from "@tanstack/react-query";
import { instance } from "config/axiosConfig";

// Get user
const getUser = async (id: number): Promise<UserInterface> => {
	const response = await instance.get<UserInterface>(`/user/${id}`);
	return response.data;
};

const useGetUser = (id: number) => useQuery<UserInterface, Error>(["user", id], () => getUser(id));

// Create user
const createUser = async (username: string, password: number): Promise<TokenResponse> => {
	const response = await instance.post<TokenResponse>("/token/", { body: { username, password } });
	return response.data;
};

const useCreateUser = (username: string, password: number) =>
	useMutation(() => createUser(username, password), {
		onError: (error) => console.log("error", error),
	});
export { useGetUser, useCreateUser };
