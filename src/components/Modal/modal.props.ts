export interface IModal {
    isOpen: boolean;
    type: "createProject" | "createTask" | "editTask";
    id?: string;
    projectId?: string;
    setToggle: (a: boolean) => void;
}
