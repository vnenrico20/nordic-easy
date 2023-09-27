import React from "react";
import { Link, useLocation, matchPath } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@mui/material";

import styles from "./Header.module.css";

const Header = () => {
    return (
        <div>
            <AppBar className={styles.appBar} position="static">
                <Toolbar>
                    <Typography className={styles.name} variant="h6">
                        Example
                    </Typography>
                    <Link
                        to={"/"}
                        className={`${
                            matchPath(useLocation().pathname, "/")
                                ? styles.activeLink
                                : styles.link
                        }`}
                    >
                        <Typography variant="body2">Home</Typography>
                    </Link>
                    <Link
                        to={"/add"}
                        className={`${
                            matchPath(useLocation().pathname, "/add")
                                ? styles.activeLink
                                : styles.link
                        }`}
                    >
                        <Typography variant="body2">Add</Typography>
                    </Link>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;
