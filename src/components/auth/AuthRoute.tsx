import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "store/store";
import { useSelector } from "react-redux";
import useLocalStorage from "hooks/useLocalStorage";
import { useProvideAuth } from "hooks/useAuth";
import { useBoolean } from "@chakra-ui/react";
import { useState, useEffect } from "react"

export const AuthRoute = () => {
	const [localToken] = useLocalStorage('budgeteer-token', '')
	const token = useSelector((state: RootState) => state.user.tokens);
	const { getSignedUser } = useProvideAuth()
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		if (token) setIsLoading(false)
	}, [token])

	if (!token) {
		getSignedUser()
	}

	// if (isLoading) return <p>Loading</p>
	// console.log(isLoading)
	// if (isLoading) return <p>Loading</p>
	return (
		<>
			{isLoading ? <p>loading</p> : token ? <Outlet /> : <Navigate to='/login' />}
		</>
	)
};
