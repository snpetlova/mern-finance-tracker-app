import { useUser } from "@clerk/clerk-react";
import { useFinancialRecords } from "../../contexts/financial-record-context";
import { useMemo } from "react";
import "./analysis.css"; 

export const Analysis = () => {
    const { user } = useUser();
    const { records } = useFinancialRecords();

    const { totalIncome, totalExpense, totalBalance } = useMemo(() => {
        let totalIncome = 0;
        let totalExpense = 0;
        let totalBalance = 0;

        records.forEach((record) => {
            totalBalance += record.amount;

            if (record.amount > 0) {
                totalIncome += record.amount;
            } else {
                totalExpense += record.amount;
            }
        });

        return { totalIncome, totalExpense, totalBalance };
    }, [records]);

    return (
        <div className="dashboard-container">
            <h1>Check your analysis:</h1>
            <div className={`total-box income`}>
                <div>Total Income:</div>
                <div>${totalIncome}</div>
            </div>
            <div className={`total-box expense`}>
                <div>Total Expense:</div>
                <div>${Math.abs(totalExpense)}</div>
            </div>
            <div className="total-box">
                <div>Total Balance:</div>
                <div>${totalBalance}</div>
            </div>
        </div>
    );
}
