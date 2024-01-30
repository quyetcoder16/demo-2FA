import express from "express";
import { login, signUpController, verify2FA } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/sign-up", signUpController);
authRouter.post("/login", login);
authRouter.post("/verify2FA", verify2FA);

export default authRouter;