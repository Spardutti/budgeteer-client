import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Input,
} from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { apiManager } from 'api';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'store/store';
import { setAmount } from 'store/slices/user/action';
import { setMonthlyAmount } from 'store/slices/monthlyIncome/action';

interface AddCategoryAmountProps {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
    name: string
    id: number
    setCategoryAmount: React.Dispatch<React.SetStateAction<number>>
}

type FormData = {
    amount: number
}

const AddCategoryAmount: React.FC<AddCategoryAmountProps> = ({ isOpen, onOpen, onClose, name, id, setCategoryAmount }) => {
    const token = useSelector((state: RootState) => state.user.tokens?.access)
    const dispatch = useAppDispatch()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm<FormData>({ mode: "onChange" });

    const updateCategoryAmount = async (amount: number) => {
        try {
            const response = await apiManager.updateCategoryAmount(token!, amount, id)
            setCategoryAmount(response.data.amount)
            // setAmount(dispatch, amount)
            setMonthlyAmount(dispatch, amount, "-")
            reset()
            onClose()
        } catch (error) {
            console.log(error)
        }
    }

    const onSubmit: SubmitHandler<FormData> = (data) => {
        const { amount } = data;

        updateCategoryAmount(amount);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{name.toUpperCase()}</ModalHeader>
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

export default AddCategoryAmount;