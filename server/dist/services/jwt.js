"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserToken = createUserToken;
exports.verifyUserToken = verifyUserToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function createUserToken(payload) {
    const secret = process.env.JWT_SECRET;
    const token = jsonwebtoken_1.default.sign(payload, secret, {
        algorithm: "RS256",
        expiresIn: "15d",
    });
    return token;
}
function verifyUserToken(token) {
    const secret = process.env.JWT_SECRET;
    const validToken = jsonwebtoken_1.default.verify(token, secret);
    return validToken;
}
