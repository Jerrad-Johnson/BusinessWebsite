import {cc} from "../../common/variables";
import {lightboxDataSelectorTypes} from "./variables";

export function lightboxButtonReducer(state, action){
    switch (action.type) {
        case lightboxDataSelectorTypes.imageData:
            return {...state, imageData: !state.imageData}
        default:
    }
}
