import { Alert, Snackbar } from "@mui/material";

const AlertModal = ({ text, statusCode }: { text: any; statusCode: any }) => {
    if (statusCode === 200) {
        return (
            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }}  open={true} autoHideDuration={3000}>
                <Alert severity="success">
                    {text}
                </Alert>
            </Snackbar>
        );
    } else {
        return (
            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={true} autoHideDuration={3000}>
                <Alert severity="error">
                    Error - {text}
                </Alert>
            </Snackbar>
        );
    }
};

export default AlertModal;
