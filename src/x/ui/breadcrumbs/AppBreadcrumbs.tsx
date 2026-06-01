import {Breadcrumbs, Link, Theme} from "@mui/material";
import React from "react";
import {AppThemeProvider} from "../AppThemeProvider";
import {appBreadcrumbTheme} from "./appBreadcrumbTheme";

interface AppBreadcrumbsProps<T> {
    arg: T;
    href: string;
    label: string;
}

interface AppBreadcrumbsComponentProps<T> {
    propsList: AppBreadcrumbsProps<T>[];
    onItemClick?: (arg: T) => void;
    theme?: Theme;
}

const AppBreadcrumbs = <T, >(props: AppBreadcrumbsComponentProps<T>) => {

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, arg: T) => {
        event.preventDefault();
        if (props.onItemClick) {
            props.onItemClick(arg);
        }
    };

    return (
        <AppThemeProvider theme={props.theme || appBreadcrumbTheme}>
            <Breadcrumbs>
                {props.propsList.map((item, index) => (
                    <Link
                        key={"item_" + index}
                        href={item.href}
                        onClick={(e) => handleClick(e, item.arg)}
                        sx={{cursor: 'pointer'}}
                    >
                        {item.label}
                    </Link>
                ))}
            </Breadcrumbs>
        </AppThemeProvider>
    );
};

export {
    AppBreadcrumbs,
    type AppBreadcrumbsProps,
};
