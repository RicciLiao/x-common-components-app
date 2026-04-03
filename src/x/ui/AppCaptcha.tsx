import AutorenewIcon from "@mui/icons-material/Autorenew";
import {LoadingButton} from "@mui/lab";
import {Box, CardMedia, Checkbox, CircularProgress, Grid, IconButton, Stack, styled} from "@mui/material";
import React from "react";

interface AppCaptchaProps {
    useLazyCaptchaQuery: () => any;
}

const AppCaptcha = ({useLazyCaptchaQuery}: AppCaptchaProps) => {
    const [getCaptcha, {data, isFetching}] = useLazyCaptchaQuery();

    const handleGetCaptcha = () => {
        getCaptcha();
    }

    if (data) {
        const captcha = "data:image/png;base64, " + data.data.i;

        return (
            <Grid container spacing={1}>
                <Grid size={10}>
                    <Stack spacing={0} sx={{alignContent: "center", alignItems: "center"}}>
                        <CardMedia component="img" src={captcha} sx={{height: "55px !important"}}/>
                    </Stack>
                </Grid>
                <Grid size={2} sx={{display: "flex"}}>
                    <IconButton onClick={handleGetCaptcha} disabled={isFetching} sx={{padding: "0"}}>
                        {isFetching ? (
                            <CircularProgress size={24}/>
                        ) : (
                            <AutorenewIcon/>
                        )}
                    </IconButton>
                </Grid>
            </Grid>
        );
    }

    const MyContainer = styled(Box)(() => ({
        position: "relative",
        height: "56px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }));

    const MyCheckbox = styled(Checkbox)(() => ({
        position: "absolute",
        color: "rgba(0,0,0,0) !important",
        zIndex: 0
    }));
    const MyLoadingButton = styled(LoadingButton)(() => ({
        position: "absolute",
        zIndex: 1,
        height: "100%",
        padding: 0
    }));


    return (
        <Grid container spacing={0}>
            <Grid size={12}>
                <MyContainer>
                    <MyLoadingButton loading={isFetching}
                                     onClick={handleGetCaptcha}>
                        Get Captcha Code*
                    </MyLoadingButton>
                    <MyCheckbox required/>
                </MyContainer>
            </Grid>
        </Grid>
    );
};

export {AppCaptcha};
