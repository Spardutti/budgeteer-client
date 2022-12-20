import { apiManager } from 'api';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { setMonthlyAmount } from 'store/slices/monthlyIncome/action';
import { RootState, useAppDispatch } from 'store/store';


interface MonthlyIncomeProps {

}

const MonthlyIncome: React.FC<MonthlyIncomeProps> = () => {
    const dispatch = useAppDispatch()
    const monthlyIncome = useSelector((state: RootState) => state.monthlyIncome.amount)
    const token = useSelector((state: RootState) => state.user.tokens?.access)

    const setIncome = async () => {
        try {
            const response = await apiManager.getMonhlyIncome(token!)
            setMonthlyAmount(dispatch, response.data.amount)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        setIncome()
    }, [token])

    return (
        <div>
            <p>Current month balance: ${monthlyIncome}</p>
        </div>
    );
};

export default MonthlyIncome;