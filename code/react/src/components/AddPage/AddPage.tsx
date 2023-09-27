import React, { useState } from "react";
import AddForm from "../AddForm/AddForm";
import styles from "./AddPage.module.css";
import Header from "../Header/Header";

const AddPage = () => {
    return (
        <div>
            <Header />
            <div className={styles.wrapper}>
                <AddForm />
            </div>
        </div>
    );
};

export default AddPage;
