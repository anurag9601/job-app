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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = protectRoute;
const jwt_1 = require("./jwt");
function protectRoute(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.cookies.jwt;
        if (!token) {
            res.status(400).json({ error: "Token not found." });
            return;
        }
        const validTokenUserData = yield (0, jwt_1.verifyUserToken)(token);
        if (!validTokenUserData) {
            res.status(401).json({ error: "Unauthorized user token." });
            return;
        }
        res.user = validTokenUserData;
        next();
    });
}
