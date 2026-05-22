import {Theme, ThemeProvider, ThemeProviderProps} from "@mui/material";
import React from "react";
import {useSelector} from "react-redux";
import {selectCurrentTheme} from "../slice/appThemeSlice";
import {defaultTheme} from "./appTheme";


const AppThemeProvider = ({children, theme, ...props}: { children?: React.ReactNode, theme: Theme, props?: ThemeProviderProps<Theme> }) => {
    const currentTheme = useSelector(selectCurrentTheme);

    return (
        <ThemeProvider theme={currentTheme ? theme : defaultTheme} {...props}>
            {children}
        </ThemeProvider>
    );
}


export {AppThemeProvider};