import mongoose from "mongoose";
import User from "../model/user.model.js"

export const getUsers = async (req, res, next) => {

    try {
      const users = await User.find();
      res.status(200).json({
        success: true,
        message: "All users",
        data: users,
      });
    } catch (err) {
      next(err);
    }

}

export const getUser = async (req, res, next) => {

try {
    const userId = req.params.id
    
    if(!userId){
        return res.status(400).json({
          success: false,
          message: "User ID is required and cannot be undefined.",
        });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid User ID format." });
    }

    const user = await User.findById(userId)

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).send({
      success: true,
      message: `User by id ${userId} found `,
      data: user,
    });
} catch (error) {
    next(error)
}}