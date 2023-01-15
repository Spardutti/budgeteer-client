import { instance } from "config/axiosConfig";
import { Expense } from "_types";

// Get all the expenses from a single category
const getCategoyExpenses = async (categoryId: number, token: string) =>
	await instance.get<Expense[]>(`/expense/?category_id=${categoryId}`, {
		headers: { Authorization: `Bearer ${token}` },
	});

// Create a expense that belongs to a category
const createExpense = async (category: number, token: string, amount: number, description: string) =>
	await instance.post<Expense>(
		"/expense/",
		{ amount, description, category },
		{ headers: { Authorization: `Bearer ${token}` } }
	);

// Edit expense details
const editExpense = async (expenseId: number, token: string, amount: number, description: string) =>
	await instance.patch<Expense>(
		`/expense/${expenseId}/`,
		{ amount, description },
		{ headers: { Authorization: `Bearer ${token}` } }
	);

export { getCategoyExpenses, createExpense, editExpense };
