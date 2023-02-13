import {useEffect, useRef, useState} from 'react';
import {checkInputForErrors} from "./utils/errorChecker";
import useResizeHook from "./hooks/useResizeHook";
import addGalleryDefaults from "./utils/galleryDefaults";
import createGalleryStyle from "./utils/galleryStyles";
import {GalleryStylesEssential, GalleryElementRef, GalleryInputs, GalleryInputsWithDefaults} from "./types/njGallery";
import {cc} from "../common/variables";
import createGalleryLayout from "./utils/galleryLayout";
import Image from "next/image";
import {useWindowDimensions} from "../hooks/useWindowDimensions";

function NjGallery(galleryInputsFromUser: GalleryInputs) {
    checkInputForErrors(galleryInputsFromUser);
    const galleryElementRef: GalleryElementRef = useRef(null);
    const [imageElements, setImageElements] = useState<JSX.Element[] | null>(null);

    const galleryInputsWithDefaults: GalleryInputsWithDefaults = addGalleryDefaults(galleryInputsFromUser); // TODO Design script to add original URL if large-img URL is not provided.
    const {containerPadding, containerWidth} = {...galleryInputsWithDefaults};
    const galleryStyles: GalleryStylesEssential = createGalleryStyle(containerPadding, containerWidth);

    const [lightboxState, setLightboxState] = useState<boolean>(null);

    useEffect(() => {
        setImageElements(createGalleryLayout(galleryInputsWithDefaults, galleryElementRef, setLightboxState));
    }, [galleryInputsFromUser]);

    //@ts-ignore
    useResizeHook(setImageElements, galleryInputsWithDefaults, galleryElementRef, setLightboxState);

    const [windowHeight, windowWidth] = useWindowDimensions();

    let lightboxImages = galleryInputsWithDefaults.images;
    cc(lightboxImages)
    let activeImageWidth = lightboxImages?.[lightboxState]?.width;
    let activeImageHeight = lightboxImages?.[lightboxState]?.height;
    let ratio  = activeImageHeight/activeImageWidth
    let max = Math.max(windowHeight, windowWidth);
    cc(max);

    let lightbox = (
        <div className={"lightbox"}>
            <Image
                src={lightboxImages?.[lightboxState]?.lg_img_url}
                onClick={((event) => {
                    setLightboxState(null)
                })}

                blurDataURL={lightboxImages?.[lightboxState]?.imgBlurSrc}
                className={"lightboxImage"}
                width={max * (.8)} height={max * (.8) * (ratio)}
                /*width={lightboxImages?.[lightboxState]?.width}
                height={lightboxImages?.[lightboxState]?.height}*/
                alt={lightboxImages?.[lightboxState]?.alt}
            />
        </div>
    );

    return (
        <>
            {lightboxState !== null && lightbox}
            <div className={"njGallery"}
                 style={galleryStyles}
                 ref={galleryElementRef}
            >
                {imageElements}
            </div>
        </>
    );
}

export function handleLightbox(event, galleryInputsWithDefaults, setLightboxState){
    let url = event.target.getAttribute("data-largeimg")
    let position = galleryInputsWithDefaults.images.findIndex((elem) => {
        return elem.lg_img_url === url;
    });

    setLightboxState(position);
}

export default NjGallery;