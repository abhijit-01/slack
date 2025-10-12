import dotenv from "dotenv";
dotenv.config();
export const ENV = {
  PORT: process.env.PORT || 5001,
  MONGO_URL: process.env.MONGO_URL || "JUSTA URL",
  NODE_ENV: process.env.NODE_ENV || "development",
  CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY || "JUSTAKEY",
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY || "JUSTAKEY",
  STREAM_API_KEY: process.env.STREAM_API_KEY,
  STREAM_API_SECRET: process.env.STREAM_API_SECRET,
  SENTRY_DSN: process.env.SENTRY_DSN,
  INGEST_EVENT_KEY: process.env.INGEST_EVENT_KEY,
  INGEST_SIGNING_KEY: process.env.INGEST_SIGNING_KEY,
};
