import crypto from "node:crypto";
import { oauth2Client } from "../libs/oauth2Client.js";
import { googleAuthCreds, common } from "../config/env.js";
import User from "../model/user.model.js";

export const googleAuth = (req, res) => {
const state = crypto.randomBytes(32).toString("hex");

req.session.state = state;

const authorizationUrl = oauth2Client.generateAuthUrl({
access_type: "offline",
scope: [
"openid",
"email",
"profile",
],
state,
prompt: "select_account",
});

res.redirect(authorizationUrl);
};

export const googleAuthCallback = async (req, res, next) => {
try {
const { code, state, error } = req.query;


if (error) {
  return res.redirect(
    `${common.CLIENT_URL}/login?error=google_auth_failed`,
  );
}

if (!code || !state || state !== req.session.state) {
  return res.status(400).json({
    success: false,
    message: "Invalid Google authentication state.",
  });
}

delete req.session.state;

const { tokens } = await oauth2Client.getToken(code);

if (!tokens.id_token) {
  return res.status(401).json({
    success: false,
    message: "Google did not return an identity token.",
  });
}

const ticket = await oauth2Client.verifyIdToken({
  idToken: tokens.id_token,
  audience: googleAuthCreds.CLIENT_ID,
});

const payload = ticket.getPayload();

if (!payload?.sub) {
  return res.status(401).json({
    success: false,
    message: "Could not verify your Google account.",
  });
}

const { sub, name, email, email_verified } = payload;

if (!email || !email_verified) {
  return res.status(401).json({
    success: false,
    message: "A verified Google email is required.",
  });
}

let user = await User.findOne({
  authProvider: "Google",
  providerId: sub,
});

if (!user) {
  user = await User.create({
    fullName: name?.trim() || "Google User",
    email,
    authProvider: "Google",
    providerId: sub,
    number: null,
    password: null,
    phoneVerified: false,
  });
}

// Save the authenticated user's ID in the session.
req.session.regenerate((regenerateError) => {
  if (regenerateError) return next(regenerateError);

  req.session.userId = user._id.toString();
  req.session.authProvider = user.authProvider;

  req.session.save((sessionError) => {
    if (sessionError) return next(sessionError);

    return res.status(200).json({
      success: true,
      message: "Google sign-in successful.",
      data: {
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          authProvider: user.authProvider,
          phoneVerified: user.phoneVerified,
        },
      },
    });
  });
});


} catch (error) {
next(error);
}
};
