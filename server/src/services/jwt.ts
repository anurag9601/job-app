import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export interface payloadDataTypes {
    _id: Types.ObjectId,
    fullName: String,
    email: String,
}

export function createUserToken(payload: payloadDataTypes) {
    const secret = process.env.JWT_SECRET as string;

    const token = jwt.sign(payload, secret, {
        expiresIn: "15d",
    });
    return token;
}

export function verifyUserToken(token: string) {
    const secret = process.env.JWT_SECRET as string;
    const validToken = jwt.verify(token, secret);
    return validToken;
}