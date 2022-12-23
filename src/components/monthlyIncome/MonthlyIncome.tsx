import { HStack, IconButton, useDisclosure } from '@chakra-ui/react';
import { apiManager } from 'api';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { addAccountBalance, setMonthlyAmount } from 'store/slices/monthlyIncome/action';
import { RootState, useAppDispatch } from 'store/store';
import { EditIcon } from "@chakra-ui/icons"
import modalManager from "components/modals/modalManager";
import { NumericFormat } from 'react-number-format';

interface MonthlyIncomeProps {

}

const MonthlyIncome: React.FC<MonthlyIncomeProps> = () => {
    const dispatch = useAppDispatch()
    const { amount: monthlyIncome, accountBalance } = useSelector((state: RootState) => state.monthlyIncome)
    const token = useSelector((state: RootState) => state.user.tokens?.access)
    const userIncome = useSelector((state: RootState) => state.user.user?.amount)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [modalInfo, setModalInfo] = useState({
        type: '',
        title: ''
    })
    // TODO keep working on this
    const setMonthlyIncome = async () => {
        try {
            const response = await apiManager.getMonhlyIncome(token!)
            setMonthlyAmount(dispatch, response.data.amount)
            addAccountBalance(dispatch, response.data.account_balance)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        setMonthlyIncome()
    }, [token])

    const openModal = (title: string, type: string) => {
        setModalInfo({
            title,
            type
        })
        onOpen()
    }

    return (
        <HStack maxW="xxl" gap={4} mt={4}>
            <p>Month balance: <NumericFormat value={monthlyIncome} prefix={'$'} thousandSeparator="," displayType='text' /></p>
            <HStack>
                <p>User Income: <NumericFormat value={userIncome} prefix={'$'} thousandSeparator="," displayType='text' /></p>
                <IconButton size="xs" aria-label='edit' icon={<EditIcon />} onClick={() => openModal('User Income', 'userAmount')} />
            </HStack>
            <HStack>
                {/* <p>Account Balance: ${accountBalance}</p> */}
                <p>Account Balance: <NumericFormat value={accountBalance} prefix={'$'} thousandSeparator="," displayType='text' /></p>;
                <IconButton size={"xs"} aria-label='edit' icon={<EditIcon />} onClick={() => openModal('Account Balance', 'accountBalance')} />
            </HStack>
            <modalManager.UpdateAmount onClose={onClose} isOpen={isOpen} type={modalInfo.type} title={modalInfo.title} />
        </HStack>
    );
};

export default MonthlyIncome;