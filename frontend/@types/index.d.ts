import { IpcMainEvent, IpcMainInvokeEvent } from "electron";

export type BackendCall = (
  event: IpcMainEvent | IpcMainInvokeEvent,
  args: U,
) => Promise<T>;
