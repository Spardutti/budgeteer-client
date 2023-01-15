import { Card, CardBody, Box, Text, HStack, IconButton, useDisclosure, SimpleGrid, Stack } from "@chakra-ui/react";
import { Category, Expense } from "_types";
import { AddIcon, DeleteIcon, ChevronDownIcon, ChevronUpIcon, EditIcon } from "@chakra-ui/icons";
import modalManager from "components/modals/modalManager";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { apiManager } from "api";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "store/store";
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer } from "@chakra-ui/react";
import { decimalSeparator } from "utils/utils";
import { addExpenseAmount } from "store/slices/incomeBalance/action";

interface Props {
	cat: Category;
	categories: Category[];
	setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

export const WeeklyCategoryCard: React.FC<Props> = ({ cat, categories, setCategories }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [budget, setBudget] = useState(0);
	const token = useSelector((state: RootState) => state.user.tokens?.access);
	const [isLoading, setIsLoading] = useState(false);
	const [amount, setAmount] = useState(0);
	const [isShowDetail, setIsShowDetail] = useState(false);
	const [expenseDetail, setIsExpenseDetail] = useState<Expense[]>([]);
	const dispatch = useAppDispatch();
	const [modalType, setModalType] = useState("");
	const [values, setValues] = useState<{ amount: number | null; description: string | undefined }>({
		amount: null,
		description: undefined,
	});
	const [id, setId] = useState(0);

	useEffect(() => {
		setBudget(cat.budget);
	}, [cat.budget]);

	const getExpenses = async () => {
		const { data } = await apiManager.getCategoyExpenses(cat.id, token!);
		setIsExpenseDetail(data);
		let expenseTotal: number = 0;
		data.forEach((expense: Expense) => {
			expenseTotal += +expense.amount;
			addExpenseAmount(dispatch, +expense.amount);
		});
		setAmount(expenseTotal);
	};

	useEffect(() => {
		getExpenses();
	}, [token]);

	const deleteCat = async () => {
		setIsLoading(true);
		try {
			await apiManager.deleteCategory(token!, cat.id);
			const index = categories.findIndex((e) => e.id === cat.id);
			if (index > -1) {
				const arr = categories.splice(index, 1);
				setCategories(arr);
			}
		} catch (error) {
			console.log(error);
		}
		setIsLoading(false);
	};

	const ShowDetail = () => (
		<TableContainer py={4}>
			<Table variant={"striped"} colorScheme='blackAlpha' size={"sm"}>
				<Thead>
					<Tr>
						<Th>Description</Th>
						<Th>Amount</Th>
						<Th>Date</Th>
						<Th></Th>
					</Tr>
				</Thead>
				<Tbody>
					{expenseDetail.map((expense: Expense) => (
						<Tr key={expense.id}>
							<Td>{expense.description}</Td>
							<Td>
								<NumericFormat
									value={expense.amount}
									prefix={"$"}
									thousandSeparator=','
									// decimalSeparator=','
									displayType='text'
									decimalScale={2}
									allowLeadingZeros={false}
								/>
							</Td>
							<Td>{expense.date.toLocaleString()}</Td>
							<Td>
								<IconButton
									size={"xs"}
									aria-label='edit'
									icon={<EditIcon />}
									onClick={() => {
										setModalType("edit");
										onOpen();
										setValues({ amount: expense.amount, description: expense.description });
										setId(expense.id);
									}}
									isLoading={isLoading}
									mr={4}
								/>
								<IconButton
									bg={"red.800"}
									size={"xs"}
									aria-label='delete'
									icon={<DeleteIcon />}
									// onClick={deleteCat}
									isLoading={isLoading}
								/>
							</Td>
						</Tr>
					))}
				</Tbody>
			</Table>
		</TableContainer>
	);

	return (
		<Card ml={2} w='full'>
			<IconButton
				bg={"red.800"}
				size={"xs"}
				aria-label='delete'
				icon={<DeleteIcon />}
				position='absolute'
				bottom={0}
				right={0}
				onClick={deleteCat}
				isLoading={isLoading}
			/>
			<CardBody>
				<SimpleGrid columns={[2]} textAlign={"center"}>
					<Stack justify={"center"}>
						<Box maxW={"sm"} mx='auto'>
							<Text fontSize={10}>Name</Text>
							<Text mt={0}>{cat.name}</Text>
						</Box>
					</Stack>
					<HStack justify={"space-around"} align='center'>
						<Box>
							<Text fontSize={10}>Total</Text>
							<Text pt='2' fontSize='sm'>
								<NumericFormat
									value={amount}
									prefix={"$"}
									thousandSeparator=','
									displayType='text'
									decimalScale={2}
									allowLeadingZeros={false}
								/>
							</Text>
						</Box>
					</HStack>
					<Text pt='2' fontSize='sm'>
						<NumericFormat
							value={budget}
							prefix={"$"}
							thousandSeparator=','
							displayType='text'
							decimalScale={2}
						/>
					</Text>
					<Box>
						<IconButton
							w={4}
							size={"sm"}
							aria-label='add'
							icon={<AddIcon />}
							onClick={() => {
								setModalType("create");
								onOpen();
								setId(cat.id);
							}}
						/>
					</Box>
				</SimpleGrid>

				{expenseDetail.length > 0 ? (
					<IconButton
						bottom={-4}
						pos={"absolute"}
						left='50%'
						aria-label='expand'
						icon={isShowDetail ? <ChevronUpIcon /> : <ChevronDownIcon />}
						onClick={() => setIsShowDetail(!isShowDetail)}
						mx='auto'
					/>
				) : null}
				{isShowDetail && <ShowDetail />}
			</CardBody>
			<modalManager.UpdateAmount
				isOpen={isOpen}
				onClose={onClose}
				title={cat.name}
				id={id}
				type={modalType}
				addExpenseState={setAmount}
				values={values}
			/>
		</Card>
	);
};
