import { AppDispatch } from "store/store";
import { WeeklyCategory } from "_types";
import NAME from "./weeklyCategorySlice";

// Get user categories
const setCategories = (weeklyCategories: WeeklyCategory[]) => ({
	type: `${NAME}/getAllCategories`,
	payload: weeklyCategories,
});

export const getCategories = (dispatch: AppDispatch, weeklyCategories: WeeklyCategory[]) =>
	dispatch(setCategories(weeklyCategories));
