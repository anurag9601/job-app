"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controllers_1 = require("../controllers/auth.controllers");
const protect_route_1 = __importDefault(require("../../services/protect.route"));
const userAuthRoute = express_1.default.Router();
userAuthRoute.post("/sign-up", auth_controllers_1.handleUserSignup);
userAuthRoute.post("/sign-in", auth_controllers_1.handleUserSignin);
userAuthRoute.get("/authentication", protect_route_1.default, auth_controllers_1.handleUserAuthentication);
userAuthRoute.get("/sign-out", protect_route_1.default, auth_controllers_1.handleUserSignout);
userAuthRoute.post("/forgot-password", auth_controllers_1.handleUserForgetPassword);
exports.default = userAuthRoute;
