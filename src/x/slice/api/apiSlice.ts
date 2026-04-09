import {isPlainObject, PayloadAction} from "@reduxjs/toolkit";
import {BaseQueryFn, createApi} from "@reduxjs/toolkit/query/react";
import {ResponseCodeEnum} from "../../common/ResponseCodeEnum";
import {type ResponseData} from "../../payload/response/data/ResponseData";
import {type BrokenHttp} from "../../payload/response/data/SimpleData";
import {type XResponse} from "../../payload/response/XResponse";

interface ApiBaseRequestInit extends RequestInit {
    url: string;
    signal: AbortSignal;
    timeout?: number,
    abortController: AbortController;
}

const fetchApi = async (url: string, arg: ApiBaseRequestInit) => {
    let timeout = false;
    const timeoutId = setTimeout(() => {
        timeout = true;
        arg.abortController.abort();
    }, arg.timeout);

    try {
        const response = await fetch(url, arg);
        if (!response.ok) {

            return {error: brokenResponse(response.status, response.statusText)};
        }
        const data = await response.json();

        return {data};
    } catch (error) {

        return {error: brokenResponse(timeout ? -1 : -2, error && typeof error === "object" && "message" in error && typeof error.message === "string" ? error.message : "")};
    } finally {
        clearTimeout(timeoutId)
        arg.abortController.signal.removeEventListener("abort", arg.abortController.abort);
    }
}

const apiBaseQuery: BaseQueryFn<
    ApiBaseRequestInit,
    XResponse<ResponseData>,
    XResponse<ResponseData>
> = async (
    args,
    _api
) => {
    const baseUrl = "/api";
    const headers: Headers = handleHeaders(args.headers, args.body);
    const body: BodyInit = handleBody(args.body, headers);

    const abortController = new AbortController();
    _api.signal.addEventListener("abort", abortController.abort);

    const options: ApiBaseRequestInit = {
        ...args,
        body,
        headers,
        abortController,
        signal: abortController.signal,
        timeout: args.timeout ?? 9999999
    };

    return fetchApi(baseUrl + args.url, options)
};

const brokenResponse = (status: number, message: string): XResponse<BrokenHttp> => {

    return {
        data: {
            status,
            message,
            date: new Date().getTime(),
        },
        code: ResponseCodeEnum.BROKEN_HTTP
    }
}

const handleHeaders = (headers: HeadersInit | undefined, body: any): Headers => {
    const result = headers ? new Headers(headers) : new Headers();

    //content-type
    if (!result.has("content-type")) {
        if (typeof body === "object" && (isPlainObject(body) || Array.isArray(body) || typeof body.toJSON === "function")) {
            result.set("content-type", "application/json");
        }
    }

    return result;
}

const handleBody = (body: any, headers: Headers): BodyInit => {
    if (body) {
        if (headers.has("content-type") && "application/json" === headers.get("content-type")) {

            return JSON.stringify(body);
        }
    }

    return body;
}

type ApiPayloadAction = PayloadAction<XResponse<ResponseData>, string, any, any>;

const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: async (args, api) => {

        return apiBaseQuery(args, api, {});
    },
    endpoints: () => ({}),
});

export {type ApiPayloadAction, apiSlice};