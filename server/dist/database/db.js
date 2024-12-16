"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = mongooseConnect;
const mongoose_1 = __importDefault(require("mongoose"));
function mongooseConnect() {
    const url = process.env.MONGOOSE_CONNECT_URL;
    mongoose_1.default.connect(url).then(() => {
        console.log("Mongoose connected successfully.");
    });
}