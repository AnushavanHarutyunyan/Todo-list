import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask } from "../../store/actions";
import formatDate from "../../utils/formatDate";
import Modal from "../Modal/Modal";
import styles from "./taskItem.module.css";

export default function TaskItem({ title, description, range, priority, status, id, projectId }) {
    const [isOpen, setToggle] = useState(false);
    const dispatch = useDispatch();

    const handleEdit = () => {
        setToggle(true);
    };
    const handleDelete = () => {
        dispatch(deleteTask({ id, projectId }));
    };
    const handleToggle = (value) => {
        setToggle(value);
    };

    return (
        <div className={styles.taskItem_content}>
            <div>
                <h3>Title - {title}</h3>
                <p>Description - {description}</p>
                <p>Start - {formatDate(range)?.start}</p>
                <p>End - {formatDate(range)?.end}</p>
                <p>Priority - {priority}</p>
                <p>Status - {status}</p>
            </div>
            <a className="button" onClick={handleEdit}>
                Edit
            </a>
            <a className="button" onClick={handleDelete}>
                Delete
            </a>
            {isOpen ? <Modal isOpen={isOpen} setToggle={handleToggle} type="editTask" id={id} projectId={projectId} /> : null}
        </div>
    );
}
