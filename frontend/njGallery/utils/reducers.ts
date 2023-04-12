import {cc} from "../../common/variables";
import {lightboxDataSelectorTypes} from "./variables";

export function lightboxDataSelectorReducer(state, action){
    switch (action.type) {
        case lightboxDataSelectorTypes.imageData:
            cc(5);
            return {...state}
        default:
            cc(6);
    }
}
