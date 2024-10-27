import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateTypes = {
    selected: string
}

const initialState: initialStateTypes = {
    selected: "",
};

const homeNavSlice = createSlice({
    name: "homenav",
    initialState,
    reducers: {
        setSelected: (state, action: PayloadAction<string>) => {
            state.selected = action.payload
        }
    }
});

export const { setSelected } = homeNavSlice.actions;

export default homeNavSlice.reducer;