import {createSlice} from "@reduxjs/toolkit";

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
        customTheme(state: AppThemeState) {
            state.customTheme = true;
        },
        tacitTheme(state: AppThemeState) {
            state.customTheme = false;
        },
    }
});

export const selectCurrentTheme = (state: { appTheme: AppThemeState }) => state.appTheme.customTheme;
export const {customTheme, tacitTheme} = appThemeSlice.actions;
export {
    type AppThemeState
};

export default appThemeSlice.reducer;
