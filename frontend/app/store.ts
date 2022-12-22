import { configureStore } from '@reduxjs/toolkit'
import themeReducer from '../features/theme/themeSlice';
import navbarOpenOrClosedReducer from "../features/navbar/navbarOpenOrClosedSlice";

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        navbarOpenOrClosed: navbarOpenOrClosedReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch