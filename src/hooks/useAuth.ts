import axios from "axios";
import { UserInterface } from "./../_types/index";
import { apiManager } from "api";
import { useState } from "react";
import { getTokens, getUser } from "store/slices/user/action";
import { useAppDispatch } from "store/store";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "./useLocalStorage";

export const useProvideAuth = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [user, setUser] = useState<UserInterface>();
	const [loginErrors, setLoginErrors] = useState();
	const [token, setToken] = useLocalStorage("budgeteer-token", "");

	const signin = async (username: string, password: string) => {
		try {
			const response = await apiManager.loginUser(username, password);
			const userInfo = await apiManager.getUser(response.data.access);
			getTokens(dispatch, response.data);
			getUser(dispatch, userInfo.data);
			setToken(response.data.access);
			setUser(userInfo.data);
			navigate("/home");
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const msg = error.response?.data;
				setLoginErrors(msg);
			}
		}
	};

	const getSignedUser = async () => {
		try {
			const userInfo = await apiManager.getUser(token);
			getUser(dispatch, userInfo.data);
			getTokens(dispatch, { access: token, refresh: "" });
			navigate("/home");
		} catch (error) {
			navigate("/login");
		}
	};

	const signup = async (username: string, password: string) => {
		const response = await apiManager.createUser(username, password);
		setUser(response.data);
		return response.data;
	};

	const signout = () => {
		setUser(undefined);
		setToken("");
		getUser(dispatch, null);
		getTokens(dispatch, { access: "", refresh: "" });
		navigate("/login");
	};

	return {
		user,
		loginErrors,
		setLoginErrors,
		signin,
		signup,
		signout,
		getSignedUser,
	};
};
