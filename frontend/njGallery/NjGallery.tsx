import {useEffect, useRef, useState} from 'react';
import {checkInputForErrors} from "./utils/errorChecker";
import useResizeHook from "./hooks/useResizeHook";
import addGalleryDefaults from "./utils/galleryDefaults";
import createGalleryStyle from "./utils/galleryStyles";
import {GalleryStylesEssential, GalleryElementRef, GalleryInputs, GalleryInputsWithDefaults} from "./types/njGallery";
import {cc} from "../common/variables";
import createGalleryLayout from "./utils/galleryLayout";

function NjGallery(galleryInputsFromUser: GalleryInputs) {
    checkInputForErrors(galleryInputsFromUser);
    const galleryElementRef: GalleryElementRef = useRef(null);
    const [imageElements, setImageElements] = useState<JSX.Element[] | null>(null);

    const galleryInputsWithDefaults: GalleryInputsWithDefaults = addGalleryDefaults(galleryInputsFromUser);
    const {containerPadding, containerWidth} = {...galleryInputsWithDefaults};
    const galleryStyles: GalleryStylesEssential = createGalleryStyle(containerPadding, containerWidth);

    useEffect(() => {
        setImageElements(createGalleryLayout(galleryInputsWithDefaults, galleryElementRef));
    }, [galleryInputsFromUser]);

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