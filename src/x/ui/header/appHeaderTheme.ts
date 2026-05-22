import {createTheme} from "@mui/material";
import {appTheme} from "../appTheme";

const appHeaderTheme = createTheme(appTheme,
    {
        components: {
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        backgroundColor: "rgb(246 248 250)",
                        boxShadow: "none",
                        borderBottom: "1px solid rgb(209 217 224)",
                        height: "100%",
                        position: "relative",
                    }
                }
            },
        }
    });


export {appHeaderTheme};