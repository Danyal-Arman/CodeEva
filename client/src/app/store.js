import {configureStore} from "@reduxjs/toolkit"
import rootReducer from "./rootReducer"
import authApi from "../features/api/authApi"
import roomApi from "../features/api/roomApi"
import fileApi from "../features/api/fileApi"
import AIApi from "../features/api/aiApi"
import userApi from "../features/api/userApi"


const appStore = configureStore({
    reducer:rootReducer,
    middleware : (getDefaultMiddleware)=>
        getDefaultMiddleware().concat(authApi.middleware, roomApi.middleware, fileApi.middleware, AIApi.middleware, userApi.middleware)    
})
export default appStore