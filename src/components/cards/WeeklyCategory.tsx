import { Card, CardHeader, CardBody, Heading, Box, Text, HStack, IconButton, useDisclosure } from "@chakra-ui/react";
import { WeeklyCategory } from "_types";
import { AddIcon } from "@chakra-ui/icons"
import modalManager from "components/modals/modalManager";
import { useEffect, useState } from "react";
import { NumericFormat } from 'react-number-format';


export const WeeklyCategoryCard: React.FC<WeeklyCategory> = ({ name, amount, id }) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [categoryAmount, setCategoryAmount] = useState<number>(0)

	useEffect(() => {
		setCategoryAmount(amount)
	}, [amount])

	return (
		<Card maxW={40} ml={2} bg={"cyan.900"}>
			<CardHeader p={2} textAlign='center'>
				<Heading size={['xs', 'md']} textTransform='uppercase'>
					{name}
				</Heading>
			</CardHeader>
			<CardBody>
				<HStack spacing='4' justify={"space-around"}>
					<Box>
						<Heading size='xs' textTransform='uppercase'>
							Total
						</Heading>
						<Text pt='2' fontSize='sm' textAlign={"center"}>
							<NumericFormat value={categoryAmount} prefix={'$'} thousandSeparator="," displayType='text' />
						</Text>
					</Box>
					<Box >
						<IconButton size={'xs'} aria-label="add" icon={<AddIcon />} onClick={onOpen} />
					</Box>
				</HStack>
			</CardBody>
			<modalManager.UpdateAmount isOpen={isOpen} onClose={onClose} title={name} id={id} type='categoryAmount' setCategoryAmount={setCategoryAmount} />
		</Card >
	);
};
