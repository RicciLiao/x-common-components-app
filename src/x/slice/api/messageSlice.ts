import {constants} from "../../common/constants";
import {type GetMessage} from "../../payload/GetMessage";
import {type MessageCode} from "../../payload/MessageCode";
import {type XResponse} from "../../payload/response/XResponse";
import {apiSlice} from "./apiSlice";

const messageSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getMessage: builder.query<XResponse<MessageCode>, GetMessage>({
            query: arg => ({
                url: `/message/code/${arg.code}/${arg.consumer}`,
                method: constants.HTTP_METHOD_GET
            }),
        }),
    })
})

export const {
    useGetMessageQuery,
    useLazyGetMessageQuery,
} = messageSlice;

export {messageSlice};