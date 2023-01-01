import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "store/store";
import { useSelector } from "react-redux";
import { useProvideAuth } from "hooks/useAuth";
import { useState, useEffect } from "react"

export const AuthRoute = () => {
	const token = useSelector((state: RootState) => state.user.tokens);
	const { getSignedUser } = useProvideAuth()
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		if (token) setIsLoading(false)
	}, [token])

	if (!token) {
		getSignedUser()
	}

	return (
		<>
			{isLoading ? <p>loading</p> : token ? <Outlet /> : <Navigate to='/login' />}
		</>
	)
};
