import {AppBar, LinearProgress, Toolbar, Typography} from "@mui/material";
import {AppThemeProvider} from "../AppThemeProvider";
import {AppExperimentalMenu} from "../menu/AppExperimentalMenu";
import {AppMenuItem, HeaderMenu} from "../menu/HeaderMenu";
import {appHeaderTheme} from "./appHeaderTheme";

const AppHeader = ({menus}: { menus: AppMenuItem[] }) => {

    return (
        <AppThemeProvider theme={appHeaderTheme}>
            <LinearProgress aria-label="Loading…"/>
            <AppBar>
                <Toolbar>
                    <HeaderMenu menus={menus}/>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}></Typography>
                    <AppExperimentalMenu/>
                </Toolbar>
            </AppBar>
        </AppThemeProvider>
    );
};

export {AppHeader};