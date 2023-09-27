import React from "react";
import styles from "./HomePage.module.css";
import Header from "../Header/Header";
import ListEntities from "../ListEntities/ListEntities";

const HomePage = () => {
    return (
        <div>
            <Header />
            <div className={styles.wrapper}>
                <ListEntities />
            </div>
        </div>
    );
};

export default HomePage;
