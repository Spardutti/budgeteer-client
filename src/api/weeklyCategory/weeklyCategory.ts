import { AxiosError, AxiosResponse } from "axios";
import { UserInterface, TokensInterface, WeeklyCategory } from "_types/index";
import { useMutation, useQuery } from "@tanstack/react-query";
import { instance } from "config/axiosConfig";

// Create category
const createCategory = async (categoryName: string, token: string) =>
	await instance.post<WeeklyCategory>("/categories/", { headers: { Authorization: `Bearer ${token}` } });

export { createCategory };
