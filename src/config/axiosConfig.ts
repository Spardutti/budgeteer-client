import axios from "axios";

export const instance = axios.create({
	//TODO set this dinamic with env
	baseURL: "https://budgeteer-dockerless.onrender.com",
	// baseURL: "http://localhost:5000",
	headers: {
		"Content-Type": "application/json",
	},
});
