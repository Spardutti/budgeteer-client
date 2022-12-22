import { HStack, IconButton, useDisclosure } from '@chakra-ui/react';
import { apiManager } from 'api';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { setMonthlyAmount } from 'store/slices/monthlyIncome/action';
import { RootState, useAppDispatch } from 'store/store';
import { EditIcon } from "@chakra-ui/icons"
import modalManager from "components/modals/modalManager";

interface MonthlyIncomeProps {

}

const MonthlyIncome: React.FC<MonthlyIncomeProps> = () => {
    const dispatch = useAppDispatch()
    const monthlyIncome = useSelector((state: RootState) => state.monthlyIncome.amount)
    const token = useSelector((state: RootState) => state.user.tokens?.access)
    const userIncome = useSelector((state: RootState) => state.user.user?.amount)
    const { isOpen, onOpen, onClose } = useDisclosure()

    const setMonthlyIncome = async () => {
        try {
            const response = await apiManager.getMonhlyIncome(token!)
            setMonthlyAmount(dispatch, response.data.amount, "+")
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        setMonthlyIncome()
    }, [token])



    return (
        <HStack maxW="xl" justify="space-between" mt={4}>
            <p>Current month balance: ${monthlyIncome}</p>
            <HStack>
                <p>User Income: ${userIncome}</p>
                <IconButton aria-label='edit' icon={<EditIcon />} onClick={onOpen} />
            </HStack>
            <modalManager.SetUserAmount onClose={onClose} onOpen={onOpen} isOpen={isOpen} token={token!} />
        </HStack>
    );
};

export default MonthlyIncome;