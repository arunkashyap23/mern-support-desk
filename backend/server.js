import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import colors from "colors";
import connectDB from "./config/db.js";
import ticketRouter from "./routes/ticketRoutes.js";

dotenv.config();
const app = express();

const port = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//load routes
app.use("/api/users", userRouter);
app.use("/api/tickets", ticketRouter);

app.use(errorHandler);

//connect db
connectDB(MONGO_URI);

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
