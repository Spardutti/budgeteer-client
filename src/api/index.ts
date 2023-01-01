import { getUser, createUser, loginUser, updateUserAmount } from "./user/user";
import {
	createCategory,
	getAllCategories,
	getMonthCategories,
	updateCategoryAmount,
	getUniqueMonths,
} from "./weeklyCategory/weeklyCategory";

import { updateMonthlyIncomeAmount, getMonhlyIncome, updateAccountBalance } from "./monthlyIncome/monthlyIncome";
export const apiManager = {
	createUser,
	getUser,
	loginUser,
	updateUserAmount,

	// Categories
	createCategory,
	getAllCategories,
	getMonthCategories,
	updateCategoryAmount,
	getUniqueMonths,

	// Monthly Income
	updateMonthlyIncomeAmount,
	getMonhlyIncome,
	updateAccountBalance,
};
