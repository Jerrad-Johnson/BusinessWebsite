import {createSlice, Draft} from '@reduxjs/toolkit'

export interface navbarOpenOrClosedOptions {
    open: "open";
    closed: "closed";
}

export const navbarOpenOrClosedOptions: navbarOpenOrClosedOptions = {
    open: "open",
    closed: "closed",
}

export interface navbarOpenOrClosedState {
    value: "open" | "closed";
}

const initialState: navbarOpenOrClosedState = {
    value: navbarOpenOrClosedOptions.closed,
}

export const navbarOpenOrClosedSlice = createSlice({
    name: 'navBarOpenOrClosed',
    initialState,
    reducers: {
        openNavBar: (state: Draft<navbarOpenOrClosedState>) => {
            state.value = navbarOpenOrClosedOptions.open;
            localStorage.setItem("navBarOpenOrClosed", navbarOpenOrClosedOptions.open);
        },

        closeNavBar: (state: Draft<navbarOpenOrClosedState>) => {
            state.value = navbarOpenOrClosedOptions.closed;
            localStorage.setItem("navBarOpenOrClosed", navbarOpenOrClosedOptions.closed);
        },
    },
});

export const { openNavBar, closeNavBar } = navbarOpenOrClosedSlice.actions;
export default navbarOpenOrClosedSlice.reducer;