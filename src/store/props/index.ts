export interface IProject {
    id: string;
    name: string;
    tasks: Array<ITask>;
}

export interface ITask {
    id: string;
    title: string;
    description: string;
    start: Date;
    end: Date;
    priority: string;
    attachedFiles: any[]; // Change to the actual type
    status: string;
    subTasks: any[]; // Change to the actual type
}

export interface ITaskState {
    createdProject: Array<IProject>;
}

export interface IAppState {
    projects: {
        createdProject: IProject[];
    };
    tasks: {
        createdTask: ITask[];
    };
}
