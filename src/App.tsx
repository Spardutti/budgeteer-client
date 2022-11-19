import { apiManager } from "api";
import React from "react";

function App() {
	const { mutateAsync, error } = apiManager.useCreateUser("Churu", 1234);

	const create = () => mutateAsync();

	if (error) console.log("X", error);
	return (
		<>
			<div>Home</div>
			<button onClick={create} />
		</>
	);
}

export default App;
