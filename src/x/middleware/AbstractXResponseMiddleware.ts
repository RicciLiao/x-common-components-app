import {Dispatch, isFulfilled, isRejectedWithValue, Middleware, MiddlewareAPI, ThunkDispatch} from "@reduxjs/toolkit";
import {Action} from "redux";
import {responseCodeEnum} from "../common/responseCodeEnum";
import {type ResponseData} from "../payload/response/data/ResponseData";
import {type BrokenHttp} from "../payload/response/data/SimpleData";
import {type XResponse} from "../payload/response/XResponse";
import {type ApiPayloadAction, apiSlice} from "../slice/api/apiSlice";

const isHttpErrorPayload = (payload: XResponse<ResponseData>): payload is XResponse<BrokenHttp> => {

    return payload && payload.code.id === responseCodeEnum.BROKEN_HTTP;
}

const isApiSliceAction = (action: any): action is ApiPayloadAction => {

    return action.type.startsWith(`${apiSlice.reducerPath}/`) && isApiSliceActionWithMeta(action);
}

const isApiSliceActionCompletedWithError = (action: ApiPayloadAction): boolean => {

    return (isFulfilled(action) || isRejectedWithValue(action)) && action.payload && action.payload.code.id !== responseCodeEnum.SUCCESS;
}

const isApiSliceActionWithMeta = (action: ApiPayloadAction): boolean => {

    return (!!(
        "meta" in action && action.meta && typeof action.meta === "object"
        && "arg" in action.meta && action.meta.arg && typeof action.meta.arg === "object"
        && "endpointName" in action.meta.arg && action.meta.arg.endpointName
    ));
}

abstract class AbstractXResponseMiddleware<
    D extends ThunkDispatch<S, any, Action> | Dispatch<Action> = ThunkDispatch<any, any, Action> | Dispatch<Action>,
    S = any
> {

    support(action: any): action is ApiPayloadAction {

        return isApiSliceAction(action);
    }

    build(): Middleware<{}, S, D> {

        return (api: MiddlewareAPI<D, S>) => next => async action => {
            if (this.support(action)) {
                this.do(action, api);
            }

            return next(action);
        };
    };

    abstract do(action: ApiPayloadAction, api: MiddlewareAPI<D, S>): void;

}


export {
    AbstractXResponseMiddleware,
    isApiSliceActionCompletedWithError,
    isHttpErrorPayload,
    type ApiPayloadAction,
}
