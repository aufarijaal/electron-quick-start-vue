import { IpcMainEvent, IpcMainInvokeEvent } from "electron";

export interface IPCHandler {
  channelName: string;
  action: (
    event: IpcMainEvent | IpcMainInvokeEvent,
    ...args: unknown[]
  ) => Promise<unknown> | any | void;
}
