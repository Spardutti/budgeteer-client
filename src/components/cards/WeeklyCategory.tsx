import { Card, CardHeader, CardBody, Heading, Box, Text, HStack, IconButton, useDisclosure } from "@chakra-ui/react";
import { WeeklyCategory } from "_types";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons"
import modalManager from "components/modals/modalManager";
import { useEffect, useState } from "react";
import { NumericFormat } from 'react-number-format';
import { apiManager } from "api";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

interface Props {
	cat: WeeklyCategory,
	categories: WeeklyCategory[]
	setCategories: React.Dispatch<React.SetStateAction<WeeklyCategory[]>>
}

export const WeeklyCategoryCard: React.FC<Props> = ({ cat, categories, setCategories }) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [categoryAmount, setCategoryAmount] = useState<number>(0)
	const token = useSelector((state: RootState) => state.user.tokens?.access)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		setCategoryAmount(cat.amount)
	}, [cat.amount])

	const deleteCat = async () => {
		setIsLoading(true)
		try {
			const response = await apiManager.deleteCategory(token!, cat.id)
			const index = categories.findIndex(e => e.id === cat.id)
			console.log(index);

			if (index > -1) {
				const arr = categories.splice(index, 1)
				setCategories(arr)
			}
			console.log(response);

		} catch (error) {
			console.log(error);

		}
		setIsLoading(false)
	}

	return (
		<Card maxW={40} ml={2} bg={"cyan.900"}>
			<IconButton bg={'red.800'} size={'xs'} aria-label="delete" icon={<DeleteIcon />} position='absolute' bottom={0} right={0} onClick={deleteCat} isLoading={isLoading} />
			<CardHeader p={2} textAlign='center'>
				<Heading size={['xs', 'md']} textTransform='uppercase'>
					{cat.name}
				</Heading>
			</CardHeader>
			<CardBody>
				<HStack spacing='4' justify={"space-around"}>
					<Box>
						<Heading size='xs' textTransform='uppercase'>
							Total
						</Heading>
						<Text pt='2' fontSize='sm' textAlign={"center"}>
							<NumericFormat value={categoryAmount} prefix={'$'} thousandSeparator="." decimalSeparator="," displayType='text' />
						</Text>
					</Box>
					<Box >
						<IconButton size={'xs'} aria-label="add" icon={<AddIcon />} onClick={onOpen} />
					</Box>
				</HStack>
			</CardBody>
			<modalManager.UpdateAmount isOpen={isOpen} onClose={onClose} title={cat.name} id={cat.id} type='categoryAmount' setCategoryAmount={setCategoryAmount} />
		</Card >
	);
};
