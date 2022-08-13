import { Alert, AlertColor, IconButton, Snackbar as Snack } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import React from "react";

const SnackBar = ({ open, setOpen, message, type }:
    {
        open: boolean,
        setOpen: React.Dispatch<React.SetStateAction<boolean>>,
        message: string,
        type: AlertColor | undefined
    }) => {
    const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }
    const snackBarContent = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleSnackbarClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );
    return (
        <Snack
            open={open}
            autoHideDuration={5000}
            onClose={handleSnackbarClose}
            message={message}
            action={snackBarContent}
        >
            <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snack>
    )
}
export default SnackBar;