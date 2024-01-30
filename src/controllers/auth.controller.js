import { createNewUserService, getUSerByUserIdService, getUserByEmailService } from "../services/auth.service.js";
import * as bcrypt from "bcrypt";
import speakeasy from "speakeasy";
import { createQrCode } from "../utils/createQrCode.js";


const signUpController = async (req, res) => {
    try {
        const { email, pass_word, full_name } = req.body;
        const userFind = await getUserByEmailService(email);
        if (userFind) {
            res.status(400).send("email exist!");
            return;
        }

        const hashPass = bcrypt.hashSync(pass_word, 10);
        const secret = speakeasy.generateSecret();
        console.log(secret);
        const otpAuthUrl = speakeasy.otpauthURL({
            secret: secret.base32,
            label: 'test-2FA',
            issuer: '2FA',
        });
        const qrUrl = await createQrCode(otpAuthUrl);
        const newUser = {
            email,
            pass_word: hashPass,
            full_name,
            otpauth_url: secret.otpauth_url,
            secret_base32: secret.base32
        }
        await createNewUserService(newUser);
        res.status(201).json({
            urlQrCode: qrUrl
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

const login = async (req, res) => {
    try {
        const { email, pass_word } = req.body;
        const user = await getUserByEmailService(email);
        if (!user) {
            res.status(404).send("email not found!");
            return;
        }
        const isCorrectPass = bcrypt.compareSync(pass_word, user.pass_word);
        if (!isCorrectPass) {
            res.status(400).send("password incorrect!");
            return;
        }
        res.status(200).send("login by pass_word successful!");
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

const verify2FA = async (req, res) => {
    try {
        const { code, user_id } = req.body;
        const user = await getUSerByUserIdService(user_id);
        if (!user) {
            res.status(404).send("user not exist!");
            return;
        }
        const checkCode = speakeasy.totp.verify({
            secret: user.secret_base32,
            encoding: 'base32',
            token: code
        });
        if (checkCode) {
            res.status(200).send("code is correct!");
            return;
        }
        console.log(code, checkCode);
        res.status(400).send("code incorrect!");
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export {
    signUpController,
    login,
    verify2FA,
}