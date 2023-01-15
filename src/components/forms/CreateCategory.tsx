import { Box, Button, Center, Flex, FormControl, FormErrorMessage, FormLabel, Input, useBoolean } from "@chakra-ui/react";
import { apiManager } from "api";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { useState } from "react";
import { Category } from "_types";

interface Props {
	updateState: React.Dispatch<React.SetStateAction<Category[]>>;
	setIsAddNewCategory: {
		on: () => void;
		off: () => void;
		toggle: () => void;
	}
}
export const CreateCategory: React.FC<Props> = ({ updateState, setIsAddNewCategory }) => {
	type FormData = {
		name: string;
	};
	const [isLoading, setIsloading] = useBoolean();
	const [creationErrors, setCreationsErrors] = useState();
	const token = useSelector((state: RootState) => state.user.tokens?.access);

	const createCategory = async (categoryName: string) => {
		setIsloading.on();
		try {
			const response = await apiManager.createCategory(categoryName, token!);
			if (response.status === 201) {
				updateState((prev) => [...prev, response.data]);
				setIsloading.off();
				setIsAddNewCategory.off()
				reset();
			}
		} catch (err) {
			setIsloading.off();
			if (axios.isAxiosError(err)) {
				const errors = err.response?.data;
				setCreationsErrors(errors);
			}
		}
	};

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm<FormData>({ mode: "onChange" });

	const onSubmit: SubmitHandler<FormData> = (data) => {
		const { name } = data;

		createCategory(name);
	};

	return (
		<Flex justify={['center']} mx={2}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<FormControl isInvalid={Boolean(errors.name)}>
					<FormLabel htmlFor='name'>Category name</FormLabel>
					<Input placeholder='category name' {...register("name", { required: true })} disabled={isLoading} autoComplete='off' />
					<FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
					<FormLabel>{creationErrors && creationErrors["name"]}</FormLabel>
				</FormControl>
				<Box textAlign="center">
					<Button size={['xs', 'md']} type='submit' isLoading={isLoading} disabled={!isValid || isLoading}>
						Create category
					</Button>
				</Box>
			</form>
		</Flex>
	);
};
