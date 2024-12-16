import { configureStore } from "@reduxjs/toolkit";
import homenavReduer from "../redux/slice/homeNavOptions.slice";
import homeReducer from "../redux/slice/home.slice";
import appConatainerReducer from "../redux/slice/app.container.slice";
import userSliceReduer from "../redux/slice/user.slice";

const store = configureStore({
    reducer: {
        homeNav: homenavReduer,
        home: homeReducer,
        appContainer: appConatainerReducer,
        userData: userSliceReduer,
    }
});

export type stateType = ReturnType<typeof store.getState>
export type dispatchType = typeof store.dispatch;

export default store;