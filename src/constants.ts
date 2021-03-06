import dotenv from "dotenv";
dotenv.config();

export const __prod__ = process.env.NODE_ENV === "production";
export const COOKIE_NAME = "qid";
export const SECRET = process.env.SECRET as string;
export const FORGET_PASSWORD_PREFIX = "forget-password:";
export const DBNAME = process.env.DB_NAME;
export const DBUSERNAME = process.env.DB_USER;
export const DBPASSWORD = process.env.DB_PASS;
export const STMKEY = process.env.STMKEY;
export const REDIS_URL = process.env.REDIS_URL || `127.0.0.1:6379`;
export const DATABASE_URL = process.env.DATABASE_URL;
// export const CLIENT_ORIGIN =
//   process.env.CLIENT_ORIGIN || "http://localhost:3000";
export const CLIENT_ORIGIN =
  process.env.CLIENT_ORIGIN || "http://mini.local:3000";
