import {createSlice} from "@reduxjs/toolkit";

interface AppProgressState {
    progress: boolean,
}

const initialState: AppProgressState = {
    progress: false,
}

const appProgressSlice = createSlice({
    name: "appProgress",
    initialState,
    reducers: {
        processingProgress(state: AppProgressState) {
            state.progress = true;
        },
        completedProgress(state: AppProgressState) {
            state.progress = false;
        },
    }
});

export const selectProgress = (state: { appProgress: AppProgressState }) => state.appProgress.progress;
export const {processingProgress, completedProgress} = appProgressSlice.actions;
export {
    type AppProgressState
};

export default appProgressSlice.reducer;
