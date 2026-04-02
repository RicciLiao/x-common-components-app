import {Action, MiddlewareAPI, ThunkDispatch} from "@reduxjs/toolkit";
import {type XRequest} from "../payload/request/XRequest";
import {type ResponseData} from "../payload/response/data/ResponseData";
import {type XResponse} from "../payload/response/XResponse";
import {messageSlice} from "../slice/api/messageSlice";
import {addSnackbar} from "../slice/appSnackbarSlice";
import {AppSnackbar} from "../ui/snackbar/AppSnackbar";
import {xConstants} from "../xConstants";
import {AbstractXResponseMiddleware, type ApiPayloadAction, isApiSliceActionCompletedWithError, isHttpErrorPayload} from "./AbstractXResponseMiddleware";

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

export class XResponseCodeMiddleware extends AbstractXResponseMiddleware<ThunkDispatch<any, any, Action>, any> {

    private readonly projectCode: string;

    constructor(projectCode: string) {
        super();
        this.projectCode = projectCode;
    }

    do(action: ApiPayloadAction, api: MiddlewareAPI<ThunkDispatch<any, any, Action>>): void {
        if (isApiSliceActionCompletedWithError(action)) {
            let appSnackBar: AppSnackbar;
            const payload: XResponse<ResponseData> = action.payload;
            if (isHttpErrorPayload(payload)) {
                appSnackBar = {
                    code: payload.data.status,
                    date: payload.data.date,
                    alertType: xConstants.SNACKBAR_SEVERITY_TYPE.E,
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
                        const alertType = xConstants.SNACKBAR_SEVERITY_TYPE[messageData.level as keyof typeof xConstants.SNACKBAR_SEVERITY_TYPE];
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

