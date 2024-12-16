import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface userDataTypes {
    _id: string,
    fullName: string,
    email: string,
}

interface initialStateDataTypes {
    user: null | userDataTypes
}

const initialState: initialStateDataTypes = {
    user: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<userDataTypes | null>) => {
            state.user = action.payload
        }
    }
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;