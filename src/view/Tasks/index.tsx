import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers";
import TaskItem from "../../components/TaskItem/TaskItem";
import styles from "./tasks.module.css";
import Modal from "../../components/Modal/Modal";
import uuid from "react-uuid";
import { IProject } from "../../store/props";

function Tasks() {
    const [isOpen, setToggle] = useState(false);
    const project = useSelector((state: RootState): Array<IProject> => state.projects.createdProject);

    const handleToggle = (value) => {
        setToggle(value);
    };

    return (
        <div>
            <h1>My Tasks page</h1>
            <div>
                <div className={styles.container}>
                    <div className={styles.container_taskItem}>
                        {/* <div className={styles.container_taskItem__status_queue}></div>
                        <div className={styles.container_taskItem__status_development}></div>
                        <div className={styles.container_taskItem__status_done}></div> */}
                        {project.map((proj) =>
                            proj.tasks.map((task) => {
                                return (
                                    <div key={uuid()}>
                                        <h1>Project Name {proj.name}</h1>
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
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
            {isOpen ? <Modal isOpen={isOpen} setToggle={handleToggle} type="createTask" /> : null}
        </div>
    );
}

export default Tasks;
