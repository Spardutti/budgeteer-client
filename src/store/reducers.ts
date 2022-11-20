import { combineReducers } from "@reduxjs/toolkit";
import user from "./slices/user/userSlice";

const rootReducer = combineReducers({
	user,
});

export default rootReducer;
