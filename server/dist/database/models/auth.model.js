"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuthModel = void 0;
const mongoose_1 = require("mongoose");
const userAuthSchema = new mongoose_1.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        default: ""
    }
}, { timestamps: true });
exports.userAuthModel = (0, mongoose_1.model)("user-auth", userAuthSchema);
