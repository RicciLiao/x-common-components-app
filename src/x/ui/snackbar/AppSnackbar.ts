import {AlertColor} from "@mui/material";

interface AppSnackbar {
    code: number,
    date: number,
    alertType: AlertColor,
    message: string,
}

export {type AppSnackbar};
