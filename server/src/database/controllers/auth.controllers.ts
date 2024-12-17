import { Request, Response } from "express";
import { userAuthModel } from "../models/auth.model";
import bcrypt from "bcrypt";
import { createUserToken } from "../../services/jwt";
import nodemailer from "nodemailer"

export async function handleUserSignup(req: Request, res: Response) {
    try {
        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) {
            res.status(400).json({ error: "Fill all the fields." });
            return;
        }

        const userAlreayExist = await userAuthModel.findOne({ email, });

        if (userAlreayExist) {
            res.status(400).json({ error: "User already exist." });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await userAuthModel.create({
            fullName,
            email,
            password: hashedPassword
        });

        const payload = {
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
        }

        const token = await createUserToken(payload);

        res.cookie('jwt', token, {
            expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            sameSite: "strict",
        }).status(201).json({ success: true, data: payload })

    } catch (err) {
        res.status(500).json({ error: "Internal server error." })
    }
}

export async function handleUserSignin(req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ error: "Fill all the fields." });
            return;
        }

        const user = await userAuthModel.findOne({ email, });

        if (!user) {
            res.status(400).json({ error: "User not exist." });
            return;
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            res.status(400).json({ error: "Invalid password." });
            return;
        }

        const payload = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
        }

        const token = await createUserToken(payload);

        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            sameSite: "strict",
        }).status(200).json({ success: true, data: payload });
    } catch (err) {
        res.status(500).json({ error: "Internal server error." });
    }
}

export async function handleUserAuthentication(req: Request, res: Response) {
    try {
        const user = res.user;

        if (!user) {
            res.status(400).json({ error: "User data not found." });
            return;
        }

        res.status(200).json({ success: true, data: user });
    } catch (err) {
        res.status(500).json({ error: "Internal server error." });
    }
}

export async function handleUserSignout(req: Request, res: Response) {
    try {
        res.clearCookie("jwt").json({ success: true, message: "User successfully signout." });
    } catch (err) {
        res.status(500).json({ error: "Internal server error." });
    }
}

export async function handleUserForgetPassword(req: Request, res: Response) {
    try {
        const { email } = req.body;

        if (!email) {
            res.status(400).json({ error: "Email required." });
            return;
        }

        const user = await userAuthModel.findOne({ email, });

        if (!user) {
            res.status(400).json({ error: "User email not found." });
            return;
        }

        const transporter = nodemailer.createTransport({
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
        }

        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                res.status(500).json({ error: "Internal server error while sending mail." });
                return;
            } else {
                res.status(200).json({ success: true, message: "Mail send on respective email successfully." })
            }
        })
    } catch (err) {
        res.status(500).json({ error: "Internal server error." });
    }
}

export async function handleCheckValidUserLink(req: Request, res: Response) {
    try {
        const { userId } = req.params;

        const user = await userAuthModel.findOne({ _id: userId, });

        if (!user) {
            res.status(400).json({ error: "Invalid link." });
            return;
        }

        res.status(200).json({ success: true });
    } catch (err) {
        res.status(500).json({ error: "Internal server error." });
    }
}

export async function handleSetNewPassword(req: Request, res: Response) {
    try {
        const { userId } = req.params;

        const { password } = req.body;

        if (!password) {
            res.status(400).json({ error: "Fill all the fields." });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const updatedUser = await userAuthModel.findOneAndUpdate({ _id: userId }, { $set: { password: hashedPassword } });

        if (!updatedUser) {
            res.status(400).json({ error: "Something went wrong." });
            return;
        }

        res.status(200).json({ success: true, message: "Password updated successfully." });
    } catch (err) {
        res.status(500).json({ error: "Internal server error." });
    }
}