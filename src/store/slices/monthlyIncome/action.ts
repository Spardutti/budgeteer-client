import { AppDispatch } from "store/store";

// Set user amount
const setMonthly = (amount: number) => ({
	type: "monthlyIncome/setMonthlyAmount",
	// payload: { amount, operator },
	payload: amount,
});

export const setMonthlyAmount = (dispatch: AppDispatch, amount: number) => dispatch(setMonthly(amount));

// Add monthly amount
const addMonthly = (amount: number) => ({
	type: "monthlyIncome/addMonthlyAmount",
	payload: amount,
});

export const addMonthlyAmount = (dispatch: AppDispatch, amount: number) => dispatch(addMonthly(amount));

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
