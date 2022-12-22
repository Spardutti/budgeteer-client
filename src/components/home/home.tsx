import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { FormsManager } from "components/forms/FormsManager";
import { useEffect, useState } from "react";
import { apiManager } from "api";
import { WeeklyCategory } from "_types";
import { CardsManager } from "components/cards/CardsManagers";
import { Box, Button, Divider, Heading, HStack, useBoolean } from "@chakra-ui/react";
import { DateTime } from "luxon";
import { weekOfMonth } from "utils/utils";
import MonthlyIncome from "components/monthlyIncome/MonthlyIncome";

export const Home = () => {
	const token = useSelector((state: RootState) => state.user.tokens?.access);
	const [currentWeekcategories, setCurrentWeekCategories] = useState<WeeklyCategory[]>([]);
	const [otherCategories, setOtherCategories] = useState<WeeklyCategory[]>([]);
	const [monthYear, setMonthYear] = useState({
		monthLong: DateTime.now().monthLong,
		year: DateTime.now().year,
		month: DateTime.now().month
	});
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [isAddNewCategory, setIsAddNewCategory] = useBoolean();


	useEffect(() => {
		getMonthCategories();
	}, []);

	// Get the categories of this month
	const getMonthCategories = async () => {
		setIsLoading(true)
		const response = await apiManager.getMonthCategories(token!, monthYear.year, monthYear.month);
		if (response.status === 200) {
			const currentCategories: WeeklyCategory[] = [];
			const otherCategories: WeeklyCategory[] = [];
			response.data.forEach((cat: WeeklyCategory) => {
				if (cat.week === weekOfMonth()) currentCategories.push(cat)
				else otherCategories.push(cat)
			});
			setCurrentWeekCategories(currentCategories);
			setOtherCategories(otherCategories);
		}
		setIsLoading(false)
	};

	if (isLoading) return <Box textAlign={"center"}>Loading</Box>

	if (currentWeekcategories.length === 0 && !isLoading) return <FormsManager.CreateCategory updateState={setCurrentWeekCategories} />;

	return (
		<Box>
			<Heading size={"lg"} textAlign='center' my={10}>
				{monthYear.monthLong.toUpperCase()} - {monthYear.year}
			</Heading>
			<Button onClick={setIsAddNewCategory.toggle}>{!isAddNewCategory ? "Create new category" : "Hide"}</Button>
			{isAddNewCategory && <FormsManager.CreateCategory updateState={setCurrentWeekCategories} />}
			<Divider py={2} />
			<MonthlyIncome />
			<Heading size={"md"} textAlign='center' pt={2}>
				Week # {weekOfMonth()}
			</Heading>
			<CurrentWeekCategories currentWeekCategories={currentWeekcategories} />
			<OtherWeekCategories otherWeekCategories={otherCategories} />

		</Box>
	);
};

// Display current week categories of current month on top
const CurrentWeekCategories: React.FC<{ currentWeekCategories: WeeklyCategory[] }> = ({ currentWeekCategories }) => (
	<HStack spacing={"20"} m={4}>
		{currentWeekCategories?.map((cat: WeeklyCategory, idx: number) => (
			<CardsManager.WeeklyCategoryCard {...cat} key={idx} />
		))}
	</HStack>
);

// Display categories that do not belong to the current week
const OtherWeekCategories: React.FC<{ otherWeekCategories: WeeklyCategory[] }> = ({ otherWeekCategories }) => {
	const arr = otherWeekCategories.sort((a, b) => a.week - b.week);
	const weeks: number[] = [];
	for (let w in arr) {
		let week = arr[w].week;
		if (weeks.indexOf(week) === -1) weeks.push(week);
	}

	return (
		<>
			{weeks &&
				weeks.map((w: number, idx: number) => {
					return (
						<Box key={idx}>
							<Heading size={"md"} textAlign='center' pt={2}>
								Week # {w}
							</Heading>
							<HStack spacing={"20"} m={4}>
								{arr.map((cat: WeeklyCategory, index: number) => {
									if (cat.week === w) {
										return <CardsManager.WeeklyCategoryCard {...cat} key={index} />;
									}
								})}
							</HStack>
						</Box>
					);
				})}
		</>
	);
};
