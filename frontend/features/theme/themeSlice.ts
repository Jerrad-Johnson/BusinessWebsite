import {createSlice, Draft} from '@reduxjs/toolkit'

export interface ThemeOptions {
    dark: "dark";
    light: "light";
}

const themeOptions: ThemeOptions = {
    dark: "dark",
    light: "light",
}

export interface ThemeState {
    value: "dark" | "light";
}

const initialState: ThemeState = {
    value: themeOptions.dark,
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        lightTheme: (state: Draft<ThemeState>) => {
            state.value = themeOptions.light;
        },

        darkTheme: (state: Draft<ThemeState>) => {
            state.value = themeOptions.dark;
        },
    },
});

export const { lightTheme, darkTheme } = themeSlice.actions;

export default themeSlice.reducer;