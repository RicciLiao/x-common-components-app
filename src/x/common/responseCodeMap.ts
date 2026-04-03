import {type ResponseCode} from "../payload/response/code/ResponseCode";
import {responseCodeEnum} from "./responseCodeEnum";

const responseCodeMap: Record<responseCodeEnum, ResponseCode> = {
    [responseCodeEnum.SUCCESS]: {id: "0000", message: ""},
    [responseCodeEnum.DATA_WARNING]: {id: "1000", message: ""},
    [responseCodeEnum.PARAMETER_WARNING]: {id: "2000", message: ""},
    [responseCodeEnum.REST_WARNING]: {id: "3000", message: ""},
    [responseCodeEnum.SECURITY_ERROR]: {id: "8000", message: ""},
    [responseCodeEnum.UNEXPECTED_ERROR]: {id: "9000", message: ""},
    [responseCodeEnum.BROKEN_HTTP]: {id: "-1", message: ""},
}


export {responseCodeMap}
