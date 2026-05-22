import {Breadcrumbs, Link} from "@mui/material";
import React from "react";
import {AppThemeProvider} from "../AppThemeProvider";
import {appBreadcrumbTheme} from "./appBreadcrumbTheme";

interface AppBreadcrumbsProps {
    id: string;
    href: string;
    label: string;
}

interface AppBreadcrumbsComponentProps {
    propsList: AppBreadcrumbsProps[];
    onItemClick?: (id: string) => void;
}

const AppBreadcrumbs = ({propsList, onItemClick}: AppBreadcrumbsComponentProps) => {

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        event.preventDefault();
        if (onItemClick) {
            onItemClick(id);
        }
    };

    return (
        <AppThemeProvider theme={appBreadcrumbTheme}>
            <Breadcrumbs>
                {propsList.map((item) => (
                    <Link
                        key={item.id}
                        href={item.href}
                        onClick={(e) => handleClick(e, item.id)}
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
