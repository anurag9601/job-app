import express from "express";
import mongooseConnect from "./database/db";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const app = express();

dotenv.config()

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.DEPLOYMENT_URL || 9000;

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
    mongooseConnect();
})