import {useEffect} from "react";

function useResizeHook(setGalleryElements, galleryInputWithDefaults, galleryElementRef, createGalleryLayout){
    useEffect(() => {
        setGalleryElements(createGalleryLayout(galleryInputWithDefaults, galleryElementRef));

        window.addEventListener('resize', () => setGalleryElements(createGalleryLayout(galleryInputWithDefaults, galleryElementRef)));
        return () => {
            window.removeEventListener('resize', () => setGalleryElements(createGalleryLayout(galleryInputWithDefaults, galleryElementRef)));
        }
    }, []);
}

export default useResizeHook;