import {Dispatch, ReactElement, SetStateAction, useEffect} from "react";
import {GalleryElementRef, GalleryInputsWithDefaults} from "../types/njGallery";
import {createGalleryLayout} from "../utils/galleryCreation";

function useResizeHook(setImageElements: Dispatch<SetStateAction<ReactElement[] | null>>,
                       galleryInputWithDefaults: GalleryInputsWithDefaults,
                       galleryElementRef: GalleryElementRef,
                       ){

    useEffect(() => {
        setImageElements(createGalleryLayout(galleryInputWithDefaults, galleryElementRef));

        window.addEventListener('resize', () => setImageElements(createGalleryLayout(galleryInputWithDefaults, galleryElementRef)));
        return () => {
            window.removeEventListener('resize', () => setImageElements(createGalleryLayout(galleryInputWithDefaults, galleryElementRef)));
        }
    }, []);
}

export default useResizeHook;