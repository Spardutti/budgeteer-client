import { Flex, HStack, IconButton, Text, useDisclosure } from "@chakra-ui/react";
import { apiManager } from "api";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { addMonthBalance, setMonthBalance, setExpenseAmount } from "store/slices/incomeBalance/action";
import { RootState, useAppDispatch } from "store/store";
import { EditIcon } from "@chakra-ui/icons";
import modalManager from "components/modals/modalManager";
import { NumericFormat } from "react-number-format";
import { Category } from "_types";

interface IncomeBalanceProps {
	categories: Category[];
}

//TODO get all expense of a month and sum them to add the to the balance
const IncomeBalance: React.FC<IncomeBalanceProps> = ({ categories }) => {
	const dispatch = useAppDispatch();
	const { balance, expense } = useSelector((state: RootState) => state.balance);
	const token = useSelector((state: RootState) => state.user.tokens?.access);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [modalInfo, setModalInfo] = useState({
		type: "",
		title: "",
	});
	let setAmount = false;

	const setMonthlyIncome = async () => {
		try {
			/* we use set amount to set the month instead of increment, otherwise it will increment the amount adding the two months together */
			// if (setAmount) {
			// setMonthlyAmount(dispatch, response.data.amount)
			// setAccountBalance(dispatch, response.data.account_balance)
			// } else {
			//     // this will be the first
			//     addMonthlyAmount(dispatch, response.data.amount)
			//     addAccountBalance(dispatch, response.data.account_balance)
			// }
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		let sum = 0;
		categories &&
			categories.map((cat: Category) => {
				sum += +cat.budget;
			});
		setMonthBalance(dispatch, sum);
	}, [categories]);
	// useEffect(() => {
	// 	setMonthlyIncome();
	// }, [token, monthYear.month]);

	// useEffect(() => {
	//     setAmount = true
	// }, [monthYear.month])

	const openModal = (title: string, type: string) => {
		setModalInfo({
			title,
			type,
		});
		onOpen();
	};

	return (
		<Flex direction={["column", "row"]} textAlign={["center", "left"]} maxW='xxl' gap={4} mt={4}>
			<Text>
				Estimated:
				<NumericFormat
					value={balance}
					prefix={"$"}
					thousandSeparator=','
					// decimalSeparator=','
					displayType='text'
					decimalScale={2}
				/>
			</Text>
			<HStack justify={["center", "left"]}>
				<Text>
					Expenses:{" "}
					<NumericFormat
						value={expense}
						prefix={"$"}
						thousandSeparator=','
						// decimalSeparator=','
						displayType='text'
						decimalScale={2}
					/>
				</Text>
				{/* <IconButton
					size='xs'
					aria-label='edit'
					icon={<EditIcon />}
					onClick={() => openModal("User Income", "userAmount")}
				/> */}
			</HStack>
			{/* <HStack justify={["center", "left"]}>
				<Text>
					Account Balance:{" "}
					<NumericFormat
						value={accountBalance}
						prefix={"$"}
						thousandSeparator='.'
						decimalSeparator=','
						displayType='text'
					/>
				</Text>
				;
				<IconButton
					size={"xs"}
					aria-label='edit'
					icon={<EditIcon />}
					onClick={() => openModal("Account Balance", "accountBalance")}
				/>
			</HStack> */}
			<modalManager.UpdateAmount
				onClose={onClose}
				isOpen={isOpen}
				type={modalInfo.type}
				title={modalInfo.title}
			/>
		</Flex>
	);
};

export default IncomeBalance;
