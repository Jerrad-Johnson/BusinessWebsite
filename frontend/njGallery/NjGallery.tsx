import {useRef, useState} from 'react';
import {checkInputForErrors} from "./utils/errorChecker";
import useResizeHook from "./hooks/useResizeHook";
import {addDefaultsToGalleryInput, createGalleryStyle} from "./utils/preGalleryCreation";
import {GalleryBaseStyles, GalleryElementRef, GalleryInputs, GalleryInputsWithDefaults} from "./types/njGallery";

function NjGallery(galleryInput: GalleryInputs) {
    checkInputForErrors(galleryInput);

    const galleryElementRef: GalleryElementRef = useRef(null);
    const [imageElements, setImageElements] = useState(null);

    const galleryInputWithDefaults: GalleryInputsWithDefaults = addDefaultsToGalleryInput(galleryInput);
    const {containerPadding, containerWidth} = {...galleryInputWithDefaults};
    const njGalleryStyle: GalleryBaseStyles = createGalleryStyle(containerPadding, containerWidth);

    //@ts-ignore
    useResizeHook(setImageElements, galleryInputWithDefaults, galleryElementRef);

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