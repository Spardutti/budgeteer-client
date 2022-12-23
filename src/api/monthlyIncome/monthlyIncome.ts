import { instance } from "config/axiosConfig";
// Get monhly income
const getMonhlyIncome = async (token: string) =>
	await instance.get("/monthlyincome/1/", { headers: { Authorization: `Bearer ${token}` } });

// Update Monthly Income Amount
const updateMonthlyIncomeAmount = async (token: string, amount: number, account_balance?: number) =>
	await instance.patch(
		"/monthlyincome/1/",
		{ amount, account_balance },
		{ headers: { Authorization: `Bearer ${token}` } }
	);

// Update account balance
const updateAccountBalance = async (token: string, account_balance: number) =>
	await instance.patch(
		"/monthlyincome/1/account_balance/",
		{ account_balance },
		{ headers: { Authorization: `Bearer ${token}` } }
	);

export { updateMonthlyIncomeAmount, getMonhlyIncome, updateAccountBalance };
