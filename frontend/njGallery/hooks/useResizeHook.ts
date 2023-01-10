import {Dispatch, ReactElement, SetStateAction, useEffect} from "react";
import {GalleryElementRef, GalleryInputsWithDefaults} from "../types/njGallery";
import createGalleryLayout from "../utils/galleryLayout";

function useResizeHook(setImageElements: Dispatch<SetStateAction<ReactElement[] | null>>,
                       galleryInputsWithDefaults: GalleryInputsWithDefaults,
                       galleryElementRef: GalleryElementRef,
                       ){

    useEffect(() => {
        setImageElements(createGalleryLayout(galleryInputsWithDefaults, galleryElementRef));
        window.addEventListener('resize', () => setImageElements(createGalleryLayout(galleryInputsWithDefaults, galleryElementRef)));
        return () => {
            window.removeEventListener('resize', () => setImageElements(createGalleryLayout(galleryInputsWithDefaults, galleryElementRef)));
        }
    }, []);
}

export default useResizeHook;