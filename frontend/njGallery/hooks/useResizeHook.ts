import {Dispatch, JSXElementConstructor, ReactElement, SetStateAction, useEffect} from "react";
import {GalleryInputRef, GalleryInputsWithDefaults} from "../types/njGallery";

function useResizeHook(setGalleryElements: Dispatch<SetStateAction<ReactElement[] | null>>,
                       galleryInputWithDefaults: GalleryInputsWithDefaults,
                       galleryElementRef: GalleryInputRef,
                       createGalleryLayout: (x: GalleryInputsWithDefaults, y: GalleryInputRef) => ReactElement[]){

    useEffect(() => {
        setGalleryElements(createGalleryLayout(galleryInputWithDefaults, galleryElementRef));

        window.addEventListener('resize', () => setGalleryElements(createGalleryLayout(galleryInputWithDefaults, galleryElementRef)));
        return () => {
            window.removeEventListener('resize', () => setGalleryElements(createGalleryLayout(galleryInputWithDefaults, galleryElementRef)));
        }
    }, []);
}

export default useResizeHook;