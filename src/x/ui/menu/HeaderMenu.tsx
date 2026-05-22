import {Backdrop, Box, Button, Popper} from "@mui/material";
import React, {Dispatch, RefObject, SetStateAction} from "react";
import {useNavigate} from "react-router-dom";
import {AppThemeProvider} from "../AppThemeProvider";
import {appMenuTheme} from "./appMenuTheme";

interface AppMenuItem {
    key: string;
    path?: string;
    label: string;
    sort?: number;
    component?: React.FunctionComponent<any>;
    subMenuList?: AppMenuItem[];
}

interface AppMenuContextType {
    activeMenuPath: string[];
    setActiveMenuPath: Dispatch<SetStateAction<string[]>>;
    closeAllMenus: () => void;
    activeDelayerRef: RefObject<ReturnType<typeof setTimeout> | null>
}

const AppMenuContext = React.createContext<AppMenuContextType>({
    activeMenuPath: [],
    setActiveMenuPath: () => {
    },
    closeAllMenus: () => {
    },
    activeDelayerRef: {
        current: null
    },
});

const MenuProvider = ({children}: { children: React.ReactNode }) => {
    const [activeMenuPath, setActiveMenuPath] = React.useState<string[]>([]);
    const activeDelayer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
    const closeAllMenus = React.useCallback(() => {
        if (activeDelayer.current) {
            clearTimeout(activeDelayer.current);
            activeDelayer.current = null;
        }
        setActiveMenuPath([]);
    }, [setActiveMenuPath]);

    const context = React.useMemo<AppMenuContextType>(() => ({
        activeMenuPath, setActiveMenuPath, closeAllMenus, activeDelayerRef: activeDelayer
    }), [activeMenuPath, closeAllMenus]);

    return (
        <AppMenuContext.Provider value={context}>
            {children}
            <Backdrop
                open={activeMenuPath.length > 0}
                onClick={closeAllMenus}
                sx={(theme) => (
                    {
                        backgroundColor: "rgba(0,0,0,0)",
                        zIndex: theme.zIndex.drawer + 1,
                        top: 64
                    }
                )}
            />
        </AppMenuContext.Provider>
    );
};

const NestedMenu = ({menu, parentPath, closeAllMenus}: {
    menu: AppMenuItem;
    parentPath: string[];
    closeAllMenus: () => void;
}) => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const {activeMenuPath, setActiveMenuPath, activeDelayerRef} = React.useContext(AppMenuContext);
    const currentPath = [...parentPath, menu.key];
    const menuButton = React.useRef<HTMLButtonElement>(null);

    const handleClick = () => {
        if (activeDelayerRef.current) {
            clearTimeout(activeDelayerRef.current);
            activeDelayerRef.current = null;
        }
        if (menu.subMenuList) {
            if (activeMenuPath.join("/") === currentPath.join("/")) {
                return;
            } else {
                setAnchorEl(menuButton.current);
                setActiveMenuPath(currentPath);
            }
        } else if (menu.path) {
            navigate(menu.path);
            closeAllMenus();
        }
    };
    const handleMouseEnter = () => {
        if (activeDelayerRef.current) {
            clearTimeout(activeDelayerRef.current);
        }
        activeDelayerRef.current = setTimeout(() => {
            if (activeMenuPath.join("/") === currentPath.join("/")) {
                return;
            } else if (menu.subMenuList) {
                setAnchorEl(menuButton.current);
                setActiveMenuPath(currentPath);
            } else {
                setAnchorEl(null);
                setActiveMenuPath(parentPath);
            }
        }, 200);
    }

    const isOpen
        = activeMenuPath.join("/").startsWith(currentPath.join("/")) && activeMenuPath.length >= currentPath.length;

    return (
        <Box>
            <Button
                id={menu.key + "_button"}
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                ref={menuButton}
                color={"secondary"}
                sx={isOpen ? {backgroundColor: "rgb(246 248 250)"} : {}}
            >
                {menu.label + (menu.subMenuList && " ▶" || "")}
            </Button>

            {menu.subMenuList && isOpen && (
                <Popper
                    open={isOpen}
                    anchorEl={anchorEl}
                    placement="right-start"
                    sx={{zIndex: 9999}}
                >
                    {menu.subMenuList.map(subMenu => (
                        <NestedMenu
                            key={subMenu.key}
                            menu={subMenu}
                            closeAllMenus={closeAllMenus}
                            parentPath={currentPath}
                        />
                    ))}
                </Popper>
            )}
        </Box>
    );
};

const AppMenu = ({menu}: { menu: AppMenuItem }) => {
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

const HeaderMenus = ({menus}: { menus: AppMenuItem[] }) => {

    return (
        <Box sx={{display: "flex", alignItems: "center"}}>
            {menus.map(menu => (
                <AppMenu key={menu.key} menu={menu}/>
            ))}
        </Box>
    );
};

interface AppMenuProps {
    menus: AppMenuItem[];
}

const HeaderMenu = ({menus}: AppMenuProps) => {

    return (
        <AppThemeProvider theme={appMenuTheme}>
            <MenuProvider>
                <Box>
                    <HeaderMenus menus={menus}/>
                </Box>
            </MenuProvider>
        </AppThemeProvider>
    );
}


export {
    AppMenuContext,
    HeaderMenu,
    type AppMenuItem,
};
