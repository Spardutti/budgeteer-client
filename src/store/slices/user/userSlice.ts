import { TokensInterface } from "_types/index";
import { createSlice } from "@reduxjs/toolkit";
import { UserInterface } from "_types/index";

type StateType = { user: UserInterface | null; tokens: TokensInterface | null; loading: boolean };

const initialState: StateType = {
	user: null,
	tokens: null,
	loading: false,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		getUser: (state, action) => {
			state.user = action.payload;
		},
		getTokens: (state, action) => {
			state.tokens = action.payload;
		},
		updateUser: (state, action) => {
			console.log(action.payload);
		},
		setAmount: (state, action) => {
			state.user!.amount = action.payload;
		},
	},
});

export default userSlice.reducer;
