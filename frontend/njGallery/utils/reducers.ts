import {cc} from "../../common/variables";
import {
    booleanAsString,
    lightboxReducerCases,
    lightboxInitialValueCase, lightboxOptions
} from "./variables";
import {Action, LightboxOptions} from "../types/njGallery";

export function lightboxOptionsActiveReducer(state: LightboxOptions, action: Action){
    switch (action.type) {
        case lightboxReducerCases.tooltip:
            setLocalStorage(state, lightboxReducerCases.tooltip);
            return {...state, tooltip: !state.tooltip}
        case lightboxInitialValueCase:
            return {...setInitialValues(state)};
        case lightboxReducerCases.fullScreen:
            setLocalStorage(state, lightboxReducerCases.fullScreen);
            return {...state, fullScreen: !state.fullScreen}
        case lightboxReducerCases.fullScreenDisable:
            return {...state, fullScreen: false}
        case lightboxReducerCases.shuffle:
            setLocalStorage(state, lightboxReducerCases.shuffle);
            if (state.autoplay && !state.shuffle) setLocalStorageEntry(lightboxReducerCases.autoplay, false);
            return {...state, shuffle: !state.shuffle, autoplay: false}
        case lightboxReducerCases.shuffleDisable:
            return {...state, shuffle: false}
        case lightboxReducerCases.autoplay:
            if (state.shuffle && !state.autoplay) setLocalStorageEntry(lightboxReducerCases.shuffle, false);
            setLocalStorage(state, lightboxReducerCases.autoplay);
            return {...state, autoplay: !state.autoplay, shuffle: false}
        case lightboxReducerCases.autoplayDisable:
            return {...state, autoplay: false}
        case lightboxReducerCases.curtain:
            setLocalStorage(state, lightboxReducerCases.curtain);
            return {...state, curtain: !state.curtain}
        default:
            return {...state};
    }
}

function setLocalStorage(state: LightboxOptions, dataSelector: string) {
    localStorage.setItem(dataSelector, String(!state[dataSelector]));
}

function setInitialValues(state){
    let stateCopy = {...state};

    for (let entry in lightboxOptions) localStorage.getItem(entry) === booleanAsString.true ? stateCopy[entry] = true : stateCopy[entry] = false;

    return stateCopy;
}

function setLocalStorageEntry(item, bool){
    localStorage.setItem(item, bool);
}