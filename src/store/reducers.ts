import { combineReducers } from "@reduxjs/toolkit";
import user from "./slices/user/userSlice";
import balance from "./slices/incomeBalance/balanceSlice";

const rootReducer = combineReducers({
	user,
	balance,
});

export default rootReducer;
