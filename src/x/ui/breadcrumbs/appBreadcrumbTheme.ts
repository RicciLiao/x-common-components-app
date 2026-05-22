import {createTheme} from "@mui/material";
import {appTheme} from "../appTheme";


export const appBreadcrumbTheme = createTheme(appTheme,
    {
        components: {
            MuiLink: {
                styleOverrides: {
                    root: {
                        color: "inherit",
                        textDecoration: "none",
                        "&:hover": {
                            textDecoration: "underline",
                        }
                    }
                }
            },
        }
    });