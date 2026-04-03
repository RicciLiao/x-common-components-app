import {Box, Button, Popper} from "@mui/material";
import React from "react";
import {AppMenuItem} from "../../types/AppMenuItem";
import {AppMenuContext} from "./AppMenu";
import {NestedMenu} from "./NestedMenu";

const HeaderMenu = ({menu}: { menu: AppMenuItem }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const {activeMenuPath, setActiveMenuPath, activeDelayerRef, closeAllMenus} = React.useContext(AppMenuContext);
    const menuButton = React.useRef<HTMLButtonElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        if (menu.subMenuList) {
            if (activeMenuPath[0] === menu.key) {
                closeAllMenus();
            } else {
                setAnchorEl(event.currentTarget);
                setActiveMenuPath([menu.key]);
            }
        } else if (menu.path) {
            closeAllMenus();
        }
    };
    const handleMouseEnter = () => {
        if (activeMenuPath.length > 0) {
            activeDelayerRef.current = setTimeout(() => {
                if (activeMenuPath[0] === menu.key) {
                    return;
                } else {
                    if (activeDelayerRef.current) {
                        clearTimeout(activeDelayerRef.current);
                    }
                    setActiveMenuPath([menu.key]);
                    if (menu.subMenuList) {
                        setAnchorEl(menuButton.current);
                    } else {
                        setAnchorEl(null);
                    }
                }
            }, 200);
        }
    }

    const isOpen = activeMenuPath[0] === menu.key && Boolean(anchorEl);

    return (
        <Box>
            <Button
                id={menu.key + "_button"}
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                ref={menuButton}
                color={"secondary"}
            >
                {menu.label}
            </Button>

            {menu.subMenuList && isOpen && (
                <Popper
                    open={isOpen}
                    anchorEl={anchorEl}
                    placement="bottom-start"
                    sx={(theme) => ({zIndex: theme.zIndex.drawer + 1})}
                >
                    {menu.subMenuList.map(subMenu => (
                        <NestedMenu
                            key={subMenu.key}
                            menu={subMenu}
                            closeAllMenus={closeAllMenus}
                            parentPath={[menu.key]}
                        />
                    ))}
                </Popper>
            )}
        </Box>
    );
};


export {HeaderMenu};
