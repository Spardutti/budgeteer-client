import { WeeklyCategory } from "_types/index";
import { instance } from "config/axiosConfig";

// Create category
const createCategory = async (name: string, token: string) =>
	await instance.post<WeeklyCategory>("/categories/", { name }, { headers: { Authorization: `Bearer ${token}` } });

// Get all user Categories
const getAllCategories = async (token: string) =>
	await instance.get<WeeklyCategory[]>("/categories/", { headers: { Authorization: `Bearer ${token}` } });

// Get user current month & year categories
const getMonthCategories = async (token: string, year: number, month: number) =>
	await instance.get<WeeklyCategory[]>(`/categories/monthly/?year=${year}&month=${month}`, {
		headers: { AUthorization: `Bearer ${token}` },
	});

// Update selected category amount
const updateCategoryAmount = async (token: string, amount: number, id: number) =>
	await instance.patch<WeeklyCategory>(
		`/categories/${id}/`,
		{ amount },
		{ headers: { Authorization: `Bearer ${token}` } }
	);

// Get unique months with data
const getUniqueMonths = async (token: string) =>
	await instance.get("/categories/unique_months/", { headers: { Authorization: `Bearer ${token}` } });

export { createCategory, getAllCategories, getMonthCategories, updateCategoryAmount, getUniqueMonths };
