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
			if (state.amount === 0) state.amount = action.payload.amount;
			else {
				action.payload.operator == "+"
					? (state.amount += action.payload.amount)
					: (state.amount -= action.payload.amount);
			}
		},
	},
});

export default monthlyIncomeSlice.reducer;
