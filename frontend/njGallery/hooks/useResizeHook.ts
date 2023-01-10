import React, {Dispatch, ReactElement, SetStateAction, useEffect} from "react";
import {GalleryInputRef, GalleryInputsWithDefaults} from "../types/njGallery";

function useResizeHook(setGalleryElements: SetStateAction<Dispatch<ReactElement[] | null>>,
                       galleryInputWithDefaults: GalleryInputsWithDefaults,
                       galleryElementRef: GalleryInputRef,
                       createGalleryLayout: () => ReactElement[]){

    useEffect(() => {
        setGalleryElements(createGalleryLayout(galleryInputWithDefaults, galleryElementRef));

        window.addEventListener('resize', () => setGalleryElements(createGalleryLayout(galleryInputWithDefaults, galleryElementRef)));
        return () => {
            window.removeEventListener('resize', () => setGalleryElements(createGalleryLayout(galleryInputWithDefaults, galleryElementRef)));
        }
    }, []);
}

export default useResizeHook;