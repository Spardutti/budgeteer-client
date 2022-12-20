import { Card, CardHeader, CardBody, Heading, Box, Text, HStack, Button, IconButton, useDisclosure } from "@chakra-ui/react";
import { WeeklyCategory } from "_types";
import { AddIcon } from "@chakra-ui/icons"
import modalManager from "components/modals/modalManager";
import { useState } from "react";

export const WeeklyCategoryCard: React.FC<WeeklyCategory> = ({ name, amount, id }) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [categoryAmount, setCategoryAmount] = useState<number>(amount)
	return (
		<Card w={40}>
			<CardHeader>
				<Heading size='md' textTransform='uppercase'>
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
							{categoryAmount}
						</Text>
					</Box>
					<Box >
						<IconButton aria-label="add" icon={<AddIcon />} onClick={onOpen} />
					</Box>
				</HStack>
			</CardBody>
			<modalManager.AddCategoryAmount isOpen={isOpen} onClose={onClose} onOpen={onOpen} name={name} id={id} setCategoryAmount={setCategoryAmount} />
		</Card>
	);
};
