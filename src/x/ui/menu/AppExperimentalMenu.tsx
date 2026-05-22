import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import {FormControlLabel, FormGroup, IconButton, Switch} from "@mui/material";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {apiSlice} from "../../slice/api/apiSlice";
import {custom} from "../../slice/appThemeSlice";

const AppExperimentalMenu = () => {
    const currentTheme = useSelector((state: any) => state.appTheme?.customTheme ?? true);
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const changeStyle = () => {
        dispatch(custom(!currentTheme));
    };
    const resetApiState = () => {
        dispatch(apiSlice.util.resetApiState());
    };

    return (
        <div>
            <IconButton onClick={handleClick}><PriorityHighIcon fontSize="small" color="error"/></IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem>
                    <FormGroup>
                        <FormControlLabel control={<Switch checked={currentTheme} onChange={changeStyle}/>} label="Custom Style"/>
                    </FormGroup>
                </MenuItem>
                <MenuItem>
                    <Button variant={"text"} onClick={resetApiState} color={"warning"}>Clean All API State</Button>
                </MenuItem>
            </Menu>
        </div>
    );
}

export {AppExperimentalMenu}