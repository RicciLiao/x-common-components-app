import {isFulfilled, type MiddlewareAPI} from "@reduxjs/toolkit";
import {AbstractXResponseMiddleware} from "../middleware/AbstractXResponseMiddleware";
import {type ResponseData} from "../payload/response/data/ResponseData";
import {type XResponse} from "../payload/response/XResponse";
import {type ApiPayloadAction} from "../slice/api/apiSlice";

class XResponseRTKMiddleware extends AbstractXResponseMiddleware {

    do(action: ApiPayloadAction, _api: MiddlewareAPI): void {
        if (isFulfilled(action)) {
            const payload: XResponse<ResponseData> = action.payload;
            payload.rtkRequestId = action.meta.requestId
        }
    }

}

export {
    XResponseRTKMiddleware,
}
