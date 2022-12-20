import { WeeklyCategory } from "_types/index";
import { createSlice } from "@reduxjs/toolkit";

type StateType = {
	weeklyCategory: WeeklyCategory[] | undefined;
};

const initialState: StateType = {
	weeklyCategory: undefined,
};

export const NAME = "weeklyCategory";

const weeklyCategorySlice = createSlice({
	name: NAME,
	initialState,
	reducers: {
		getAllCategories: (state, action) => {
			console.log(action.payload);
		},
	},
});

export default weeklyCategorySlice.reducer;
