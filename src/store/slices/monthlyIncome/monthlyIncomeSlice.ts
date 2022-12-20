import { createSlice } from "@reduxjs/toolkit";

type StateType = { amount: number };

const initialState: StateType = {
	amount: 0,
};

const monthlyIncomeSlice = createSlice({
	name: "monthlyIncome",
	initialState,
	reducers: {
		setAmount: (state, action) => {
			if (action.payload < 0) state.amount += action.payload;
			else state.amount -= action.payload;
		},
	},
});

export default monthlyIncomeSlice.reducer;
