import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import styles from "./EditForm.module.css";
import { TextField, Button, TextareaAutosize } from "@mui/material";
import { useUpdateEntityMutation } from "../../features/api/apiSlice";
import AlertModal from "../AlertModal/AlertModal";

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
        comment: yup.string().required("Comment is required").max(1000, "Comment must be at most 1000 characters"),
});

const EditForm = ({
    client_id,
    email,
    name,
    phone_number,
    comment,
}: {
    client_id: string;
    email: string;
    name: any;
    phone_number: any;
    comment: any;
}) => {
    const formik = useFormik({
        initialValues: {
            client_id,
            email,
            phone_number,
            name,
            comment,
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
                await updateEntity(params).unwrap();
                setShowAlert(true);
                setMessage("Client has been updated successfully");
                setStatusCode(200);
                setTimeout(() => {
                    setShowAlert(false);
                }, 3000);
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

    const [showAlert, setShowAlert] = useState(false);
    const [statusCode, setStatusCode] = useState(200);
    const [message, setMessage] = useState("");

    const [updateEntity] = useUpdateEntityMutation();

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id="client_id"
                    name="client_id"
                    label="Client id"
                    value={formik.values.client_id}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                        formik.touched.client_id &&
                        Boolean(formik.errors.client_id)
                    }
                    className={styles.mt10}
                />
                {formik.errors.client_id && formik.touched.client_id && (
                    <div className={styles.errorText}><>{formik.errors.client_id}</></div>
                )}
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
                    <div className={styles.errorText}><>{formik.errors.email}</></div>
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
                    <div className={styles.errorText}><>{formik.errors.phone_number}</></div>
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
                    <div className={styles.errorText}><>{formik.errors.name}</></div>
                )}
                <TextareaAutosize
                    id="comment"
                    placeholder="Comment"
                    name="comment"
                    value={formik.values.comment}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`${styles.textareaComment} ${(formik.errors.comment && formik.touched.comment) ? styles.textareaError : styles.textareaNormal}`}
                    minRows={5}
                />
                {formik.errors.comment && formik.touched.comment && (
                    <div className={styles.errorText}><>{formik.errors.comment}</></div>
                )}
                <Button
                    color="error"
                    variant="contained"
                    fullWidth
                    type="submit"
                    className={styles.mt10}
                    disabled={formik.isSubmitting}
                >
                    Edit
                </Button>
            </form>
            {showAlert && <AlertModal statusCode={statusCode} text={message} />}
        </div>
    );
};

export default EditForm;
