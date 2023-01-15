import { AppDispatch } from "store/store";
import { Category } from "_types";
import NAME from "./weeklyCategorySlice";

// Get user categories
const setCategories = (weeklyCategories: Category[]) => ({
	type: `${NAME}/getAllCategories`,
	payload: weeklyCategories,
});

export const getCategories = (dispatch: AppDispatch, weeklyCategories: Category[]) =>
	dispatch(setCategories(weeklyCategories));
