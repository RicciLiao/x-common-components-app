enum responseCodeEnum {
    SUCCESS = "0000",
    SECURITY_ERROR = "1000",
    PARAMETER_ERROR = "2000",
    CONCURRENT_ERROR = "3000",
    REST_ERROR = "4000",
    DATA_ERROR = "5000",
    UNEXPECTED_ERROR = "9000",
    BROKEN_HTTP = "-1",
}


export {responseCodeEnum}
