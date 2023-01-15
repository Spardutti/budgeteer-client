import { getUser, createUser, loginUser } from "./user/user";
import {
	createCategory,
	getAllCategories,
	getMonthCategories,
	updateCategoryAmount,
	getUniqueMonths,
	deleteCategory,
} from "./weeklyCategory/category";

import { getCategoyExpenses, createExpense, editExpense } from "./expense/expense";

export const apiManager = {
	createUser,
	getUser,
	loginUser,

	// Categories
	createCategory,
	getAllCategories,
	getMonthCategories,
	updateCategoryAmount,
	getUniqueMonths,
	deleteCategory,

	// Expenses
	getCategoyExpenses,
	createExpense,
	editExpense,
};
