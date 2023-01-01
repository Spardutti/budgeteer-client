import { DateTime } from "luxon";

//returns the week of the month from 1 - 6
const weekOfMonth = () => {
	const date = DateTime.now();
	const week_day: number = date.weekday;
	const month_day: number = date.day;
	return Math.ceil((month_day + 6 - week_day) / 7) + 1;
};

export { weekOfMonth };
