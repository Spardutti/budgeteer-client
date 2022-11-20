import { Navigate, Outlet } from "react-router-dom";
import { useState } from "react";
import { RootState } from "store/store";
import { useSelector } from "react-redux";

export const AuthRoute = () => {
	const token = useSelector((state: RootState) => state.user.tokens);

	if (!token) {
		//fetch from LocalStorage
	}

	return token ? <Outlet /> : <Navigate to='/' />;
};
