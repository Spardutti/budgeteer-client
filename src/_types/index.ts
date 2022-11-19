export interface UserInterface {
	username: string;
	amount: number;
}

export interface WeeklyCategory {
	name: string;
	user: UserInterface;
	year: number;
	month: number;
	week: number;
	amount: number;
}

export interface WeeklyExpense {
	user: UserInterface;
	weeklyCategory: WeeklyCategory;
	amount: number;
}

export interface MonthlyIncome {
	user: UserInterface;
	amount: number;
	year: number;
	month: number;
	week: number;
}

export interface TokenResponse {
	access: string;
	refresh: string;
}
