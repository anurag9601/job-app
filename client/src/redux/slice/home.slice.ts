import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateTypes = {
    homeSelectedOption: string,
}

const initialState: initialStateTypes = {
    homeSelectedOption: "jobs"
}

const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {
        setHomeSelectedOption: (state, action: PayloadAction<string>) => {
            state.homeSelectedOption = action.payload;
        }
    }
});

export const { setHomeSelectedOption } = homeSlice.actions;

export default homeSlice.reducer;