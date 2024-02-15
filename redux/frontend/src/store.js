import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from './slices/AuthSlice';
import { apiSlices } from "./slices/ApiSlices";


const store = configureStore({
    reducer: {
        auth:AuthReducer,
        [apiSlices.reducerPath]: apiSlices.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlices.middleware),
    devTools: true
})

export default store;