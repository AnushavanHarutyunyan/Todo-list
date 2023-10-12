import React, { useState } from "react";
import cs from "classnames";
import { useSelector } from "react-redux";
import Modal from "../../components/Modal/Modal";
import { RootState } from "../../store/reducers";
import styles from "./home.module.css";
import ProjectItem from "../../components/ProjectItem/ProjectItem";

function Home() {
    const createdProject = useSelector((state: RootState) => state.projects.createdProject);
    const [isOpen, setToggle] = useState(false);

    const handleToggle = (value) => {
        setToggle(value);
    };

    return (
        <div>
            <div className={cs(styles.container)}>
                <h1>Project selection page</h1>
                <div className={styles.container_taskItem}></div>
                <div>
                    <a onClick={() => handleToggle(true)} className="button">
                        Create Project
                    </a>
                </div>
                {createdProject.map((proj, indx) => (
                    <div key={indx}>
                        <ProjectItem title={proj.name} id={proj.id} />
                    </div>
                ))}
                {isOpen ? <Modal isOpen={isOpen} setToggle={handleToggle} type="createProject" /> : null}
            </div>
        </div>
    );
}

export default Home;
