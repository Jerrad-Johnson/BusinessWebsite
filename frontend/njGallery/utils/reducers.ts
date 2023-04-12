import {cc} from "../../common/variables";
import {booleanAsString, lightboxDataSelectorTypes, lightboxInitialValueCase} from "./variables";

export function lightboxButtonReducer(state, action){
    switch (action.type) {
        case lightboxDataSelectorTypes.imageData:
            const stateCopy = performBasics(state, lightboxDataSelectorTypes.imageData);
            return {...stateCopy, imageData: !state.imageData}
        case lightboxInitialValueCase:
            return activeButtonIfSet(state);
        default:
            break;
    }
}


function performBasics(state, dataSelector){
    setAllStorageValuesToFalse();
    localStorage.setItem(dataSelector, String(!state.imageData));
    return setAllStateValuesToFalse(state);
}

function setAllStateValuesToFalse(state) {
    let stateCopy = {...state};

    for (let entry in stateCopy){
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

function activeButtonIfSet(state){
    const findActiveButton = setInitialValue(state);
    if (findActiveButton !== null){
        return {...state, [findActiveButton]: true}
    } else {
        return {...state}
    }
}