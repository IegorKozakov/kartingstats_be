import * as dotenv from "dotenv";
dotenv.config();

type Config = {
  telemetry_url: string;
  listen: boolean;
  port: number;
  db_string: string;
};

export default {
  telemetry_url: process.env.STATISTICS_URL || "",
  listen: process.env.LISTEN === "true",
  port: Number(process.env.PORT) || 3000,
  db_string: process.env.DB_STRING,
} as Config;
