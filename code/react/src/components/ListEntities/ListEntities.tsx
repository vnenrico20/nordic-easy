import React, { useEffect, useState } from "react";
import {
    Button,
    Grid,
    ListItem,
    Typography,
    List,
    IconButton,
    ListItemAvatar,
    Avatar,
    ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreIcon from "@mui/icons-material/MoreHoriz";
import styles from "./ListEntities.module.css";
import EditForm from "../EditForm/EditForm";
import {
    useGetListQuery,
    useDeleteEntityMutation,
} from "../../features/api/apiSlice";
import AlertDialog from "../AlertDialog/AlertDialog";
import AlertModal from "../AlertModal/AlertModal";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
    setClientStatus,
    selectClientStatus,
} from "../../redux/Slice/ClientSlice";

const ListEntities = () => {
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteId, setDeleteId] = useState("");
    const [activeEntity, setActiveEntity] = useState(-1);
    const { data, isLoading, isError, error } = useGetListQuery("Entities");
    const [clients, setClients] = useState([]);
    const [deleteEntity] = useDeleteEntityMutation();
    const [showAlert, setShowAlert] = useState(false);
    const [statusCode, setStatusCode] = useState(200);
    const [message, setMessage] = useState("");

    const clientStatus = useAppSelector(selectClientStatus);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (clientStatus === "create") {
            setShowAlert(true);
            setMessage("A new client has been successfully created");
            setStatusCode(200);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
            dispatch(setClientStatus("idle"));
        }
    }, [clientStatus, dispatch]);

    useEffect(() => {
        if (data) {
            // @ts-ignore
            setClients(data?.data ?? []);
        } else {
            setClients([]);
        }
    }, [data]);

    const handleShowEntity = (index: number) => {
        if (index === activeEntity) {
            setActiveEntity(-1);
        } else setActiveEntity(index);
    };

    const handleDeleteEntity = async (id: string) => {
        const params = new URLSearchParams();
        params.append("client_id", id);
        try {
            setIsDeleting(true);
            await deleteEntity(params).unwrap();
            setOpenDialog(false);
            setActiveEntity(-1);
            setShowAlert(true);
            setMessage("Client has been deleted successfully");
            setStatusCode(200);
            setIsDeleting(false);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        } catch (error: any) {
            setOpenDialog(false);
            setStatusCode(error.status);
            setMessage(error.data.message);
            setShowAlert(true);
            console.error(error);
            setIsDeleting(false);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        }
    };

    const handleAddUser = () => {
        navigate("/add");
    };

    return (
        <Grid item xs={12} md={6}>
            <AlertDialog
                openDialog={openDialog}
                handleDeleteEntity={handleDeleteEntity}
                deleteId={deleteId}
                isDeleting={isDeleting}
                setOpenDialog={setOpenDialog}
            />
            <div className={styles.listHeader}>
                <Typography
                    sx={{
                        justifyContent: "center",
                        alignContent: "center",
                        display: "flex",
                        justifySelf: "center",
                        alignSelf: "center",
                        margin: "4px auto 10px",
                    }}
                    variant="h6"
                    component="div"
                >
                    Client List
                </Typography>
            </div>
            <Button
                disabled={isLoading}
                className={styles.btnAddClient}
                variant="contained"
                onClick={handleAddUser}
            >
                Add Client
            </Button>
            {showAlert && <AlertModal statusCode={statusCode} text={message} />}
            {isError ? (
                <p>
                    <>{error}</>
                </p>
            ) : isLoading ? (
                <p>Loading...</p>
            ) : (
                <List dense={true} className={styles.list}>
                    {clients.map((client: any, index: number) => {
                        return (
                            <div key={index}>
                                <ListItem className={styles.listItem}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <AccountCircleIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={client.name}
                                        secondary={client.email}
                                        className={styles.listItemText}
                                    />
                                    <IconButton
                                        aria-label="delete"
                                        onClick={() => handleShowEntity(index)}
                                    >
                                        <MoreIcon />
                                    </IconButton>
                                    <IconButton
                                        aria-label="delete"
                                        onClick={(event) => {
                                            setOpenDialog(true);
                                            event.preventDefault();
                                            setDeleteId(client.client_id);
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItem>
                                {activeEntity === index && (
                                    <EditForm {...client} />
                                )}
                            </div>
                        );
                    })}
                    {clients.length === 0 && <p>No Clients Found</p>}
                </List>
            )}
        </Grid>
    );
};

export default ListEntities;
