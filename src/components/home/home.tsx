import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { FormsManager } from "components/Forms/FormsManager";
import { useEffect, useState } from "react";
import { apiManager } from "api";
import { WeeklyCategory } from "_types";
import { CardsManager } from "components/Cards/CardsManagers";
import { Box, Button, Divider, Grid, GridItem, Heading, HStack, SimpleGrid, Text, useBoolean, useColorMode } from "@chakra-ui/react";
import { DateTime, Info } from "luxon";
import { weekOfMonth } from "utils/utils";
import MonthlyIncome from "components/MonthlyIncome/MonthlyIncome";
import { getCategories } from "store/slices/weeklyCategories/action";
import Layout from "layout/Layout";

export const Home = () => {
	const token = useSelector((state: RootState) => state.user.tokens?.access);
	const [currentWeekCategories, setCurrentWeekCategories] = useState<WeeklyCategory[]>([]);
	const [otherCategories, setOtherCategories] = useState<WeeklyCategory[]>([]);
	const [monthYear, setMonthYear] = useState<{ monthLong: string, year: number, month: number }>({
		monthLong: DateTime.now().monthLong,
		year: DateTime.now().year,
		month: DateTime.now().month
	});
	const [year, setYear] = useState<number>(DateTime.now().year)
	const [uniqueMonths, setUniqueMonths] = useState<{ month: number, year: number }[]>([])
	const [uniqueYears, setUniqueYears] = useState<number[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [isAddNewCategory, setIsAddNewCategory] = useBoolean();
	const [isShowMonth, setIsShowMonth] = useState(false)

	useEffect(() => {
		getAllMonths()
	}, []);

	useEffect(() => {
		getMonthCategories()
	}, [monthYear.month])

	// Get the categories of this month
	const getMonthCategories = async () => {
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

	// Get all years and months with information
	const getAllMonths = async () => {
		try {
			const response = await apiManager.getUniqueMonths(token!)
			const data = response.data
			const years = uniqueYears
			const months = uniqueMonths
			data.forEach((date: { year: number, month: number }) => {
				if (!years.includes(date.year)) years.push(date.year)
				if (!uniqueMonths.includes(date)) months.push(date)
			})
			years.reverse()
			setUniqueYears(years)
			setUniqueMonths(months)

		} catch (error) {
			console.log(error)
		}
	}

	const MonthHandler = () => {
		const getYear = (year: number) => {
			setIsShowMonth(true)
			setYear(year)
		}

		const setMonth = (month: number) => {
			const monthLong = Info.months('long')[month - 1]
			setMonthYear({ ...monthYear, year, month, monthLong })
		}

		return (
			<>
				<HStack justify={"center"} p={2}>
					{uniqueYears.map((year: number, idx: number) => (<Button size={"sm"} onClick={() => getYear(year)} key={idx}>{year}</Button>)
					)}
				</HStack>
				{isShowMonth &&
					<HStack p={2} justify='center'>
						{uniqueMonths.map((date: { month: number, year: number }) => {
							if (date.year == year) {
								return (
									<Button size={"xs"} onClick={() => setMonth(date.month)} key={date.month}>{date.month}</Button>
								)
							}
						})}
					</HStack>
				}
			</>
		)
	}

	if (isLoading) return <Box textAlign={"center"}>Loading</Box>

	// If there are no categories, shows the form to create the first one
	if (currentWeekCategories.length === 0 && !isLoading && otherCategories.length === 0) return <FormsManager.CreateCategory updateState={setCurrentWeekCategories} />;
	return (
		<Layout>
			<Heading size={"lg"} textAlign='center' my={10}>
				{monthYear.monthLong.toUpperCase()} - {monthYear.year}
			</Heading>
			<MonthHandler />
			<Box textAlign={"center"}>
				<Button size={['xs', 'md']} mx={"auto"} onClick={setIsAddNewCategory.toggle}>{!isAddNewCategory ? "Create new category" : "Hide"}</Button>
			</Box>
			{isAddNewCategory && <FormsManager.CreateCategory updateState={setCurrentWeekCategories} />}
			<Divider py={2} />
			<MonthlyIncome monthYear={monthYear} />
			{currentWeekCategories.length !== 0 ? <CurrentWeekCategories currentWeekCategories={currentWeekCategories} /> : null}
			<OtherWeekCategories otherWeekCategories={otherCategories} />
		</Layout>
	);
};

// Display current week categories of current month on top
const CurrentWeekCategories: React.FC<{ currentWeekCategories: WeeklyCategory[] }> = ({ currentWeekCategories }) => (
	<>
		<Heading size={"md"} textAlign='center' p={2}>
			Week # {weekOfMonth()}
		</Heading>
		{/* <SimpleGrid columns={[2, 6]} gap={4} my={2} > */}
		<HStack wrap='wrap' gap={['8', '4']} justify="center"  >
			{currentWeekCategories?.map((cat: WeeklyCategory, idx: number) => (
				<CardsManager.WeeklyCategoryCard {...cat} key={idx} />
			))}
		</HStack>
		{/* </SimpleGrid> */}
	</>
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
							<Heading size={"md"} textAlign='center' p={2} >
								Week # {w}
							</Heading>
							<HStack wrap='wrap' gap={['8', '4']} justify="center"  >
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
