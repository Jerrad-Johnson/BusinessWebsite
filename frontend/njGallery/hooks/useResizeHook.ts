import {Dispatch, ReactElement, SetStateAction, useEffect} from "react";
import {GalleryElementRef, GalleryInputsWithDefaults} from "../types/njGallery";
import createGalleryLayout from "../utils/galleryLayout";

function useResizeHook(setImageElements: Dispatch<SetStateAction<ReactElement[] | null>>,
                       galleryInputsWithDefaults: GalleryInputsWithDefaults,
                       galleryElementRef: GalleryElementRef,
                       setLightboxState: Dispatch<SetStateAction<number | null>>,
                       setLightboxEverOpened,
                       ){

    useEffect(() => {
        window.addEventListener('resize', () => setImageElements(createGalleryLayout(galleryInputsWithDefaults, galleryElementRef, setLightboxState, setLightboxEverOpened)));
        return () => {
            window.removeEventListener('resize', () => setImageElements(createGalleryLayout(galleryInputsWithDefaults, galleryElementRef, setLightboxState, setLightboxEverOpened)));
        }
    }, []);
}

export default useResizeHook;