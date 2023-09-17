import { ipcMain } from "electron";
import logger from "../services/logging";

export default function loadIpcHanlders() {
  const modules = import.meta.glob("../ipc_handlers/**/*.ts");

  Object.values(modules).forEach((module) => {
    module().then((handlers: any) => {
      if (!Array.isArray(handlers.default)) {
        throw new Error("The handlers is malformed");
      }

      for (const handler of handlers.default) {
        if (!handler.channelName) {
          throw new Error("The handlers is malformed");
        } else {
          if (typeof handler.channelName !== "string") {
            throw new Error("Channel name is must be a non-empty string");
          }
        }

        if (!handler.action) {
          throw new Error("The handlers is malformed");
        } else {
          if (typeof handler.action !== "function") {
            throw new Error("action must be a function");
          }
        }
      }

      handlers.default.forEach((handler: any) => {
        ipcMain.handle(handler.channelName, handler.action);
        logger.info(`"${handler.channelName}" registered`);
      });
    });
  });
}
