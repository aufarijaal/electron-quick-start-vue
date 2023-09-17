import { IPCHandler } from "../@types/ipc-handler";
import TaskRepository from "../repositories/tasks-repository";

const taskRepository = new TaskRepository();

const handlers: IPCHandler[] = [
  {
    channelName: "/tasks/get_all",
    action: async (_event, _args) => {
      try {
        const tasks = await taskRepository.getAll();
        return tasks;
      } catch (error: any) {
        throw error;
      }
    },
  },
  {
    channelName: "/tasks/add",
    action: async (_event, description: string) => {
      try {
        await taskRepository.create(description);
      } catch (error: any) {
        throw error;
      }
    },
  },
  {
    channelName: "/tasks/toggle_completed",
    action: async (_event, id: number, completed: boolean) => {
      try {
        await taskRepository.toggleCompleted(id, completed);
      } catch (error: any) {
        throw error;
      }
    },
  },
  {
    channelName: "/tasks/delete",
    action: async (_event, id: number) => {
      try {
        await taskRepository.delete(id);
      } catch (error: any) {
        throw error;
      }
    },
  },
];

export default handlers;
