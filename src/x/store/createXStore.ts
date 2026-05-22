import {configureStore, Middleware, Reducer} from "@reduxjs/toolkit";
import {XResponseCodeMiddleware} from "../middleware/XResponseCodeMiddleware";
import {XResponseRTKMiddleware} from "../middleware/XResponseRTKMiddleware";
import {apiSlice} from "../slice/api/apiSlice";
import appProgressSlice from "../slice/appProgressSlice";
import {AppSnackbarSliceReducer} from "../slice/appSnackbarSlice";
import appThemeSlice from "../slice/appThemeSlice";

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
            appTheme: appThemeSlice,
            appProgress: appProgressSlice,
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