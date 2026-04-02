import CloseIcon from "@mui/icons-material/Close";
import {Alert, AlertColor, AlertTitle, IconButton, Typography} from "@mui/material";
import {format} from "date-fns";
import {CustomContentProps, SnackbarContent, SnackbarProvider, useSnackbar} from "notistack";
import {forwardRef, type ReactNode, useCallback, useEffect} from "react";
import {removeSnackbar} from "../../slice/appSnackbarSlice";
import {AppSnackbar} from "./AppSnackbar";

interface AppAlertInterface {
    message: string,
    date: number,
    severity: AlertColor,
}

interface AppAlertProps extends CustomContentProps {
    data: AppAlertInterface,
}

interface AppSnackbarComponentProps {
    snackbarState: AppSnackbar;
    dispatch: (action: any) => void;
}

interface AppSnackbarProviderProps {
    children: ReactNode;
    snackbarState: AppSnackbar;
    dispatch: (action: any) => void;
}

const AppSnackbarComponent = ({snackbarState, dispatch}: AppSnackbarComponentProps) => {
    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
        if (snackbarState.message && snackbarState.alertType) {
            const appAlert: AppAlertInterface = {
                message: snackbarState.message,
                date: snackbarState.date,
                severity: snackbarState.alertType,
            };
            enqueueSnackbar(snackbarState.message + snackbarState.date,
                {
                    variant: "alert" as any,
                    autoHideDuration: 6000,
                    preventDuplicate: true,
                    onClose: () => dispatch(removeSnackbar()),
                    data: appAlert
                });
        }
    }, [snackbarState, enqueueSnackbar, dispatch]);

    return (<></>);
};

const AppSnackbarProvider = ({children, snackbarState, dispatch}: AppSnackbarProviderProps) => {

    return (
        <SnackbarProvider maxSnack={3}
                          anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                          Components={{
                              alert: AppAlert
                          } as any}
        >
            <AppSnackbarComponent snackbarState={snackbarState} dispatch={dispatch}/>
            {children}
        </SnackbarProvider>
    );
}

const AppAlert = forwardRef<HTMLDivElement, AppAlertProps>((props, ref) => {
    const {id,} = props

    const {closeSnackbar} = useSnackbar();
    const handleDismiss = useCallback(() => {
        closeSnackbar(id);
    }, [id, closeSnackbar]);

    return (
        <SnackbarContent ref={ref}>
            <Alert
                variant={"filled"}
                severity={props.data.severity}
                sx={{maxWidth: "400px", wordWrap: "break-word", textAlign: "left"}}
                action={
                    <IconButton
                        size="small"
                        aria-label="close"
                        sx={{color: "inherit !important"}}
                        onClick={handleDismiss}
                    >
                        <CloseIcon fontSize="small"/>
                    </IconButton>
                }
            >
                <AlertTitle
                    sx={{display: "flex", alignItems: "center", width: "100%", justifyContent: "space-between"}}>
                    <Typography sx={{textTransform: "uppercase"}}>
                        {props.data.severity}
                    </Typography>
                </AlertTitle>
                <Typography>
                    {props.data.message}
                </Typography>
                <Typography variant={"body2"} sx={{textAlign: "right", fontStyle: "italic"}}>
                    {format(props.data.date, "yyyy-MM-dd hh:mm:ss")}
                </Typography>
            </Alert>
        </SnackbarContent>
    );
});

export {AppSnackbarProvider, AppAlert, type AppAlertInterface};
