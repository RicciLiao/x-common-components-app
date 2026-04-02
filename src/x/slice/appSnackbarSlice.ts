import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {type AppSnackbar} from "../ui/snackbar/AppSnackbar";

interface AppSnackbarState extends AppSnackbar {
}

const initialState = {} as AppSnackbarState;

const appSnackbarSlice = createSlice({
    name: "appSnackbar",
    initialState,
    reducers: {
        addSnackbar: (state: AppSnackbarState, action: PayloadAction<AppSnackbar>) => {
            state.message = action.payload.message;
            state.date = action.payload.date;
            state.alertType = action.payload.alertType;
        },
        removeSnackbar: () => {

            return initialState;
        }
    }
});

export const {addSnackbar, removeSnackbar} = appSnackbarSlice.actions;
export const appSnackbarSliceReducer = appSnackbarSlice.reducer;
export default appSnackbarSlice.reducer;
export type { AppSnackbarState };
