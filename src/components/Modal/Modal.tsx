import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import formatDate from "../../utils/formatDate";
import { useDispatch, useSelector } from "react-redux";
import { createProject, createTask, editeTask } from "../../store/actions";
import { IModal } from "./modal.props";
import uuid from "react-uuid";
import cs from "classnames";
import styles from "./modal.module.css";
import { RootState } from "../../store/reducers";
import { ITask } from "../../store/props";

export default function Modal({ isOpen, type, id, setToggle, projectId }: IModal) {
    const project = useSelector((state: RootState) => state.projects.createdProject.find((proj) => proj.id === projectId));
    const task: ITask = project?.tasks.find((task) => task.id === id);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [selectedOption, setSelectedOption] = useState<string>("");
    const [range, setRange] = useState<DateRange | undefined>(task?.range);
    const dispatch = useDispatch();

    let footer = <p>Please pick the first day.</p>;
    if (range?.from) {
        if (!range.to) {
            footer = <p>{format(range.from, "PPP")}</p>;
        } else if (range.to) {
            footer = (
                <p>
                    {format(range.from, "PPP")}–{format(range.to, "PPP")}
                </p>
            );
        }
    }

    const handleClose = () => {
        if (setToggle) {
            setToggle(false);
        }
    };

    const handleModalClick = () => {
        if (type === "createProject") handleCreateProject();
        if (type === "createTask") handleCreateTask();
        if (type === "editTask") handleEditTask();
    };

    const handleCreateProject = () => {
        const newProject = {
            id: uuid(),
            name: title,
            tasks: [],
        };
        dispatch(createProject(newProject));
        setToggle(false);
    };

    const handleCreateTask = () => {
        const newTask = {
            id: uuid(),
            projectId,
            title,
            description,
            start: formatDate(range)?.start,
            end: formatDate(range)?.end,
            priority: selectedOption,
            attachedFiles: [],
            status: selectedOption,
            subTasks: [],
            range,
        };

        dispatch(createTask(newTask));
        setToggle(false);
        setTitle("");
        setDescription("");
        setSelectedOption("");
        setRange(undefined);
    };

    const handleEditTask = () => {
        const editedTask = {
            id,
            title,
            description,
            projectId,
            start: formatDate(range)?.start,
            end: formatDate(range)?.end,
            priority: selectedOption,
            attachedFiles: [],
            status: selectedOption,
            subTasks: [],
            range,
        };
        dispatch(editeTask(editedTask));
    };

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        if (task) {
            task.status = event.target.value;
        }
    };

    useEffect(() => {
        if (type === "editTask" && task) {
            setTitle(task.title || "");
            setDescription(task.description || "");
            setSelectedOption(task.status || "");
        }
    }, [task, type, range]);

    return (
        <>
            {isOpen ? (
                <div className={cs(styles.services__modal, styles.active__modal)}>
                    <div className={styles.services__modal_content}>
                        <div className={styles.modal_title}>
                            <div>
                                <label>Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    name={type === "createProject" ? "Projecttitle" : "Tasktitle"}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            {type === "createTask" || type === "editTask" ? (
                                <>
                                    <div>
                                        <label>Description</label>
                                        <input
                                            type="text"
                                            value={description}
                                            name="description"
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </div>
                                    <div className={styles.input_content}>
                                        <div className={styles.input_content__item}>
                                            <label htmlFor="Queue">Queue</label>
                                            <input
                                                type="checkbox"
                                                id="queue"
                                                value="queue"
                                                checked={selectedOption === "queue" || (type === "editTask" && task?.status === "queue")}
                                                onChange={handleOptionChange}
                                            />
                                        </div>
                                        <div className={styles.input_content__item}>
                                            <label htmlFor="Development">Development</label>
                                            <input
                                                type="checkbox"
                                                id="development"
                                                value="development"
                                                checked={
                                                    selectedOption === "development" ||
                                                    (type === "editTask" && task?.status === "development")
                                                }
                                                onChange={handleOptionChange}
                                            />
                                        </div>
                                        <div className={styles.input_content__item}>
                                            <label htmlFor="Done">Done</label>
                                            <input
                                                type="checkbox"
                                                id="done"
                                                value="done"
                                                checked={selectedOption === "done" || (type === "editTask" && task?.status === "done")}
                                                onChange={handleOptionChange}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label>Date</label>
                                        <DayPicker id="test" mode="range" selected={range} footer={footer} onSelect={setRange} />
                                    </div>
                                </>
                            ) : null}
                        </div>
                        <div>
                            <a className="button" onClick={handleModalClick}>
                                {type === "editTask" ? "Edit" : "Create"}
                            </a>
                            <a className="button" onClick={handleClose}>
                                Cancel
                            </a>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}
