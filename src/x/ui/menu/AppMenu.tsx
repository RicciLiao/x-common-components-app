import {Backdrop, Box} from "@mui/material";
import React, {Dispatch, RefObject, SetStateAction} from "react";
import {AppMenuItem} from "../../types/AppMenuItem";
import {HeaderMenu} from "./HeaderMenu";

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

const HeaderMenus = ({menus}: { menus: AppMenuItem[] }) => {

    return (
        <Box sx={{display: "flex", alignItems: "center"}}>
            {menus.map(menu => (
                <HeaderMenu key={menu.key} menu={menu}/>
            ))}
        </Box>
    );
};

interface AppMenuProps {
    menus: AppMenuItem[];
}

const AppMenu = ({menus}: AppMenuProps) => {

    return (
        <MenuProvider>
            <Box>
                <HeaderMenus menus={menus}/>
            </Box>
        </MenuProvider>
    );
}


export {
    AppMenu,
    type AppMenuContextType,
    AppMenuContext,
    MenuProvider,
    HeaderMenus
};
