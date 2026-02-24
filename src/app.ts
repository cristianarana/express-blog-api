require("dotenv").config();
import express from "express";
import dotenv from "dotenv";
import errorMiddleware from "./middleware/error.middleware";
import routes from "./routes";

dotenv.config();

const app = express();

app.use("/api", routes);

app.use(express.json());
app.use(errorMiddleware);
export default app;