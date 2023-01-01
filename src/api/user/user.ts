import { UserInterface, TokensInterface } from "_types/index";
import { instance } from "config/axiosConfig";

// Get user
const getUser = async (token: string) =>
	await instance.get<UserInterface>(`/users/1/`, { headers: { Authorization: `Bearer ${token}` } });

// Login
const loginUser = async (username: string, password: string) =>
	await instance.post<TokensInterface>("/token/", { username, password });

// Create user
const createUser = async (username: string, password: string) =>
	await instance.post<UserInterface>("/users/", { username, password });

// Update user amount
const updateUserAmount = async (token: string, amount: number) =>
	await instance.patch<UserInterface>("/users/1/", { amount }, { headers: { Authorization: `Bearer ${token}` } });

export { getUser, createUser, loginUser, updateUserAmount };
