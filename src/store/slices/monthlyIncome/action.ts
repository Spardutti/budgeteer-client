import { AppDispatch } from "store/store";

// Update user amount
const monthlyAmount = (amount: number, operator: string) => ({
	type: "monthlyIncome/setAmount",
	payload: { amount, operator },
});

export const setMonthlyAmount = (dispatch: AppDispatch, amount: number, operator: string) =>
	dispatch(monthlyAmount(amount, operator));
