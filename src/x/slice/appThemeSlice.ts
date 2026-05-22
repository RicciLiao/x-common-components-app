import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface AppThemeState {
    customTheme: boolean,
}

const initialState: AppThemeState = {
    customTheme: true,
}

const appThemeSlice = createSlice({
    name: "appTheme",
    initialState,
    reducers: {
        custom(state: AppThemeState, action: PayloadAction<boolean>) {
            state.customTheme = action.payload;
        },
    }
});

export const selectCurrentTheme = (state: { appTheme: AppThemeState }) => state.appTheme.customTheme;
export const {custom} = appThemeSlice.actions;
export {
    type AppThemeState
};