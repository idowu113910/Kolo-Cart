import { Router } from "express";
import { getUser } from "../controllers/user.controllers.js";

const userRouter = Router();

userRouter.get("/:id", getUser);

export default userRouter;
