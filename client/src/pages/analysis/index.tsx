// import { useUser } from "@clerk/clerk-react";
import { useFinancialRecords } from "../../contexts/financial-record-context";
import { useMemo } from "react";
import "./analysis.css";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const RecentHistory = () => {
    const { records } = useFinancialRecords();
  
    // Filter out recent transactions (e.g., last 5 records)
    const recentTransactions = records.slice(-5).reverse(); 
  
    return (
        <div className="recent-history">
        <h2>Recent Transactions</h2>
        <div className="transaction-list">
          {recentTransactions.map((record, index) => (
            <div className={`transaction ${record.amount > 0 ? 'positive' : 'negative'}`} key={index}>
              <div className="description">{record.description}</div>
              <div className="amount">{record.amount > 0 ? `$${record.amount}` : `-$${Math.abs(record.amount)}`}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

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

  // Format numbers with comma for better readability
  const formattedTotalIncome = totalIncome.toLocaleString();
  const formattedTotalExpense = Math.abs(totalExpense).toLocaleString();
  const formattedTotalBalance = totalBalance.toLocaleString();

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
        x: {
            display: false, // Hide x-axis labels
          },
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
        <div>${formattedTotalIncome}</div>
      </div>
      <div className={`total-box expense`}>
        <div>Total Expense:</div>
        <div>${formattedTotalExpense}</div>
      </div>
      <div className="total-box">
        <div>Total Balance:</div>
        <div>${formattedTotalBalance}</div>
      </div>
      <div className="chart-container">
        <Line data={data} options={options} />
      </div>
      <RecentHistory />
    </div>
  );
};
