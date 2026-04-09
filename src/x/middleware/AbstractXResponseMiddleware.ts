import {Dispatch, Middleware, MiddlewareAPI, ThunkDispatch} from "@reduxjs/toolkit";
import {Action} from "redux";
import {type ApiPayloadAction, apiSlice} from "../slice/api/apiSlice";

const isApiSliceAction = (action: any): action is ApiPayloadAction => {

    return action.type.startsWith(`${apiSlice.reducerPath}/`) && isApiSliceActionWithMeta(action);
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
    type ApiPayloadAction,
}