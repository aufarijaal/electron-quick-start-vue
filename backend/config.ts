import { join } from "path";
import pkg from "../package.json";
import { homedir } from "os";

export const appName = pkg.name ?? "electron-quick-start-vue-element-plus";
export const logFilesPath = join(homedir(), appName, "logs");
export const dbFilePath = join(homedir(), appName);
