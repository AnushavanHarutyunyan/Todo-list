import { ITaskState } from "../props";
import { CreateProject, CreateTask, DeleteTask } from "../types";

const initialState: ITaskState = {
    createdProject: [],
};

export const ProjectReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case CreateProject:
            return {
                ...state,
                createdProject: [...state.createdProject, payload],
            };
        case CreateTask: {
            const updatedProjectsCreateTask = state.createdProject.map((project) => {
                if (project.id === payload.projectId) {
                    return {
                        ...project,
                        tasks: [...project.tasks, payload],
                    };
                }
                return project;
            });

            return {
                ...state,
                createdProject: updatedProjectsCreateTask,
            };
        }
        case DeleteTask: {
            const updatedProjectsDeleteTask = state.createdProject.map((project) => {
                if (project.id === payload.projectId) {
                    return {
                        ...project,
                        tasks: project.tasks.filter((task) => task.id !== payload.id),
                    };
                }
                return project;
            });

            return {
                ...state,
                createdProject: updatedProjectsDeleteTask,
            };
        }
        default:
            return state;
    }
};
