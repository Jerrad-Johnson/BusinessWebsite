import {useRef, useState} from 'react';
import {checkInputForErrors} from "./utils/errorChecker";
import useResizeHook from "./hooks/useResizeHook";
import {addDefaultsToGalleryInput, createGalleryStyle} from "./utils/preGalleryCreation";
import {GalleryBaseStyles, GalleryElementRef, GalleryInputs, GalleryInputsWithDefaults} from "./types/njGallery";

function NjGallery(galleryInputsFromUser: GalleryInputs) {
    checkInputForErrors(galleryInputsFromUser);

    const galleryElementRef: GalleryElementRef = useRef(null);
    const [imageElements, setImageElements] = useState(null);

    const galleryInputsWithDefaults: GalleryInputsWithDefaults = addDefaultsToGalleryInput(galleryInputsFromUser);
    const {containerPadding, containerWidth} = {...galleryInputsWithDefaults};
    const galleryStyles: GalleryBaseStyles = createGalleryStyle(containerPadding, containerWidth);

    //@ts-ignore
    useResizeHook(setImageElements, galleryInputsWithDefaults, galleryElementRef);

    return (
        <div className={"njGallery"}
             style={galleryStyles}
             ref={galleryElementRef}
        >
            {imageElements}
        </div>
    );
}

export default NjGallery;