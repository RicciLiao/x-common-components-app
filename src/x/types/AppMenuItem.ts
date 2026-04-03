import React from "react";

interface AppMenuItem {
    key: string;
    path?: string;
    label: string;
    sort?: number;
    component?: React.FunctionComponent<any>;
    subMenuList?: AppMenuItem[];
}


export {type AppMenuItem}