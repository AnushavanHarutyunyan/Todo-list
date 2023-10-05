import React from "react";
import styles from "./projectItem.module.css";
import { Link } from "react-router-dom";

export default function ProjectItem({ title, id }) {
    return (
        <div className={styles.taskItem_content}>
            <Link to={`/tasks/${id}`}>
                <h3>Project Name - {title}</h3>
            </Link>
        </div>
    );
}
