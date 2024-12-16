import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialStateTypes {
    appMode: "dark" | "light" | "system" | String
}

const initialState: initialStateTypes = {
    appMode: localStorage.getItem("appMode") || "system",
}

const appContainerSlice = createSlice({
    name: "appContainer",
    initialState,
    reducers: {
        setAppMode: (state, action: PayloadAction<"dark" | "light" | "system">) => {
            state.appMode = action.payload
            localStorage.setItem("appMode", action.payload);
        }
    }
});

export const { setAppMode } = appContainerSlice.actions;

export default appContainerSlice.reducer;

