import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import styles from "./AlertDialog.module.css";

const AlertDialog = ({
    openDialog,
    handleDeleteEntity,
    deleteId,
    isDeleting,
    setOpenDialog,
}: {
    openDialog: any;
    handleDeleteEntity: any;
    deleteId: any;
    isDeleting: any;
    setOpenDialog: any;
}) => {
    return (
        <div>
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Delete"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure to delete this client ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        className={styles.btnCancel}
                        onClick={() => {
                            setOpenDialog(false);
                        }}
                        disabled={isDeleting}
                    >
                        Cancel
                    </Button>
                    <Button
                        className={styles.btnYes}
                        onClick={() => {
                            handleDeleteEntity(deleteId);
                        }}
                        disabled={isDeleting}
                        autoFocus
                    >
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AlertDialog;
