import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./reducers/Auth/AuthReducer"
import utilReducer from "./reducers/utils/utilReducer"
import featureReducer from "./reducers/utils/Features"

const Store = configureStore({
    reducer: {
        auth: authReducer,
        utils: utilReducer,
        features: featureReducer
    }
})

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch
export default Store