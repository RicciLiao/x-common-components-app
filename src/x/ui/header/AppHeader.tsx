import {AppBar, Box, LinearProgress, Theme, Toolbar, Typography} from "@mui/material";
import React from "react";
import {useSelector} from "react-redux";
import {selectProgress} from "../../slice/appProgressSlice";
import {AppThemeProvider} from "../AppThemeProvider";
import {AppExperimentalMenu} from "../menu/AppExperimentalMenu";
import {AppMenuItem, HeaderMenu} from "../menu/HeaderMenu";
import {appHeaderTheme} from "./appHeaderTheme";

export interface AppHeaderProps {
    menus: AppMenuItem[];
    theme?: Theme;
}


const AppHeader = (props: AppHeaderProps) => {
    const progress = useSelector(selectProgress);

    return (
        <React.Fragment>
            <Box sx={(theme) => ({zIndex: theme.zIndex.drawer + 1, position: "absolute", width: "100vw"})}>
                {progress && <LinearProgress/>}
            </Box>
            <AppThemeProvider theme={props.theme || appHeaderTheme}>
                <AppBar>
                    <Toolbar>
                        <HeaderMenu menus={props.menus}/>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}></Typography>
                        <AppExperimentalMenu/>
                    </Toolbar>
                </AppBar>
            </AppThemeProvider>
        </React.Fragment>
    );
};

export {AppHeader};