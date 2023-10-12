import React, { useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers";
import TaskItem from "../../components/TaskItem/TaskItem";
import styles from "./task.module.css";
import Modal from "../../components/Modal/Modal";
import uuid from "react-uuid";

function Task() {
    const { id } = useParams();
    const [isOpen, setToggle] = useState(false);
    const project = useSelector((state: RootState) => state.projects.createdProject?.find((proj) => proj.id === id));

    const handleToggle = (value) => {
        setToggle(value);
    };

    return (
        <div>
            <h1>My Tasks page {id}</h1>
            <div>
                <div className={styles.container}>
                    <div className={styles.container_taskItem}>
                        {project?.tasks.map((task) => (
                            <div key={uuid()}>
                                <TaskItem
                                    title={task.title}
                                    description={task.description}
                                    range={task.range}
                                    priority={task.priority}
                                    status={task.status}
                                    id={task.id}
                                    projectId={task.projectId}
                                />
                            </div>
                        ))}
                    </div>
                    <div>
                        <a onClick={() => handleToggle(true)} className="button">
                            Create Task
                        </a>
                    </div>
                </div>
            </div>
            {isOpen ? <Modal isOpen={isOpen} setToggle={handleToggle} type="createTask" projectId={id} /> : null}
        </div>
    );
}

export default Task;
