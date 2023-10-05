import React, { useState } from "react";
import { format } from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import formatDate from "../../utils/formatDate";
import { useDispatch, useSelector } from "react-redux";
import { createProject, createTask } from "../../store/actions";
import { IModal } from "./modal.props";
import uuid from "react-uuid";
import cs from "classnames";
import styles from "./modal.module.css";
import { RootState } from "../../store/reducers";

export default function Modal({ isOpen, type, id, setToggle, projectId }: IModal) {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [selectedOption, setSelectedOption] = useState<string>("");
    const [range, setRange] = useState<DateRange | undefined>();

    const project = useSelector((state: RootState) => state.projects.createdProject.find((proj) => proj.id === projectId));
    const task = project?.tasks.find((task) => task.id === id);

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

    const handleAdd = () => {
        const formatedDate = formatDate(range);
        const newTask = {
            id: uuid(),
            projectId: id,
            title,
            description,
            start: formatedDate.start,
            end: formatedDate.end,
            priority: selectedOption,
            attachedFiles: [],
            status: selectedOption,
            subTasks: [],
        };

        if ((type === "createTask" && setToggle) || (type === "editTask" && setToggle)) {
            dispatch(createTask(newTask));
            setToggle(false);
        }

        if (type === "createProject" && setToggle) {
            const newProject = {
                id: uuid(),
                name: title,
                tasks: [],
            };
            dispatch(createProject(newProject));
            setToggle(false);
        }

        setTitle("");
        setDescription("");
        setSelectedOption("");
        setRange(undefined);
    };

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        if (task) {
            task.status = event.target.value;
        }
    };

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
                                    value={type === "editTask" ? task?.title : title}
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
                                            value={type === "editTask" ? task?.description : description}
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
                            <a className="button" onClick={handleAdd}>
                                {type === "editTask" ? "Edit" : "Add"}
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
