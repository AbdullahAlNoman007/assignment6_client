import { configureStore } from "@reduxjs/toolkit";
import { persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, REGISTER, PURGE, persistReducer } from "redux-persist";
import { baseApi } from "./api/baseApi";
import authReducer from "./features/auth/authSlicer";
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'auth',
    storage
}

const persistedAuthReducer = persistReducer(persistConfig, authReducer)


export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        auth: persistedAuthReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(baseApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export const persistor = persistStore(store)
export type AppDispatch = typeof store.dispatch