import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from "@chakra-ui/react";
import { apiManager } from "api";
import React, { useState, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "store/store";
import { addExpenseAmount } from "store/slices/incomeBalance/action";

interface UpdateAmountProps {
	type: string;
	isOpen: boolean;
	onClose: () => void;
	title: string;
	addExpenseState?: React.Dispatch<React.SetStateAction<number>>;
	id?: number;
	values?: {
		amount: number | null;
		description: string | undefined;
	};
}

const UpdateAmount: React.FC<UpdateAmountProps> = ({ type, isOpen, onClose, title, addExpenseState, id, values }) => {
	type FormData = {
		amount: number;
		description: string;
	};
	const token = useSelector((state: RootState) => state.user.tokens?.access);
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useAppDispatch();

	const {
		handleSubmit,
		reset,
		control,
		formState: { errors, isValid },
	} = useForm<FormData>({ mode: "onChange" });

	const createExpense = async (amount: number, description: string) => {
		setIsLoading(true);
		try {
			const response = await apiManager.createExpense(id!, token!, amount, description);
			addExpenseState!((prev) => prev + amount);
			addExpenseAmount(dispatch, amount);
			reset();
			onClose();
		} catch (error) {
			console.log(error);
		}
		setIsLoading(false);
	};

	const updateExpense = async (expenseId: number, amount: number, description: string) => {
		setIsLoading(true);
		try {
			await apiManager.editExpense(expenseId, token!, amount, description);
			const oldAmount = values?.amount;
			if (oldAmount) {
				const diff = -oldAmount + amount;
				addExpenseState!((prev) => prev + diff);
				addExpenseAmount(dispatch, diff);
			}
			reset();
			onClose();
		} catch (error) {
			console.log(error);
		}
		setIsLoading(false);
	};

	const onSubmit: SubmitHandler<FormData> = (data) => {
		const { amount, description } = data;
		let fixedAmount = Number(amount.toFixed(2));
		switch (type) {
			case "create":
				createExpense(fixedAmount, description);
				break;
			case "edit":
				updateExpense(id!, amount, description);
				break;
		}
	};
	const initialRef = React.useRef(null);

	return (
		<Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>{title}</ModalHeader>
				<ModalCloseButton />
				<ModalBody display='flex' flexDir={"column"} gap={4}>
					<Controller
						render={({ field: { onChange, value } }) => (
							<NumericFormat
								onValueChange={(v) => onChange(v.floatValue)}
								prefix='$'
								thousandSeparator=','
								// decimalSeparator=','
								customInput={Input}
								placeholder='Amount'
								getInputRef={initialRef}
								decimalScale={2}
								defaultValue={values ? values.amount : null}
							/>
						)}
						name='amount'
						control={control}
					/>
					<Controller
						render={({ field: { onChange, value } }) => (
							<Input
								onChange={(v) => onChange(v)}
								placeholder='Description'
								type={"text"}
								defaultValue={values ? values.description : undefined}
							/>
						)}
						name='description'
						control={control}
					/>
				</ModalBody>
				<ModalFooter>
					<Button
						isLoading={isLoading}
						isDisabled={isLoading}
						onClick={handleSubmit(onSubmit)}
						disabled={!isValid}
						variant='ghost'
					>
						Update
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default UpdateAmount;
