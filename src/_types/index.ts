import { DateTime } from "luxon";
export interface Category {
	name: string;
	user: UserInterface;
	date: DateTime;
	budget: number;
	id: number;
	isDeleted: boolean;
	position: number;
}

export interface Expense {
	id: number;
	description: string;
	date: DateTime;
	category: Category;
	amount: number;
}

export interface MonthlyIncome {
	user: UserInterface;
	amount: number;
	year: number;
	month: number;
	week: number;
}

export interface TokensInterface {
	access: string;
	refresh: string;
}

export interface UserInterface {
	id: number;
	username: string;
}
