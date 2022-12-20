import { AppDispatch } from "store/store";

// Update user amount
const monthlyAmount = (amount: number) => ({
	type: "monthlyIncome/setAmount",
	payload: amount,
});

export const setMonthlyAmount = (dispatch: AppDispatch, amount: number) => dispatch(monthlyAmount(amount));
