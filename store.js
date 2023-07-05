import { configureStore } from "@reduxjs/toolkit";
import paramReducer from "./slice/param";

const store = configureStore({
    reducer: {
        param: paramReducer
    }
});

export default store;