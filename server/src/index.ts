import express, { Express } from "express";
import mongoose from "mongoose";

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(express.json());

const mongoURI: string =
  "mongodb+srv://snpetlova:myProjectPassword@track-my-finance.mywtzfs.mongodb.net/";

mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to database!"))
  .catch((err) => console.error("Failed to connect to database!", err));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
