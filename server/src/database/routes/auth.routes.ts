import express from "express";
import { handleCheckValidUserLink, handleSetNewPassword, handleUserAuthentication, handleUserForgetPassword, handleUserSignin, handleUserSignout, handleUserSignup } from "../controllers/auth.controllers";
import protectRoute from "../../services/protect.route";
const userAuthRoute = express.Router();

userAuthRoute.post("/sign-up", handleUserSignup);

userAuthRoute.post("/sign-in", handleUserSignin);

userAuthRoute.get("/authentication", protectRoute, handleUserAuthentication);

userAuthRoute.get("/sign-out", protectRoute, handleUserSignout);

userAuthRoute.post("/forgot-password", handleUserForgetPassword);

userAuthRoute.get("/valid-link/:userId", handleCheckValidUserLink);

userAuthRoute.post("/new-password/:userId", handleSetNewPassword);

export default userAuthRoute;