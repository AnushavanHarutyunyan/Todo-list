import React from "react";
import { Link } from "react-router-dom";
import cs from "classnames";
import styles from "./navigation.module.css";

export default function Navigation() {
    return (
        <div>
            <ul>
                <li>
                    <Link
                        to="/home"
                        about="home"
                        className={cs(styles.nav__menu, {
                            // [styles.show__menu]: showMenu,
                            // [styles.nav__menu]: !showMenu,
                        })}
                    >
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/tasks" about="home">
                        Tasks
                    </Link>
                </li>
            </ul>
        </div>
    );
}
