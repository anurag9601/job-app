"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUserSignup = handleUserSignup;
exports.handleUserSignin = handleUserSignin;
exports.handleUserAuthentication = handleUserAuthentication;
exports.handleUserForgetPassword = handleUserForgetPassword;
const auth_model_1 = require("../models/auth.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../../services/jwt");
const nodemailer_1 = __importDefault(require("nodemailer"));
function handleUserSignup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { fullName, email, password } = req.body;
            if (!fullName || !email || !password) {
                res.status(400).json({ error: "Fill all the fields." });
                return;
            }
            const userAlreayExist = yield auth_model_1.userAuthModel.findOne({ email, });
            if (userAlreayExist) {
                res.status(400).json({ error: "User already exist." });
                return;
            }
            const salt = yield bcrypt_1.default.genSalt(10);
            const hashedPassword = yield bcrypt_1.default.hash(password, salt);
            const newUser = yield auth_model_1.userAuthModel.create({
                fullName,
                email,
                password: hashedPassword
            });
            const payload = {
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.fullName,
            };
            const token = yield (0, jwt_1.createUserToken)(payload);
            res.cookie('jwt', token, {
                expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
                httpOnly: true,
                sameSite: "strict",
            }).status(201).json({ success: true, data: payload });
        }
        catch (err) {
            res.status(500).json({ error: "Internal server error." });
        }
    });
}
function handleUserSignin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(400).json({ error: "Fill all the fields." });
                return;
            }
            const user = yield auth_model_1.userAuthModel.findOne({ email, });
            if (!user) {
                res.status(400).json({ error: "User not exist." });
                return;
            }
            const isValidPassword = yield bcrypt_1.default.compare(password, user.password);
            if (!isValidPassword) {
                res.status(400).json({ error: "Invalid password." });
                return;
            }
            const payload = {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
            };
            const token = yield (0, jwt_1.createUserToken)(payload);
            res.cookie("jwt", token, {
                expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
                httpOnly: true,
                sameSite: "strict",
            }).status(200).json({ success: true, data: payload });
        }
        catch (err) {
            res.status(500).json({ error: "Internal server error." });
        }
    });
}
function handleUserAuthentication(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = res.user;
            if (!user) {
                res.status(400).json({ error: "User data not found." });
                return;
            }
            res.status(200).json({ success: true, data: user });
        }
        catch (err) {
            res.status(500).json({ error: "Internal server error." });
        }
    });
}
function handleUserForgetPassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email } = req.body;
            if (!email) {
                res.status(400).json({ error: "Email required." });
                return;
            }
            const user = yield auth_model_1.userAuthModel.findOne({ email, });
            if (!user) {
                res.status(400).json({ error: "User email not found." });
                return;
            }
            const transporter = nodemailer_1.default.createTransport({
                service: "gmail",
                auth: {
                    user: "anuragmishrap13@gmail.com",
                    pass: "zhcvqyvbcbhszrsh"
                }
            });
            const mailOptions = {
                from: "anuragmishrap13@gmail.com",
                to: email,
                subject: "Password Reset",
                text: `You're receiving this e-mail because you or someone else has requested a password reset for your user account at .

        Click the link below to reset your password:
        http://localhost:5173/new-password/${user._id}

        If you did not request a password reset you can safely ignore this email.`
            };
            transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                    res.status(500).json({ error: "Internal server error while sending mail." });
                    return;
                }
                else {
                    res.status(200).json({ success: true, message: "Mail send on respective email successfully." });
                }
            });
        }
        catch (err) {
            res.status(500).json({ error: "Internal server error." });
        }
    });
}
