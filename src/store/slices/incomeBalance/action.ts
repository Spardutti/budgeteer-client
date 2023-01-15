import { AppDispatch } from "store/store";

// Set expense amount
const setExpense = (amount: number) => ({
	type: "expenses/setExpenseAmount",
	payload: amount,
});

export const setExpenseAmount = (dispatch: AppDispatch, amount: number) => dispatch(setExpense(amount));

// Add expense amount
const addExpense = (amount: number) => ({
	type: "expenses/addExpenseAmount",
	payload: amount,
});

export const addExpenseAmount = (dispatch: AppDispatch, amount: number) => dispatch(addExpense(amount));

// Add account balance
const addBalance = (amount: number) => ({
	type: "expenses/addMonthBalance",
	payload: amount,
});

export const addMonthBalance = (dispatch: AppDispatch, amount: number) => dispatch(addBalance(amount));

// Set account balance
const setBalance = (account_balance: number) => ({
	type: "expenses/setMonthBalance",
	payload: account_balance,
});

export const setMonthBalance = (dispatch: AppDispatch, account_balance: number) =>
	dispatch(setBalance(account_balance));
