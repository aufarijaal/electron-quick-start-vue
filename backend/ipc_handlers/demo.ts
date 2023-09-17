import { IPCHandler } from "../@types/ipc-handler";
import pkg from "../../package.json";

const handlers: IPCHandler[] = [
  {
    channelName: "/test",
    action: (_event, _args) => {
      try {
        return "Hello from main process";
      } catch (error: any) {
        throw error;
      }
    },
  },
  {
    channelName: "/versions",
    action: (_event, _args) => {
      try {
        return {
          nodejs: process.versions.node,
          electron: process.versions.electron,
          chromium: process.versions.chrome,
        };
      } catch (error: any) {
        throw error;
      }
    },
  },
  {
    channelName: "/dependencies",
    action: (_event, _args) => {
      try {
        const dependencies: string[] = [];
        const devDependencies: string[] = [];

        for (const [key, value] of Object.entries(pkg.dependencies)) {
          dependencies.push(`${key}: ${value}`);
        }

        for (const [key, value] of Object.entries(pkg.devDependencies)) {
          devDependencies.push(`${key}: ${value}`);
        }

        return {
          dependencies,
          devDependencies,
        };
      } catch (error: any) {
        throw error;
      }
    },
  },
];

export default handlers;
