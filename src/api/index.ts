import { getUser, createUser, loginUser } from "./user/user";
import {
	createCategory,
	getAllCategories,
	getMonthCategories,
	updateCategoryAmount,
} from "./weeklyCategory/weeklyCategory";

import { updateMonthlyIncomeAmount, getMonhlyIncome } from "./monthlyIncome/monthlyIncome";
export const apiManager = {
	createUser,
	getUser,
	loginUser,

	// Categories
	createCategory,
	getAllCategories,
	getMonthCategories,
	updateCategoryAmount,

	// Monthly Income
	updateMonthlyIncomeAmount,
	getMonhlyIncome,
};
