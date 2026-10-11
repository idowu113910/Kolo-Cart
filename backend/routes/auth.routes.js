import { Router } from "express";

import { signIn, signOut, signUp } from "../controllers/auth.controller.js";
import {
  googleAuth,
  googleAuthCallback,
} from "../controllers/google.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const authRouter = Router();

authRouter.get("/", (req, res) => {
  res.json({ message: "Hi" });
});
authRouter.get("/me", requireAuth, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Authenticated user retrieved successfully.",
    data: {
      user: {
        id: req.user._id,
        fullName: req.user.fullName,
        email: req.user.email,
        number: req.user.number,
        phoneVerified: req.user.phoneVerified,
        authProvider: req.user.authProvider,
      },
    },
  });
});

authRouter.post("/sign-up", signUp);
authRouter.post("/sign-in", signIn);
authRouter.post("/sign-out", requireAuth, signOut);

authRouter.get("/google", googleAuth);
authRouter.get("/google/callback", googleAuthCallback);

export default authRouter;
