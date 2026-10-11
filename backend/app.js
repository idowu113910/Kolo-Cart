import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import cors from "cors";

import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import { common } from "./config/env.js";

const app = express();

app.use(
  cors({
    origin: common.CLIENT_URL,
    credentials: true,
  }),
);

app.use(express.json());

app.use(
  session({
    name: "kolocart.sid",
    secret: common.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: common.DB_URI,
    }),
    cookie: {
      httpOnly: true,
      secure: common.IS_PRODUCTION,
      sameSite: common.IS_PRODUCTION ? "none" : "lax",
      maxAge: 1000 * 60 * 60 * 24,
    },
  }),
);

app.get("/", (req, res) => {
  res.send("Kolo Cart");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);

export default app;
