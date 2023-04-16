import {cc} from "../../common/variables";
import {booleanAsString, lightboxDataSelectorTypes, lightboxInitialValueCase} from "./variables";
import {Action, LightboxOptions} from "../types/njGallery";
import {FunctionComponent} from "react";

export function lightboxButtonReducer(state: LightboxOptions, action: Action){
    switch (action.type) {
        case lightboxDataSelectorTypes.tooltip:
            performBasics(state, lightboxDataSelectorTypes.tooltip);
            return {...state, tooltip: !state.tooltip}
        case lightboxInitialValueCase:
            return activeButtonIfSet(state);
        case lightboxDataSelectorTypes.fullScreen:
            return {...state, fullScreen: !state.fullScreen}
        case lightboxDataSelectorTypes.fullScreenDisable:
            return {...state, fullScreen: false}
        case lightboxDataSelectorTypes.shuffle:
            return {...state, shuffle: !state.shuffle, autoplay: false}
        case lightboxDataSelectorTypes.shuffleDisable:
            return {...state, shuffle: false}
        case lightboxDataSelectorTypes.autoplay:
            return {...state, autoplay: !state.autoplay, shuffle: false}
        case lightboxDataSelectorTypes.autoplayDisable:
            return {...state, autoplay: false}
        case lightboxDataSelectorTypes.curtain:
            return {...state, curtain: !state.curtain}
        default:
            return {...state};
    }
}

function performBasics(state: LightboxOptions, dataSelector: string){
    //setAllStorageValuesToFalse();
    localStorage.setItem(dataSelector, String(!state[dataSelector]));
    //return setAllStateValuesToFalse(state);
}

function setAllStorageValuesToFalse(){
    for (let entry in lightboxDataSelectorTypes){
        localStorage.setItem(entry, booleanAsString.false);
    }
}


function setAllStateValuesToFalse(state: LightboxOptions) {
    let stateCopy = {...state};

    for (let entry in stateCopy){ //@ts-ignore
        stateCopy[entry] = false;
    }

    return stateCopy;
}

function setInitialValue(){
    for (let entry in lightboxDataSelectorTypes){
        if (localStorage.getItem(entry) === booleanAsString.true) return entry;
    }

    return null;
}

function activeButtonIfSet(state: LightboxOptions){
    const findActiveButton = setInitialValue();
    if (findActiveButton !== null){
        return {...state, [findActiveButton]: true}
    } else {
        return {...state}
    }
}