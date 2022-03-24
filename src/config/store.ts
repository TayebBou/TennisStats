import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "./stateSlices/homeSlice";


const store = configureStore({
    reducer: {
        home: homeReducer
    }
});

export default store;