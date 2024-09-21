import express from "express";
import authRouter from "./routes/auth.js";
import testRouter from "./routes/test.js";
import userRouter from "./routes/user.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use("/api/test", testRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(8800, () => {
  console.log("running");
});
