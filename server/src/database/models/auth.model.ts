import { Schema, model } from "mongoose";

const userAuthSchema = new Schema({
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

export const userAuthModel = model("user-auth", userAuthSchema);