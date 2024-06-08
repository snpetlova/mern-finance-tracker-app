import { useUser } from "@clerk/clerk-react";
import { FinancialRecordForm } from "./financial-record-form";
import { FinancialRecordList } from "./financal-record-list";
import "./financial-record.css";


export const Dashboard = () => {
    const { user } = useUser();

    return ( <div className="dashboard-container">
        <h1> Welcome {user?.firstName}! Here are your Finances: </h1>
        <p style={{ fontSize: '1em'}}>
                This dashboard provides an overview of your financial records. 
                You can add new records, view the list of all your financial transactions, 
                and analyze your income and expenses. Use the form below to add new financial records.
            </p>
        <FinancialRecordForm />
        <FinancialRecordList />
        <p style={{ fontSize: '0.850em'}}>To edit a field just click on it and press enter to save the change.</p>
    </div>
    );
}