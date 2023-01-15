import { TokensInterface, UserInterface } from "_types/index";
import { AppDispatch } from "store/store";

// Get user info
const userInfo = (user: UserInterface) => ({
	type: "user/getUser",
	payload: user,
});

export const getUser = (dispatch: AppDispatch, user: UserInterface | null) => dispatch(userInfo(user!));

// Get user Tokens
const userTokens = (tokens: TokensInterface) => ({
	type: "user/getTokens",
	payload: tokens,
});

export const getTokens = (dispatch: AppDispatch, tokens: TokensInterface) => dispatch(userTokens(tokens));
