import {Dispatch, ReactElement, SetStateAction, useEffect} from "react";
import {GalleryElemRef, GalleryInputsWithDefaults} from "../types/njGallery";
import createGalleryLayout from "../utils/galleryLayout";

function useResizeHook(setImageElements: Dispatch<SetStateAction<ReactElement[] | null>>,
                       galleryInputsWithDefaults: GalleryInputsWithDefaults,
                       galleryElementRef: GalleryElemRef,
                       setLightboxState: Dispatch<SetStateAction<number | null>>,
                       setLightboxEverOpened: Dispatch<SetStateAction<boolean>>,
                       ){

    useEffect(() => {
        window.addEventListener('resize', () => setImageElements(createGalleryLayout(galleryInputsWithDefaults, galleryElementRef, setLightboxState, setLightboxEverOpened)));
        return () => {
            window.removeEventListener('resize', () => setImageElements(createGalleryLayout(galleryInputsWithDefaults, galleryElementRef, setLightboxState, setLightboxEverOpened)));
        }
    }, []);
}

export default useResizeHook;