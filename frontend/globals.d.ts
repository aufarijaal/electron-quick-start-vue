import { electronApi } from "../electron/preload";

declare global {
  interface Window {
    api: typeof electronApi;
  }
}
