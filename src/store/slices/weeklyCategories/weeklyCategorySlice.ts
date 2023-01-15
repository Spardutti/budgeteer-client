import { Category } from "_types/index";
import { createSlice } from "@reduxjs/toolkit";

type StateType = {
	weeklyCategory: Category[] | undefined;
};

const initialState: StateType = {
	weeklyCategory: undefined,
};

export const NAME = "weeklyCategory";

const weeklyCategorySlice = createSlice({
	name: NAME,
	initialState,
	reducers: {
		getAllCategories: (state, action) => {},
	},
});

export default weeklyCategorySlice.reducer;
