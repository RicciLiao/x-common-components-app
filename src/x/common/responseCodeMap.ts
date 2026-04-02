import {type ResponseCode} from "../payload/response/code/ResponseCode";
import {responseCodeEnum} from "./responseCodeEnum";

const responseCodeMap: Record<responseCodeEnum, ResponseCode> = {
    [responseCodeEnum.SUCCESS]: {id: "0000", message: ""},
    [responseCodeEnum.SECURITY_ERROR]: {id: "1000", message: ""},
    [responseCodeEnum.PARAMETER_ERROR]: {id: "2000", message: ""},
    [responseCodeEnum.CONCURRENT_ERROR]: {id: "3000", message: ""},
    [responseCodeEnum.REST_ERROR]: {id: "4000", message: ""},
    [responseCodeEnum.DATA_ERROR]: {id: "5000", message: ""},
    [responseCodeEnum.UNEXPECTED_ERROR]: {id: "9000", message: ""},
    [responseCodeEnum.BROKEN_HTTP]: {id: "-1", message: ""},
}


export {responseCodeMap}
