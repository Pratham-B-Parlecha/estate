import express from "express";
import authRouter from "./routes/auth.js";
import testRouter from "./routes/test.js";
import userRouter from "./routes/user.js";
import postRouter from "./routes/post.js";
import chatRouter from "./routes/chat.js";
import messageRouter from "./routes/message.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use("/api/test", testRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message", messageRouter);

app.listen(8800, () => {
  console.log("running");
});
