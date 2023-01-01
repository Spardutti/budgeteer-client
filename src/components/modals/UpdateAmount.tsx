import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { apiManager } from 'api';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { useSelector } from 'react-redux';
import { addAccountBalance, setMonthlyAmount, setAccountBalance, addMonthlyAmount } from 'store/slices/monthlyIncome/action';
import { setAmount } from 'store/slices/user/action';
import { RootState, useAppDispatch } from 'store/store';


interface UpdateAmountProps {
    type: string
    isOpen: boolean
    onClose: () => void
    title: string
    setCategoryAmount?: React.Dispatch<React.SetStateAction<number>>
    id?: number

}

const UpdateAmount: React.FC<UpdateAmountProps> = ({ type, isOpen, onClose, title, setCategoryAmount, id }) => {
    type FormData = {
        amount: number
    }
    const monthlyIncome = useSelector((state: RootState) => state.monthlyIncome.amount)
    const userAmount = useSelector((state: RootState) => state.user.user?.amount)
    const token = useSelector((state: RootState) => state.user.tokens?.access)
    const dispatch = useAppDispatch()

    const {
        handleSubmit,
        reset,
        control,
        formState: { errors, isValid },
    } = useForm<FormData>({ mode: "onChange" });



    const setUserAmount = async (amount: number) => {
        try {
            await apiManager.updateUserAmount(token!, amount)
            setAmount(dispatch, amount)
            // if (monthlyIncome === 0) {
            //     setMonthlyAmount(dispatch, amount)
            //     setAccountBalance(dispatch, amount)
            //     await apiManager.updateMonthlyIncomeAmount(token!, amount, amount)
            //     onClose()
            //     reset()
            //     return
            // }
            const amountDifference = amount - userAmount!
            addMonthlyAmount(dispatch, amountDifference)
            addAccountBalance(dispatch, amountDifference)
            await apiManager.updateMonthlyIncomeAmount(token!, -amountDifference, -amountDifference)
            reset()
            onClose()
        } catch (error) {
            console.log(error)
        }
    }

    const updateCategoryAmount = async (amount: number) => {
        try {
            const response = await apiManager.updateCategoryAmount(token!, amount, id!)
            setCategoryAmount!(response.data.amount)
            addMonthlyAmount(dispatch, -amount)
            addAccountBalance(dispatch, -amount)
            reset()
            onClose()
        } catch (error) {
            console.log(error)
        }
    }

    const updateAccountBalance = async (account_balance: number) => {
        try {
            await apiManager.updateAccountBalance(token!, account_balance)
            setAccountBalance(dispatch, account_balance)
            reset()
            onClose()
        } catch (error) {
            console.log(error)
        }
    }

    const onSubmit: SubmitHandler<FormData> = (data) => {
        const { amount } = data
        switch (type) {
            case "userAmount":
                setUserAmount(amount)
                break;
            case 'categoryAmount':
                updateCategoryAmount(amount)
                break;
            case 'accountBalance':
                updateAccountBalance(amount)
                break;
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Controller
                        render={({ field: { onChange, value } }) => (
                            <NumericFormat
                                onValueChange={(v) => onChange(v.floatValue)}
                                prefix="$"
                                thousandSeparator=','
                                customInput={Input}
                                placeholder="Amount"
                            />
                        )}
                        name="amount"
                        control={control}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button onClick={handleSubmit(onSubmit)} disabled={!isValid} variant='ghost'>Update</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default UpdateAmount;