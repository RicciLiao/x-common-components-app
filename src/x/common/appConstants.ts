const appConstants = {
    HTTP_METHOD_POST: "POST",
    HTTP_METHOD_GET: "GET",
    SNACKBAR_SEVERITY_TYPE: {
        S: "success",
        I: "info",
        W: "warning",
        E: "error"
    },
    APP_HEADER_HEIGHT: 64,
} as const;

export {appConstants};