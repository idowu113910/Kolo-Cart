import dotenv from "dotenv";

// Load environment variables from your .env file
dotenv.config();

export const googleAuthCreds = {
  CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  REDIRECT_URL: process.env.GOOGLE_CLIENT_REDIRECT_URL,
  SCOPES: [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
  ],
};

export const common = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  CLIENT_URL: process.env.CLIENT_URL ?? "http://localhost:5173",
  IS_PRODUCTION: process.env.NODE_ENV === "production",
  SESSION_SECRET: process.env.SESSION_SECRET,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_MAX_AGE : process.env.ACCESS_TOKEN_MAX_AGE,
  REFRESH_TOKEN_MAX_AGE : process.env.REFRESH_TOKEN_MAX_AGE,
  DB_URI: process.env.DB_URI,
};
