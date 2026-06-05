import {styled, useTheme} from "@mui/material";
import React, {useCallback, useRef} from "react";

interface AppSidebarProps {
    minWidth: number;
    maxWidth: number;
    initialOpen?: boolean;
    onResize?: (width: number) => void;
}

interface SidebarRootProps {
    hoverColor: string;
    activeColor: string;
    minWidth: number;
    maxWidth: number;
    initialWidth: number;
}

const SidebarRoot = styled("div")<SidebarRootProps>(({hoverColor, activeColor, minWidth, maxWidth, initialWidth}) => ({
    height: "100%",
    display: "flex",
    flexDirection: "row",
    "--sidebar-hover-color": hoverColor,
    "--sidebar-active-color": activeColor,
    "--sidebar-min-width": `${minWidth}px`,
    "--sidebar-max-width": `${maxWidth}px`,
    "--sidebar-width": `${initialWidth}px`,
} as React.CSSProperties));

const SidebarPanel = styled("div")({
    height: "100%",
    overflow: "hidden",
    flexShrink: 0,
    width: "var(--sidebar-width)",
});


const SidebarHandle = styled("div")({
    position: "relative",
    height: "100%",
    width: "1px",
    cursor: "col-resize",
    backgroundColor: "rgb(209, 217, 224)",
    transition: "background-color 0.2s",
    flexShrink: 0,
    zIndex: 1,
    "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "6px",
        height: "100%",
        backgroundColor: "transparent",
        transition: "background-color 0.2s",
    },
    "&:hover": {
        backgroundColor: "var(--sidebar-hover-color)",
    },
    "&:hover::before": {
        backgroundColor: "var(--sidebar-hover-color)",
    },
    "&:active, &[data-resizing='true']": {
        backgroundColor: "var(--sidebar-active-color)",
    },
    "&:active::before, &[data-resizing='true']::before": {
        backgroundColor: "var(--sidebar-active-color)",
    },
});

const SidebarContent = styled("div")({
    height: "100%",
});

const AppSidebar = ({props, children}: { props: AppSidebarProps, children: React.ReactNode }) => {
    const theme = useTheme();
    const rootRef = useRef<HTMLDivElement>(null);
    const isResizingRef = useRef(false);

    const handlePointerDown = useCallback((e: React.PointerEvent) => {
        e.preventDefault();
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        isResizingRef.current = true;
        // Update isResizing state for visual feedback
        (e.target as HTMLElement).setAttribute("data-resizing", "true");
    }, []);

    const handlePointerMove = useCallback((e: React.PointerEvent) => {
        if (!isResizingRef.current || !rootRef.current) return;
        e.preventDefault();
        const newWidth = Math.max(props.minWidth, Math.min(props.maxWidth, e.clientX));
        // Directly update CSS variable, no React re-render
        rootRef.current.style.setProperty("--sidebar-width", `${newWidth}px`);
        if (props.onResize) {
            props.onResize(newWidth);
        }
    }, [props]);

    const handlePointerUp = useCallback((e: React.PointerEvent) => {
        isResizingRef.current = false;
        (e.target as HTMLElement).removeAttribute("data-resizing");
    }, []);

    const initialWidth = props.initialOpen ? props.maxWidth : props.minWidth;

    return (
        <SidebarRoot
            ref={rootRef}
            hoverColor={theme.palette.primary.main}
            activeColor={theme.palette.primary.dark}
            minWidth={props.minWidth}
            maxWidth={props.maxWidth}
            initialWidth={initialWidth}
        >
            <SidebarPanel>
                <SidebarContent>
                    {children}
                </SidebarContent>
            </SidebarPanel>
            <SidebarHandle
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
            />
        </SidebarRoot>
    );
};

export {
    AppSidebar,
    type AppSidebarProps,
};
