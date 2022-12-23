import { createSlice } from "@reduxjs/toolkit";

type StateType = { amount: number; accountBalance: number };

const initialState: StateType = {
	amount: 0,
	accountBalance: 0,
};

const monthlyIncomeSlice = createSlice({
	name: "monthlyIncome",
	initialState,
	reducers: {
		setAmount: (state, action) => {
			if (state.amount === 0) state.amount = action.payload.amount;
			if (state.amount) state.amount += action.payload;
			else state.amount = action.payload;
		},
		addAccountBalance: (state, action) => {
			state.accountBalance += action.payload;
		},
		setAccountBalance: (state, action) => {
			state.accountBalance = action.payload;
		},
	},
});

export default monthlyIncomeSlice.reducer;
