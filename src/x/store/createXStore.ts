import {configureStore, Middleware, Reducer} from "@reduxjs/toolkit";
import {XResponseCodeMiddleware} from "../middleware/XResponseCodeMiddleware";
import {XResponseRTKMiddleware} from "../middleware/XResponseRTKMiddleware";
import {apiSlice} from "../slice/api/apiSlice";
import {AppSnackbarSliceReducer} from "../slice/appSnackbarSlice";

export interface XStoreConfig<ExtraReducers extends Record<string, Reducer> = {}> {
    /**
     * Project code for XResponseCodeMiddleware
     */
    projectCode: string;
    /**
     * Additional reducers specific to the consumer project
     */
    extraReducers?: ExtraReducers;
    /**
     * Additional middleware specific to the consumer project
     */
    extraMiddleware?: Middleware[];
}

/**
 * Creates a configured Redux store with common X middlewares and reducers
 */
export function createXStore<ExtraReducers extends Record<string, Reducer> = {}>(
    config: XStoreConfig<ExtraReducers>
) {
    const {projectCode, extraReducers = {}, extraMiddleware = []} = config;

    return configureStore({
        reducer: {
            appSnackbar: AppSnackbarSliceReducer,
            [apiSlice.reducerPath]: apiSlice.reducer,
            ...extraReducers,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(apiSlice.middleware)
                .concat(new XResponseCodeMiddleware(projectCode).build())
                .concat(new XResponseRTKMiddleware().build())
                .concat(extraMiddleware),
    });
}