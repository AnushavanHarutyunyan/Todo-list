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
            return {
                ...state,
                createdProject: state.createdProject.map((project) => {
                    if (project.id === payload.projectId) {
                        return {
                            ...project,
                            tasks: [...project.tasks, payload],
                        };
                    }
                    return project;
                }),
            };
        }
        case "editTask": {
            return {
                ...state,
                createdProject: state.createdProject.map((project) => {
                    if (project.id === payload.projectId) {
                        return {
                            ...project,
                            tasks: project.tasks.map((task) => {
                                if (task.id === payload.id) {
                                    return {
                                        ...task,
                                        ...payload,
                                    };
                                }
                                return task;
                            }),
                        };
                    }
                    return project;
                }),
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
