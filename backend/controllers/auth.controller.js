import mongoose from "mongoose";
import User from "../model/user.model.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { fullName, number, password } = req.body;

    const existingUser = await User.findOne({ number });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Number already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUsers = await User.create([{ fullName, number, password: hashedPassword }], {
      session,
    });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      success: true,
      message: "User created",
      data: {
        user: newUsers,
      },
    });
  } catch (err) {
    console.error(err);
    await session.abortTransaction();
    session.endSession();
    next(err);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { number, password } = req.body;

    const user = await User.findOne({ number });

    if (!user) {
      const error = new Error("Number not found");
      error.statusCode = 404;
      throw error;
    }

    const isPassword = await bcrypt.compare(password, user.password)

     if (!isPassword) {
       const error = new Error("Invalid password");
       error.statusCode = 401;
       throw error;
     }

    res.status(200).json({
      success: true,
      message: "User signed in successfully",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error)
  }
};


export const signOut = (req, res, next) => {
  if (!req.session) {
    return res.status(401).json({
      success: false,
      message: "No active session found.",
    });
  }

  req.session.destroy((error) => {
    if (error) {
      return next(error);
    }

res.clearCookie("kolocart.sid", {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  path: "/",
});

return res.status(200).json({
  success: true,
  message: "Signed out successfully.",
});
  });
};
