import { Flex, HStack, IconButton, Text, useDisclosure } from '@chakra-ui/react';
import { apiManager } from 'api';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { addAccountBalance, addMonthlyAmount, setAccountBalance, setMonthlyAmount } from 'store/slices/monthlyIncome/action';
import { RootState, useAppDispatch } from 'store/store';
import { EditIcon } from "@chakra-ui/icons"
import modalManager from "components/Modals/modalManager";
import { NumericFormat } from 'react-number-format';

interface MonthlyIncomeProps {
    monthYear: {
        monthLong: string,
        year: number,
        month: number
    }

}

const MonthlyIncome: React.FC<MonthlyIncomeProps> = ({ monthYear }) => {

    const dispatch = useAppDispatch()
    const { amount: monthlyIncome, accountBalance } = useSelector((state: RootState) => state.monthlyIncome)
    const token = useSelector((state: RootState) => state.user.tokens?.access)
    const userIncome = useSelector((state: RootState) => state.user.user?.amount)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [modalInfo, setModalInfo] = useState({
        type: '',
        title: ''
    })
    let setAmount = false

    const setMonthlyIncome = async () => {
        try {
            const response = await apiManager.getMonhlyIncome(token!, monthYear.year, monthYear.month)
            /* we use set amount to set the month instead of increment, otherwise it will increment the amount adding the two months together */
            // if (setAmount) {
            setMonthlyAmount(dispatch, response.data.amount)
            setAccountBalance(dispatch, response.data.account_balance)
            // } else {
            //     // this will be the first
            //     addMonthlyAmount(dispatch, response.data.amount)
            //     addAccountBalance(dispatch, response.data.account_balance)
            // }

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        setMonthlyIncome()
    }, [token, monthYear.month])

    // useEffect(() => {
    //     setAmount = true
    // }, [monthYear.month])

    const openModal = (title: string, type: string) => {
        setModalInfo({
            title,
            type
        })
        onOpen()
    }

    return (
        <Flex direction={['column', 'row']} textAlign={['center', 'left']} maxW="xxl" gap={4} mt={4}>
            <Text>Month balance: <NumericFormat value={monthlyIncome} prefix={'$'} thousandSeparator="," displayType='text' /></Text>
            <HStack justify={['center', 'left']}>
                <Text>User Income: <NumericFormat value={userIncome} prefix={'$'} thousandSeparator="," displayType='text' /></Text>
                <IconButton size="xs" aria-label='edit' icon={<EditIcon />} onClick={() => openModal('User Income', 'userAmount')} />
            </HStack>
            <HStack justify={['center', 'left']}>
                <Text>Account Balance: <NumericFormat value={accountBalance} prefix={'$'} thousandSeparator="," displayType='text' /></Text>;
                <IconButton size={"xs"} aria-label='edit' icon={<EditIcon />} onClick={() => openModal('Account Balance', 'accountBalance')} />
            </HStack>
            <modalManager.UpdateAmount onClose={onClose} isOpen={isOpen} type={modalInfo.type} title={modalInfo.title} />
        </Flex>
    );
};

export default MonthlyIncome;