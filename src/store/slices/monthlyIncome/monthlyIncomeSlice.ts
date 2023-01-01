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
		setMonthlyAmount: (state, action) => {
			state.amount = action.payload;
		},
		addMonthlyAmount: (state, action) => {
			console.log(action.payload);
			state.amount += action.payload;
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
