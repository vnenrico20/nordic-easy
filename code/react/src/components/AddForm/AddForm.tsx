import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import styles from "./AddForm.module.css";
import {TextField, Button, Typography, TextareaAutosize, Box} from "@mui/material";
import { useAddEntityMutation } from "../../features/api/apiSlice";
import AlertModal from "../AlertModal/AlertModal";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch } from "../../app/hooks";
import { setClientStatus } from "../../redux/Slice/ClientSlice";

const validationSchema = yup.object({
    client_id: yup
        .string()
        .uuid("Enter a valid uuid id")
        .required("Client id is required"),
    email: yup
        .string()
        .email("Enter a valid email")
        .required("Email is required"),
    phone_number: yup
        .string()
        .matches(/^\+?[0-9]+$/, "Phone number is not valid"),
    name: yup.string().required("Name is required"),
    comment: yup.string().required("Comment is required").max(1000),
});

const AddForm = () => {
    const formik = useFormik({
        initialValues: {
            client_id: "",
            email: "",
            phone_number: "",
            name: "",
            comment: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const params = new URLSearchParams();
            params.append("email", values.email);
            params.append("name", values.name);
            params.append("client_id", values.client_id);
            params.append("comment", values.comment);
            params.append("phone_number", values.phone_number);
            try {
                await addEntity(params).unwrap();
                dispatch(setClientStatus("create"));
                navigate("/");
            } catch (error: any) {
                setStatusCode(error.status);
                setMessage(error.data.message);
                setShowAlert(true);
                console.error(error);
                setTimeout(() => {
                    setShowAlert(false);
                }, 3000);
            }
        },
    });

    const generateUuid = () => {
        const newClientId = uuidv4();
        formik.setFieldValue('client_id', newClientId);
    };

    const dispatch = useAppDispatch();

    const navigate = useNavigate();
    const [addEntity] = useAddEntityMutation();
    const [showAlert, setShowAlert] = useState(false);
    const [statusCode, setStatusCode] = useState(200);
    const [message, setMessage] = useState("");

    return (
        <div>
            <Typography
                sx={{
                    mt: 4,
                    mb: 2,
                    justifyContent: "center",
                    alignContent: "center",
                    display: "flex",
                }}
                variant="h6"
                component="div"
            >
                Add Client
            </Typography>
            <form className={styles.addForm} onSubmit={formik.handleSubmit}>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <Box sx={{
                        display: 'flex',
                        flex: 1,
                        flexDirection: 'row'
                    }}>
                        <TextField
                            fullWidth
                            id="client_id"
                            name="client_id"
                            label="Client ID"
                            value={formik.values.client_id}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.client_id &&
                                Boolean(formik.errors.client_id)
                            }
                            className={styles.mt10}
                        />
                        <Button
                            variant="contained"
                            color="success"
                            onClick={generateUuid}
                            sx={{
                                fontSize: '0.75rem',
                                fontWeight: 'bold',
                                marginLeft: '0.5rem',
                                width: '13.5rem'
                            }}
                            className={styles.mt10}
                        >
                            Generate UUID
                        </Button>
                    </Box>
                    {formik.errors.client_id && formik.touched.client_id && (
                        <div className={styles.errorText}>
                            {formik.errors.client_id}
                        </div>
                    )}
                </Box>
                <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    className={styles.mt10}
                />
                {formik.errors.email && formik.touched.email && (
                    <div className={styles.errorText}>
                        {formik.errors.email}
                    </div>
                )}
                <TextField
                    fullWidth
                    id="phone_number"
                    name="phone_number"
                    label="Phone number"
                    value={formik.values.phone_number}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                        formik.touched.phone_number &&
                        Boolean(formik.errors.phone_number)
                    }
                    className={styles.mt10}
                />
                {formik.errors.phone_number && formik.touched.phone_number && (
                    <div className={styles.errorText}>
                        {formik.errors.phone_number}
                    </div>
                )}
                <TextField
                    fullWidth
                    id="name"
                    name="name"
                    label="Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    className={styles.mt10}
                />
                {formik.errors.name && formik.touched.name && (
                    <div className={styles.errorText}>{formik.errors.name}</div>
                )}
                <TextareaAutosize
                    id="comment"
                    placeholder="Comment"
                    name="comment"
                    value={formik.values.comment}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`${styles.textareaComment} ${
                        formik.errors.comment && formik.touched.comment
                            ? styles.textareaError
                            : styles.textareaNormal
                    }`}
                    minRows={5}
                />
                {formik.errors.comment && formik.touched.comment && (
                    <div className={styles.errorText}>
                        {formik.errors.comment}
                    </div>
                )}
                <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    type="submit"
                    className={styles.mt10}
                    disabled={formik.isSubmitting}
                >
                    Submit
                </Button>
                {showAlert && (
                    <AlertModal statusCode={statusCode} text={message} />
                )}
            </form>
        </div>
    );
};

export default AddForm;
