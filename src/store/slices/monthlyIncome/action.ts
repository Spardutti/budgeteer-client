import { AppDispatch } from "store/store";

// Update user amount
const monthlyAmount = (amount: number) => ({
	type: "monthlyIncome/setAmount",
	// payload: { amount, operator },
	payload: amount,
});

export const setMonthlyAmount = (dispatch: AppDispatch, amount: number) => dispatch(monthlyAmount(amount));

// Add account balance
const addBalance = (amount: number) => ({
	type: "monthlyIncome/addAccountBalance",
	payload: amount,
});

export const addAccountBalance = (dispatch: AppDispatch, amount: number) => dispatch(addBalance(amount));

// Set account balance
const setBalance = (account_balance: number) => ({
	type: "monthlyIncome/setAccountBalance",
	payload: account_balance,
});

export const setAccountBalance = (dispatch: AppDispatch, account_balance: number) =>
	dispatch(setBalance(account_balance));
