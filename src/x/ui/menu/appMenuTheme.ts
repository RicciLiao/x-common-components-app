import {createTheme} from "@mui/material";
import {appTheme} from "../appTheme";

export const appMenuTheme = createTheme(appTheme,
        {
            components: {
                MuiPopper: {
                    styleOverrides: {
                        root: {
                            backgroundColor: "white",
                            boxShadow: "none",
                            borderRadius: "4px",
                            border: "1px solid rgb(209 217 224)",
                        }
                    }
                },
                MuiButton: {
                    styleOverrides: {
                        root: {
                            variants: [
                                {
                                    props: {variant: "text"},
                                    style: {
                                        width: "100%",
                                        justifyContent: "left",
                                        "&:focus": {
                                            outline: "none",
                                        },
                                    },
                                }
                            ],
                        }
                    }
                },
            }
        }
    )
;
