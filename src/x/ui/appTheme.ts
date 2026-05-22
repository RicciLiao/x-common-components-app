import {colors, createTheme} from "@mui/material";

const defaultTheme = createTheme();

const appTheme = createTheme(defaultTheme,
    {
        palette: {
            off: {
                main: colors.grey[500],
            },
            on: {
                main: colors.green[500]
            },
        },
        components: {
            MuiButtonBase: {
                styleOverrides: {
                    root: {
                        variants: [
                            {
                                /*props: {variant: "text"},*/
                                style: {
                                    "&:focus": {
                                        outline: "none",
                                        backgroundColor: "transparent !important",
                                    },
                                }
                            }
                        ]
                    }
                }
            }
        }
    });


export {defaultTheme, appTheme};