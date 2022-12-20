import { instance } from "config/axiosConfig";
// Get monhly income
const getMonhlyIncome = async (token: string) =>
	await instance.get("/monthlyincome/1/", { headers: { Authorization: `Bearer ${token}` } });

// Update Monthly Income Amount
const updateMonthlyIncomeAmount = async (token: string, amount: number) =>
	await instance.patch("/monthlyincome/1/", { amount }, { headers: { Authorization: `Bearer ${token}` } });

export { updateMonthlyIncomeAmount, getMonhlyIncome };
