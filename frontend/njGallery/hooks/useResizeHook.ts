import {Dispatch, ReactElement, SetStateAction, useEffect} from "react";
import {GalleryInputsWithDefaults} from "../types/njGallery";

function useResizeHook(setGalleryElements: SetStateAction<Dispatch<JSX.Element[]>>,
                       galleryInputWithDefaults: GalleryInputsWithDefaults,
                       galleryElementRef: ReactElement,
                       createGalleryLayout: () => JSX.Element[]){

    useEffect(() => {
        setGalleryElements(createGalleryLayout(galleryInputWithDefaults, galleryElementRef));

        window.addEventListener('resize', () => setGalleryElements(createGalleryLayout(galleryInputWithDefaults, galleryElementRef)));
        return () => {
            window.removeEventListener('resize', () => setGalleryElements(createGalleryLayout(galleryInputWithDefaults, galleryElementRef)));
        }
    }, []);
}

export default useResizeHook;