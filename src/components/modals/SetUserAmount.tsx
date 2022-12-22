import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { apiManager } from 'api';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { setMonthlyAmount } from 'store/slices/monthlyIncome/action';
import { setAmount } from 'store/slices/user/action';
import { RootState, useAppDispatch } from 'store/store';

interface SetUserAmountProps {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
    token: string
}

const SetUserAmount: React.FC<SetUserAmountProps> = ({ isOpen, onOpen, onClose, token }) => {
    const monthlyIncome = useSelector((state: RootState) => state.monthlyIncome.amount)
    const dispatch = useAppDispatch()

    type FormData = {
        amount: number
    }
    // TODO finish this modal to update the USER amount, not the monthly income
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm<FormData>({ mode: "onChange" });

    const setUserAmount = async (amount: number) => {
        console.log(amount);

        try {
            const response = await apiManager.updateUserAmount(token!, amount)
            setAmount(dispatch, amount)
            if (monthlyIncome === 0) {
                setMonthlyAmount(dispatch, amount, "+")
                console.log(amount);
                const x = await apiManager.updateMonthlyIncomeAmount(token!, amount)
                if (x.status == 200) console.log(amount)
                console.log(x);

            }
            // reset()
            onClose()
        } catch (error) {
            console.log(error)
        }
    }

    const onSubmit: SubmitHandler<FormData> = (data) => {
        const { amount } = data
        setUserAmount(amount)
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>User Amount</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Input type={"number"} placeholder='Amount' {...register("amount", { required: true })} />
                </ModalBody>
                <ModalFooter>
                    <Button onClick={handleSubmit(onSubmit)} disabled={!isValid} variant='ghost'>Update</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default SetUserAmount;