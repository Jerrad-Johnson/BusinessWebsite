import {cc} from "../../common/variables";
import {booleanAsString, lightboxDataSelectorTypes, lightboxInitialValueCase} from "./variables";
import {Action, LightboxOptions} from "../types/njGallery";
import {FunctionComponent} from "react";

export function lightboxButtonReducer(state: LightboxOptions, action: Action){
    switch (action.type) {
        case lightboxDataSelectorTypes.imageData:
            return {...performBasics(state, lightboxDataSelectorTypes.imageData), imageData: !state.imageData}
        case lightboxInitialValueCase:
            return activeButtonIfSet(state);
        case lightboxDataSelectorTypes.fullScreen:
            return {...state, fullScreen: !state.fullScreen}
        case lightboxDataSelectorTypes.shuffle:
            return {...state, shuffle: !state.shuffle}
        case lightboxDataSelectorTypes.shuffleDisable:
            return {...state, shuffle: false}
        default:
            return {...state};
    }
}

function performBasics(state: LightboxOptions, dataSelector: string){
    setAllStorageValuesToFalse();
    localStorage.setItem(dataSelector, String(!state.imageData));
    return setAllStateValuesToFalse(state);
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

function setAllStorageValuesToFalse(){
    for (let entry in lightboxDataSelectorTypes){
        localStorage.setItem(entry, booleanAsString.false);
    }
}

function activeButtonIfSet(state: LightboxOptions){
    const findActiveButton = setInitialValue();
    if (findActiveButton !== null){
        return {...state, [findActiveButton]: true}
    } else {
        return {...state}
    }
}