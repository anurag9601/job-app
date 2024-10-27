import { configureStore } from "@reduxjs/toolkit";
import homenavReduer from "../redux/slice/homeNavOptions.slice";
import homeReducer from "../redux/slice/home.slice"

const store = configureStore({
    reducer: {
        homeNav: homenavReduer,
        home: homeReducer
    }
});

export default store;