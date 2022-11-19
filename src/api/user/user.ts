import { AxiosError, AxiosResponse } from "axios";
import { UserInterface, TokenResponse } from "_types/index";
import { useMutation, useQuery } from "@tanstack/react-query";
import { instance } from "config/axiosConfig";

// Get user
const getUser = async (id: number): Promise<UserInterface | AxiosError> => {
	try {
		const response = await instance.get<UserInterface>(`/user/${id}`);
		return response.data;
	} catch (error) {
		return error as AxiosError;
	}
};

// Create user
const createUser = async (username: string, password: string) => {
	const response = await instance.post<TokenResponse>("/users/", { username, password });
	return response;
};

export { getUser, createUser };
