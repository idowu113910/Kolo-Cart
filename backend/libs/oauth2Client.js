import { google } from "googleapis";
import { googleAuthCreds } from "../config/env.js";

export const oauth2Client = new google.auth.OAuth2(
    googleAuthCreds.CLIENT_ID,
    googleAuthCreds.CLIENT_SECRET,
    googleAuthCreds.REDIRECT_URL,
)