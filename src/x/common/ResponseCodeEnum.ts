const ResponseCodeEnum = {
    SUCCESS: {id: "00", message: "Success."},
    DATA_WARNING: {id: "01", message: "Data warning."},
    PARAMETER_WARNING: {id: "02", message: "Parameter warning."},
    REST_WARNING: {id: "03", message: "Rest Call warning."},
    SECURITY_ERROR: {id: "04", message: "Security error."},
    UNEXPECTED_ERROR: {id: "99", message: "Unexpected error."},
    BROKEN_HTTP: {id: "-1", message: "Broken HTTP."},
} as const;


/*type ResponseCodeEnum = typeof ResponseCodeEnum[keyof typeof ResponseCodeEnum];*/

export {ResponseCodeEnum}