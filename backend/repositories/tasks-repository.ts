import { db } from "../utils/db";

export default class TaskRepository {
  constructor() {}

  /**
   * Create a new task
   * @param description the description of the task
   */
  async create(description: string) {
    try {
      await db.table("tasks").insert({
        description,
      });
    } catch (error: any) {
      throw error;
    }
  }

  /**
   * Get all of the tasks
   * @returns all tasks available
   */
  async getAll() {
    try {
      const tasks = await db.select("*").from("tasks");
      return tasks;
    } catch (error: any) {
      throw error;
    }
  }

  /**
   * Set task completed status to true or false
   * @param id the id of the task
   * @param completed the completed status to update
   */
  async toggleCompleted(id: number, completed: boolean) {
    try {
      await db
        .table("tasks")
        .update({
          completed,
        })
        .where("id", id);
    } catch (error: any) {
      throw error;
    }
  }

  /**
   * Delete a task
   * @param id the id of the task
   */
  async delete(id: number) {
    try {
      await db.table("tasks").delete().where("id", id);
    } catch (error: any) {
      throw error;
    }
  }
}
