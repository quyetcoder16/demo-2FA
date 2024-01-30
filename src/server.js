import express from "express";
import dotenv from "dotenv";
import rootRouter from "./routers/root.router.js";
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors({
    origin: "*"
}));
app.use(express.json());
app.use(rootRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("server running on port: ", port);
})