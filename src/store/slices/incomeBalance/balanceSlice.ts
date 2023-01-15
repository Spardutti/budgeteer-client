import { createSlice } from "@reduxjs/toolkit";

type StateType = { balance: number; expense: number };

const initialState: StateType = {
	balance: 0,
	expense: 0,
};

const balanceSlice = createSlice({
	name: "expenses",
	initialState,
	reducers: {
		addMonthBalance: (state, action) => {
			state.balance += action.payload;
		},
		setMonthBalance: (state, action) => {
			state.balance = action.payload;
		},
		setExpenseAmount: (state, action) => {
			state.expense = action.payload;
		},
		addExpenseAmount: (state, action) => {
			state.expense += action.payload;
		},
	},
});

export default balanceSlice.reducer;
