import { AxiosError, AxiosResponse } from "axios";
import { UserInterface, TokensInterface } from "_types/index";
import { useMutation, useQuery } from "@tanstack/react-query";
import { instance } from "config/axiosConfig";

// Get user
const getUser = async (token: string) =>
	await instance.get<UserInterface>(`/user/`, { headers: { Authorization: `Bearer ${token}` } });
// Login
const loginUser = async (username: string, password: string) =>
	await instance.post<TokensInterface>("/token/", { username, password });

// Create user
const createUser = async (username: string, password: string) =>
	await instance.post<UserInterface>("/users/", { username, password });

export { getUser, createUser, loginUser };
