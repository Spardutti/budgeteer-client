import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { FormsManager } from "components/forms/FormsManager";
import { useEffect, useState } from "react";
import { apiManager } from "api";
import { Category } from "_types";
import { CardsManager } from "components/cards/CardsManagers";
import { Box, Button, Divider, Heading, HStack, SimpleGrid, useBoolean } from "@chakra-ui/react";
import { DateTime, Info } from "luxon";
import { weekOfMonth } from "utils/utils";
import IncomeBalance from "components/balance/IncomeBalance";
import Layout from "layout/Layout";
import ProfileMenu from "components/profile/ProfileMenu";

export const Home = () => {
	const token = useSelector((state: RootState) => state.user.tokens?.access);
	const [currentWeekCategories, setCurrentWeekCategories] = useState<Category[]>([]);
	const [otherCategories, setOtherCategories] = useState<Category[]>([]);
	const [monthYear, setMonthYear] = useState<{ monthLong: string; year: number; month: number }>({
		monthLong: DateTime.now().monthLong,
		year: DateTime.now().year,
		month: DateTime.now().month,
	});
	const [year, setYear] = useState<number>(DateTime.now().year);
	const [uniqueMonths, setUniqueMonths] = useState<{ month: number; year: number }[]>([]);
	const [uniqueYears, setUniqueYears] = useState<number[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isAddNewCategory, setIsAddNewCategory] = useBoolean();
	const [isShowMonth, setIsShowMonth] = useState(false);

	useEffect(() => {
		getAllMonths();
	}, []);

	useEffect(() => {
		getMonthCategories();
	}, [monthYear.month]);

	// Get the categories of this month
	const getMonthCategories = async () => {
		const response = await apiManager.getMonthCategories(token!, monthYear.year, monthYear.month);

		if (response.status === 200) {
			setCurrentWeekCategories(response.data);
		}
		setIsLoading(false);
	};

	// Get all years and months with information
	const getAllMonths = async () => {
		try {
			const response = await apiManager.getUniqueMonths(token!);
			const data = response.data;
			const years = uniqueYears;
			const months = uniqueMonths;
			data.forEach((date: { year: number; month: number }) => {
				if (!years.includes(date.year)) years.push(date.year);
				if (!uniqueMonths.includes(date)) months.push(date);
			});
			years.reverse();
			setUniqueYears(years);
			setUniqueMonths(months);
		} catch (error) {
			console.log(error);
		}
	};

	const MonthHandler = () => {
		const getYear = (year: number) => {
			setIsShowMonth(true);
			setYear(year);
		};

		const setMonth = (month: number) => {
			const monthLong = Info.months("long")[month - 1];
			setMonthYear({ ...monthYear, year, month, monthLong });
		};

		return (
			<>
				<HStack justify={"center"} p={2}>
					{uniqueYears.map((year: number, idx: number) => (
						<Button size={"sm"} onClick={() => getYear(year)} key={idx}>
							{year}
						</Button>
					))}
				</HStack>
				{isShowMonth && (
					<HStack p={2} justify='center'>
						{uniqueMonths.map((date: { month: number; year: number }) => {
							if (date.year == year) {
								return (
									<Button size={"xs"} onClick={() => setMonth(date.month)} key={date.month}>
										{date.month}
									</Button>
								);
							}
						})}
					</HStack>
				)}
			</>
		);
	};

	if (isLoading) return <Box textAlign={"center"}>Loading</Box>;

	// If there are no categories, shows the form to create the first one
	if (currentWeekCategories.length === 0 && !isLoading && otherCategories.length === 0)
		return (
			<FormsManager.CreateCategory
				setIsAddNewCategory={setIsAddNewCategory}
				updateState={setCurrentWeekCategories}
			/>
		);
	return (
		<Layout>
			<HStack justify={"flex-end"}>
				<ProfileMenu />
			</HStack>
			<Heading size={"lg"} textAlign='center' my={10}>
				{monthYear.monthLong.toUpperCase()} - {monthYear.year}
			</Heading>
			<MonthHandler />
			<Box textAlign={"center"}>
				<Button size={["xs", "md"]} mx={"auto"} onClick={setIsAddNewCategory.toggle}>
					{!isAddNewCategory ? "Create new category" : "Hide"}
				</Button>
			</Box>
			{isAddNewCategory && (
				<FormsManager.CreateCategory
					setIsAddNewCategory={setIsAddNewCategory}
					updateState={setCurrentWeekCategories}
				/>
			)}
			<Divider py={2} />
			<IncomeBalance categories={currentWeekCategories} />
			{currentWeekCategories.length !== 0 ? (
				<CurrentWeekCategories categories={currentWeekCategories} setCategories={setCurrentWeekCategories} />
			) : null}
		</Layout>
	);
};

// Display current week categories of current month on top
interface Props {
	categories: Category[];
	setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}
const CurrentWeekCategories: React.FC<Props> = ({ categories, setCategories }) => (
	<HStack wrap='wrap' gap={["8", "8"]} justify='center'>
		{categories?.map((cat: Category) => (
			<CardsManager.WeeklyCategoryCard
				cat={cat}
				key={cat.id}
				categories={categories}
				setCategories={setCategories}
			/>
		))}
	</HStack>
);

// Display categories that do not belong to the current week
// const OtherWeekCategories: React.FC<Props> = ({ categories, setCategories }) => {
// 	const arr = categories.sort((a, b) => a.date - b.week);
// 	const weeks: number[] = [];
// 	for (let w in arr) {
// 		let week = arr[w].week;
// 		if (weeks.indexOf(week) === -1) weeks.push(week);
// 	}

// 	return (
// 		<>
// 			{weeks &&
// 				weeks.map((w: number, idx: number) => {
// 					return (
// 						<Box key={idx}>
// 							<Heading size={"md"} textAlign='center' p={2} >
// 								Week # {w}
// 							</Heading>
// 							<HStack wrap='wrap' gap={['8', '4']} justify="center"  >
// 								{arr.map((cat: Category) => {
// 									if (cat.week === w) {
// 										return <CardsManager.WeeklyCategoryCard cat={cat} key={cat.id} categories={arr} setCategories={setCategories} />;
// 									}
// 								})}
// 							</HStack>
// 						</Box>
// 					);
// 				})}
// 		</>
// 	);
// };
