import User from "../model/user.model.js";

export const requireAuth = async (req, res, next) => {
  try {
    const userId = req.session?.userId;
if (!userId) {
  return res.status(401).json({
    success: false,
    message: "Authentication required. Please sign in.",
  });
}

const user = await User.findById(userId);

if (!user) {
  return res.status(401).json({
    success: false,
    message: "User session is no longer valid. Please sign in again.",
  });
}

req.user = user;

next();
;
  } catch (error) {
    next(error);
  }
};
