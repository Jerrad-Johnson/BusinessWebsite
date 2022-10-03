import {createSlice, Draft} from '@reduxjs/toolkit'

export interface ThemeOptions {
    dark: "dark-theme";
    light: "light-theme";
}

export const themeOptions: ThemeOptions = {
    dark: "dark-theme",
    light: "light-theme",
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
            localStorage.setItem("themeStyle", themeOptions.light);
        },

        darkTheme: (state: Draft<ThemeState>) => {
            state.value = themeOptions.dark;
            localStorage.setItem("themeStyle", themeOptions.dark);
        },
    },
});

export const { lightTheme, darkTheme } = themeSlice.actions;
export default themeSlice.reducer;