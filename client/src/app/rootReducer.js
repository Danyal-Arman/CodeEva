import { combineReducers } from "@reduxjs/toolkit";
import authApi from "../features/api/authApi";
import authReducer from "../features/authSlice"
import roomApi from "../features/api/roomApi";
import fileApi from "../features/api/fileApi";
import AIApi from "../features/api/aiApi";
import userApi from "../features/api/userApi";


const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [roomApi.reducerPath]: roomApi.reducer,
    [fileApi.reducerPath]: fileApi.reducer,
    [AIApi.reducerPath]: AIApi.reducer,
    [userApi.reducerPath]:userApi.reducer,
    auth: authReducer,
})
export default rootReducer;  