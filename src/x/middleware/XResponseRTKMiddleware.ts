import {isFulfilled} from "@reduxjs/toolkit";
import {type ResponseData} from "../payload/response/data/ResponseData";
import {type XResponse} from "../payload/response/XResponse";
import {type ApiPayloadAction} from "../slice/api/apiSlice";
import {AbstractXResponseMiddleware} from "./AbstractXResponseMiddleware";

class XResponseRTKMiddleware extends AbstractXResponseMiddleware {

    do(action: ApiPayloadAction): void {
        if (isFulfilled(action)) {
            const payload: XResponse<ResponseData> = action.payload;
            payload.rtkRequestId = action.meta.requestId
        }
    }

}

export {
    XResponseRTKMiddleware,
}
