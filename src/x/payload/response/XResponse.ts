import {ResponseCode} from "./code/ResponseCode";
import {ResponseData} from "./data/ResponseData";

interface XResponse<T extends ResponseData> {
    code: ResponseCode,
    data: T,
    rtkRequestId?: string,
}


export {
    type XResponse,
}
