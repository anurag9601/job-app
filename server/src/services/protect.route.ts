import { NextFunction, Request, Response } from "express";
import { verifyUserToken } from "./jwt";

export default async function protectRoute(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.jwt;

    if (!token) {
        res.status(400).json({ error: "Token not found." });
        return;
    }

    const validTokenUserData = await verifyUserToken(token);

    if (!validTokenUserData) {
        res.status(401).json({ error: "Unauthorized user token." });
        return;
    }

    res.user = validTokenUserData;
    next();
}