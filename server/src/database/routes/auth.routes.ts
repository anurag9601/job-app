import express from "express";
import { handleUserAuthentication, handleUserSignin, handleUserSignup } from "../controllers/auth.controllers";
import protectRoute from "../../services/protect.route";
const userAuthRoute = express.Router();

userAuthRoute.post("/sign-up", handleUserSignup);

userAuthRoute.post("/sign-in", handleUserSignin);

userAuthRoute.get("/authentication", protectRoute, handleUserAuthentication);

export default userAuthRoute;