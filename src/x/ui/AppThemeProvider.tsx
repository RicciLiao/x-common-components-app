import {Theme, ThemeProvider, ThemeProviderProps} from "@mui/material";
import React from "react";
import {useSelector} from "react-redux";
import {defaultTheme} from "./appTheme";


const AppThemeProvider = ({children, theme, ...props}: { children?: React.ReactNode, theme: Theme, props?: ThemeProviderProps<Theme> }) => {
    const currentTheme = useSelector((state: any) => state.appTheme?.customTheme ?? true);

    return (
        <ThemeProvider theme={currentTheme ? theme : defaultTheme} {...props}>
            {children}
        </ThemeProvider>
    );
}


export {AppThemeProvider};