import DailyRotateFile from "winston-daily-rotate-file";
import { createLogger, transports, format } from "winston";
import { logFilesPath } from "../config";
import { join } from "path";

const { combine, timestamp, printf } = format;

// Define the log format
const logFormat = printf(({ timestamp, level, message }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// Create a logger instance
const logger = createLogger({
  level: "info",
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), // Define timestamp format
    logFormat,
  ),
  transports: [
    new transports.Console(),

    new DailyRotateFile({
      filename: join(logFilesPath, "%DATE%.log"),
      datePattern: "YYYY-MM-DD", // Daily rotation
      zippedArchive: true, // Compress old log files
      maxSize: "20m", // Rotate when the log file reaches 20MB
      maxFiles: "14d", // Keep logs for 14 days
    }),
  ],
});

export default logger;
