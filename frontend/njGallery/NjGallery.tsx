import {MutableRefObject, ReactElement, useRef, useState} from 'react';
import {checkInputForErrors} from "./utils/errorChecker";
import useResizeHook from "./hooks/useResizeHook";
import {addDefaultsToGalleryInput, createGalleryStyle} from "./utils/preGalleryCreation";
import {createGalleryLayout} from "./utils/galleryCreation";
import {GalleryBaseStyles, GalleryInputRef, GalleryInputs, GalleryInputsWithDefaults} from "./types/njGallery";
import {cc} from "../common/variables";

function NjGallery(galleryInput: GalleryInputs) {
    checkInputForErrors(galleryInput);

    const galleryElementRef: GalleryInputRef = useRef(null);
    const [imageElements, setImageElements] = useState(null);

    const galleryInputWithDefaults: GalleryInputsWithDefaults = addDefaultsToGalleryInput(galleryInput);
    const {containerPadding, containerWidth} = {...galleryInputWithDefaults};
    const njGalleryStyle: GalleryBaseStyles = createGalleryStyle(containerPadding, containerWidth);

    //@ts-ignore
    useResizeHook(setImageElements, galleryInputWithDefaults, galleryElementRef, createGalleryLayout);

    return (
        <div className={"njGallery"}
             style={njGalleryStyle}
             ref={galleryElementRef}
        >
            {imageElements}
        </div>
    );
}

export default NjGallery;