import { Category } from "_types/index";
import { instance } from "config/axiosConfig";

// Create category
const createCategory = async (name: string, budget: number, token: string) =>
	await instance.post<Category>("/categories/", { name, budget }, { headers: { Authorization: `Bearer ${token}` } });

// Get all user Categories
const getAllCategories = async (token: string) =>
	await instance.get<Category[]>("/categories/", { headers: { Authorization: `Bearer ${token}` } });

// Get user current month & year categories
const getMonthCategories = async (token: string, year: number, month: number) =>
	await instance.get<Category[]>(`/categories/monthly/?year=${year}&month=${month}`, {
		headers: { AUthorization: `Bearer ${token}` },
	});

// Update selected category amount
const updateCategoryAmount = async (token: string, amount: number, id: number) =>
	await instance.patch<Category>(`/categories/${id}/`, { amount }, { headers: { Authorization: `Bearer ${token}` } });

// Get unique months with data
const getUniqueMonths = async (token: string) =>
	await instance.get("/categories/unique_months/", { headers: { Authorization: `Bearer ${token}` } });

// Delete a category
const deleteCategory = async (token: string, id: number) =>
	await instance.delete(`/categories/${id}/`, { headers: { Authorization: `Bearer ${token}` } });

export { createCategory, getAllCategories, getMonthCategories, updateCategoryAmount, getUniqueMonths, deleteCategory };
