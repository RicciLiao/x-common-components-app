import {createTheme} from "@mui/material";
import {appTheme} from "../appTheme";

export const appSidebarTheme = createTheme(appTheme, {
    components: {
        MuiStack: {
            styleOverrides: {
                root: {
                    "&.sidebar-stack": {
                        height: "100%",
                        borderRight: "1px solid rgb(209 217 224)"
                    }
                }
            }
        },
    }
});