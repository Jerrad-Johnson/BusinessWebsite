import {useRef, useState} from 'react';
import {checkInputForErrors} from "./utils/errorChecker";
import useResizeHook from "./hooks/useResizeHook";
import addGalleryDefaults from "./utils/galleryDefaults";
import createGalleryStyle from "./utils/galleryStyles";
import {GalleryStylesEssential, GalleryElementRef, GalleryInputs, GalleryInputsWithDefaults} from "./types/njGallery";

function NjGallery(galleryInputsFromUser: GalleryInputs) {
    checkInputForErrors(galleryInputsFromUser);

    const galleryElementRef: GalleryElementRef = useRef(null);
    const [imageElements, setImageElements] = useState(null);

    const galleryInputsWithDefaults: GalleryInputsWithDefaults = addGalleryDefaults(galleryInputsFromUser);
    const {containerPadding, containerWidth} = {...galleryInputsWithDefaults};
    const galleryStyles: GalleryStylesEssential = createGalleryStyle(containerPadding, containerWidth);

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