import {Action, isFulfilled, isRejectedWithValue, MiddlewareAPI, ThunkDispatch} from "@reduxjs/toolkit";
import {constants} from "../common/constants";
import {ResponseCodeEnum} from "../common/ResponseCodeEnum";
import {type XRequest} from "../payload/request/XRequest";
import {type ResponseData} from "../payload/response/data/ResponseData";
import type {BrokenHttp} from "../payload/response/data/SimpleData";
import {type XResponse} from "../payload/response/XResponse";
import {messageSlice} from "../slice/api/messageSlice";
import {addSnackbar} from "../slice/appSnackbarSlice";
import {AppSnackbar} from "../ui/snackbar/AppSnackbar";
import {AbstractXResponseMiddleware, type ApiPayloadAction} from "./AbstractXResponseMiddleware";

const replacePlaceholders = (template: string, args: string[] | undefined): string => {
    if (!args || args.length === 0) {

        return template;
    }
    let index = 0;

    return template.replace(/\{}/g, () =>
        index < args.length ? args[index++] : "{}"
    );
};

const getMessageArgs = (action: ApiPayloadAction): string[] | undefined => {
    const originalArgs = action.meta.arg.originalArgs;
    if (originalArgs && typeof originalArgs === 'object' && 'messageArgs' in originalArgs) {

        return (originalArgs as XRequest<unknown>).messageArgs;
    }

    return undefined;
};

const withAlert = (action: ApiPayloadAction): boolean => {

    return Boolean(action.payload.code.alert) || action.payload.code.id !== (ResponseCodeEnum.SUCCESS.id + "000");
}

const isHttpErrorPayload = (payload: XResponse<ResponseData>): payload is XResponse<BrokenHttp> => {

    return payload && payload.code.id === ResponseCodeEnum.BROKEN_HTTP.id;
}

export class XResponseCodeMiddleware extends AbstractXResponseMiddleware<ThunkDispatch<any, any, Action>> {

    private readonly projectCode: string;

    constructor(projectCode: string) {
        super();
        this.projectCode = projectCode;
    }

    support(action: any): action is ApiPayloadAction {

        return super.support(action) && (isFulfilled(action) || isRejectedWithValue(action)) && Boolean(action.payload?.code);
    }

    do(action: ApiPayloadAction, api: MiddlewareAPI<ThunkDispatch<any, any, Action>>): void {
        if (withAlert(action)) {
            let appSnackBar: AppSnackbar;
            const payload: XResponse<ResponseData> = action.payload;
            if (isHttpErrorPayload(payload)) {
                appSnackBar = {
                    code: payload.data.status,
                    date: payload.data.date,
                    alertType: constants.SNACKBAR_SEVERITY_TYPE.E,
                    message: payload.data.message
                };
                api.dispatch(addSnackbar(appSnackBar));
            } else {
                const consumer = this.projectCode;
                const messageArgs = payload.code.messageArgs ?? getMessageArgs(action);
                api.dispatch(messageSlice.endpoints.getMessage.initiate({
                    code: payload.code.id,
                    consumer
                })).unwrap()
                    .then((result: any) => {
                        const messageData = result.data;
                        const alertType = constants.SNACKBAR_SEVERITY_TYPE[messageData.level as keyof typeof constants.SNACKBAR_SEVERITY_TYPE];
                        appSnackBar = {
                            code: messageData.id,
                            date: new Date().getTime(),
                            alertType: alertType,
                            message: replacePlaceholders(messageData.description, messageArgs)
                        };
                        api.dispatch(addSnackbar(appSnackBar));
                    });
            }
        }
    }
}