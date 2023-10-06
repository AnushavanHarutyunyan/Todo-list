import { CreateProject, CreateTask, DeleteTask } from "../types";

export const createTask = (payload) => ({ type: CreateTask, payload });
export const createProject = (payload) => ({ type: CreateProject, payload });
export const deleteTask = (payload) => ({ type: DeleteTask, payload });
export const editeTask = (payload) => ({
    type: "editTask",
    payload,
});
