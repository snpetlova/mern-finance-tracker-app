import express, { Request, Response } from "express";
import FinancialRecordModel from "../schema/financial-record";
import { FinancialRecord } from "../schema/financial-record";


const router = express.Router();

router.get("/getAllByUserID/:userId", async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId;
      const records = await FinancialRecordModel.find({ userId: userId });
      if (records.length === 0) {
        return res.status(404).send("No records found for the user.");
      }
      res.status(200).send(records);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  router.post("/", async (req: Request, res: Response) => {
    try {
      const newRecordBody = req.body;
      const newRecord = new FinancialRecordModel(newRecordBody);
      const savedRecord = await newRecord.save();
  
      res.status(200).send(savedRecord);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  router.put("/:id", async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const newRecordBody = req.body;
      const record = await FinancialRecordModel.findByIdAndUpdate(
        id,
        newRecordBody,
        { new: true }
      );
  
      if (!record) return res.status(404).send();
  
      res.status(200).send(record);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  router.delete("/:id", async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const record = await FinancialRecordModel.findByIdAndDelete(id);
      if (!record) return res.status(404).send();
      res.status(200).send(record);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  router.get("/analysis/:id", async (req: Request, res: Response) => {
    try {
      const userId = req.params.id;
      // Retrieve financial records for the user from the database
      const records = await FinancialRecordModel.find({ userId: userId });
      // Perform analysis (e.g., calculate total spending per month)
      const analysisData = performAnalysis(records);
      // Return the analysis results to the client
      res.status(200).json(analysisData);
    } catch (err) {
      res.status(500).send(err);
    }
  });

// Function to perform analysis on financial records
function performAnalysis(records: FinancialRecord[]) {
  // Implement your analysis logic here
  // Example: Calculate total spending per month
  const monthlySpending: { [key: string]: number } = {};

  records.forEach(record => {
    const monthYear = `${record.date.getMonth() + 1}-${record.date.getFullYear()}`;
    if (!monthlySpending[monthYear]) {
      monthlySpending[monthYear] = record.amount;
    } else {
      monthlySpending[monthYear] += record.amount;
    }
  });

  return { monthlySpending };
}

export default router;