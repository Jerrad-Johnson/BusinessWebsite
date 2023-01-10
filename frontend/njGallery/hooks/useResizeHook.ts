import {Dispatch, ReactElement, SetStateAction, useEffect} from "react";
import {GalleryElementRef, GalleryInputsWithDefaults} from "../types/njGallery";

function useResizeHook(setGalleryElements: Dispatch<SetStateAction<ReactElement[] | null>>,
                       galleryInputWithDefaults: GalleryInputsWithDefaults,
                       galleryElementRef: GalleryElementRef,
                       createGalleryLayout: (x: GalleryInputsWithDefaults, y: GalleryElementRef) => ReactElement[]){

    useEffect(() => {
        setGalleryElements(createGalleryLayout(galleryInputWithDefaults, galleryElementRef));

        window.addEventListener('resize', () => setGalleryElements(createGalleryLayout(galleryInputWithDefaults, galleryElementRef)));
        return () => {
            window.removeEventListener('resize', () => setGalleryElements(createGalleryLayout(galleryInputWithDefaults, galleryElementRef)));
        }
    }, []);
}

export default useResizeHook;