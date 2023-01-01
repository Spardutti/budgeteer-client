import { combineReducers } from "@reduxjs/toolkit";
import user from "./slices/user/userSlice";
import monthlyIncome from "./slices/monthlyIncome/monthlyIncomeSlice";

const rootReducer = combineReducers({
	user,
	monthlyIncome,
});

export default rootReducer;
