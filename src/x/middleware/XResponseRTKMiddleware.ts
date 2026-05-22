import {Action, isFulfilled, isPending, MiddlewareAPI, ThunkDispatch} from "@reduxjs/toolkit";
import {type ResponseData} from "../payload/response/data/ResponseData";
import {type XResponse} from "../payload/response/XResponse";
import {type ApiPayloadAction} from "../slice/api/apiSlice";
import {completedProgress, processingProgress} from "../slice/appProgressSlice";
import {AbstractXResponseMiddleware} from "./AbstractXResponseMiddleware";

class XResponseRTKMiddleware extends AbstractXResponseMiddleware {

    do(action: ApiPayloadAction, api: MiddlewareAPI<ThunkDispatch<any, any, Action>>): void {
        if (isPending(action)) {
            api.dispatch(processingProgress());
        }
        if (isFulfilled(action)) {
            const payload: XResponse<ResponseData> = action.payload;
            payload.rtkRequestId = action.meta.requestId
            api.dispatch(completedProgress());
        }
    }

}

export {
    XResponseRTKMiddleware,
}
