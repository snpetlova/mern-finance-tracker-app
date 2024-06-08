// import { useUser } from "@clerk/clerk-react";
import { useFinancialRecords } from "../../contexts/financial-record-context";
import { useMemo } from "react";
import "./analysis.css";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const Analysis = () => {
  // const { user } = useUser();
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

  const data = useMemo(() => {
    return {
        labels: records.map(record => record.date), 
        datasets: [
            {
                label: 'Income',
                data: records.map(record => record.amount > 0 ? record.amount : 0),
                borderColor: '#4caf50',
                backgroundColor: 'rgba(76, 175, 80, 0.2)',
                borderWidth: 2,
                fill: false,
            },
            {
                label: 'Expenses',
                data: records.map(record => record.amount < 0 ? Math.abs(record.amount) : 0),
                borderColor: '#f44336',
                backgroundColor: 'rgba(244, 67, 54, 0.2)',
                borderWidth: 2,
                fill: false,
            },
        ],
    };
}, [records]);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Income and Expenses Analysis',
        },
    },
    scales: {
        y: {
            beginAtZero: true,
        },
    },
};


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
      <div className="chart-container">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};