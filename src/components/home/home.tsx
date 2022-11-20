import { useSelector } from "react-redux";
import { RootState } from "store/store";

export const Home = () => {
	const userCategories = useSelector((state: RootState) => state.user.user?.categories);

	if (userCategories?.length == 0) {
		return (
			<div>
				<p>Please create a category</p>
			</div>
		);
	}
	return (
		<div>
			<p>home</p>
		</div>
	);
};
