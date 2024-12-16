import "express";
import { payloadDataTypes } from "./src/services/jwt";
import { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
        interface Response {
            user: string | JwtPayload
        }
    }
}