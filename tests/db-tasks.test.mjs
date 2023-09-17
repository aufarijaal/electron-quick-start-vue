import {expect, test} from "vitest";
import TaskRepository from "../backend/repositories/tasks-repository";

const taskRepository = new TaskRepository();

test("Add new task", () => {
    taskRepository.create("Grocery shopping");
});