import {Box, Stack, StackProps, styled} from "@mui/material";
import MuiStack from "@mui/material/Stack";
import React, {useCallback, useEffect, useState} from "react";


interface AppSideProps {
    minWidth: number;
    maxWidth: number;
    initialOpen?: boolean;
    onResize?: (width: number) => void;
}

const ResizeHandle = styled("div")(({theme}) => ({
    height: "100%",
    width: '4px',
    cursor: 'col-resize',
    backgroundColor: 'transparent',
    transition: 'background-color 0.2s',
    '&:hover': {
        backgroundColor: theme.palette.primary.main,
    },
    '&:active': {
        backgroundColor: theme.palette.primary.dark,
    },
    zIndex: 1,
}));

const Stack = styled((props: StackProps) => (
    <MuiStack {...props} />
))(() => ({
    height: "100%",
    borderRight: "1px solid rgb(209 217 224)"
}));

const AppSidebar = ({props, children}: { props: AppSideProps, children: React.ReactNode }) => {
    const [sideWidth, setSideWidth] = useState<number>(props.minWidth);
    const [isResizing, setIsResizing] = useState<boolean>(false);

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        setIsResizing(true);
    }, []);
    const handleMouseUp = useCallback((e: MouseEvent) => {
        e.preventDefault();
        setIsResizing(false);
    }, []);
    const handleMouseMove = useCallback((e: MouseEvent) => {
        e.preventDefault();
        if (!isResizing) {

            return
        }
        const newWidth = e.clientX;
        const minWidth = props.minWidth;
        const maxWidth = props.maxWidth;
        if (newWidth >= minWidth && newWidth <= maxWidth) {
            setSideWidth(newWidth);
            if (props.onResize) {
                props.onResize(newWidth);
            }
        }

    }, [isResizing, props]);

    useEffect(() => {
        if (isResizing) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [handleMouseMove, handleMouseUp, isResizing]);


    return (
        <Stack direction="row">
            <Box width={sideWidth}>
                {children}
            </Box>
            <ResizeHandle onMouseDown={handleMouseDown}/>
        </Stack>
    )
};


export {
    AppSidebar,
    type AppSideProps,
}