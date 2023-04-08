import {Dispatch, ReactElement, SetStateAction, useEffect} from "react";
import {GalleryElementRef, GalleryInputsWithDefaults} from "../types/njGallery";
import createGalleryLayout from "../utils/galleryLayout";

function useResizeHook(setImageElements: Dispatch<SetStateAction<ReactElement[] | null>>,
                       galleryInputsWithDefaults: GalleryInputsWithDefaults,
                       galleryElementRef: GalleryElementRef,
                       setLightboxState: Dispatch<SetStateAction<number | null>>,
                       ){

    useEffect(() => {
        window.addEventListener('resize', () => setImageElements(createGalleryLayout(galleryInputsWithDefaults, galleryElementRef, setLightboxState)));
        return () => {
            window.removeEventListener('resize', () => setImageElements(createGalleryLayout(galleryInputsWithDefaults, galleryElementRef, setLightboxState)));
        }
    }, []);
}

export default useResizeHook;