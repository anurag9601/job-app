import dotenv from "dotenv";
dotenv.config()

import express from "express";
import mongooseConnect from "./database/db";
import cookieParser from "cookie-parser";

import userAuthRoute from "./database/routes/auth.routes";

const app = express();


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", userAuthRoute);

const port = process.env.DEPLOYMENT_URL || 9000;

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
    mongooseConnect();
})