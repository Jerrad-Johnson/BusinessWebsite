import {useEffect, useRef, useState} from 'react';
import {checkInputForErrors} from "./utils/errorChecker";
import useResizeHook from "./hooks/useResizeHook";
import addGalleryDefaults from "./utils/galleryDefaults";
import createGalleryStyle from "./utils/galleryStyles";
import {
    GalleryStylesEssential,
    GalleryElementRef,
    GalleryInputsWithDefaults,
    GalleryInputs
} from "./types/njGallery";
import {cc} from "../common/variables";
import createGalleryLayout from "./utils/galleryLayout";
import Image from "next/image";
import {useWindowDimensions} from "../hooks/useWindowDimensions";


function NjGallery(props: GalleryInputs) {
    checkInputForErrors(props);
    const galleryElementRef: GalleryElementRef = useRef(null);
    const [imageElements, setImageElements] = useState<JSX.Element[] | null>(null);
    const [lightboxState, setLightboxState] = useState<number | null>(null);

    const galleryInputsWithDefaults: GalleryInputsWithDefaults = addGalleryDefaults(props); // TODO Design script to add original URL if large-img URL is not provided.
    const {containerPadding, containerWidth} = {...galleryInputsWithDefaults};
    const galleryStyles: GalleryStylesEssential = createGalleryStyle(containerPadding, containerWidth);

    useEffect(() => {
        setImageElements(createGalleryLayout(galleryInputsWithDefaults, galleryElementRef, setLightboxState));
    }, [props]);

    useEffect(() => {
        if (lightboxState === null){
            document.querySelector(".navbar").style.zIndex = 10;
        } else {
            document.querySelector(".navbar").style.zIndex = 1;
        }
    }, [lightboxState]);

    //@ts-ignore
    useResizeHook(setImageElements, galleryInputsWithDefaults, galleryElementRef, setLightboxState);

    const [windowHeight, windowWidth] = useWindowDimensions();

    let lightboxImages = galleryInputsWithDefaults.images;
    let activeImageWidth = lightboxImages?.[lightboxState]?.width;
    let activeImageHeight = lightboxImages?.[lightboxState]?.height;
    let ratio = activeImageHeight/activeImageWidth <= 1 ? activeImageHeight/activeImageWidth : activeImageWidth/activeImageHeight;

    let max = windowHeight > windowWidth ? windowWidth : windowHeight
        //activeImageHeight/activeImageWidth <= 1 ? windowWidth : windowHeight;
        //Math.max(windowHeight, windowWidth);
    let portraitOrientation = activeImageWidth/activeImageHeight >= 1 ? true : false;
    let imageWidth = portraitOrientation === true ? max * (.8) : max * (.8) * (ratio);
    let imageHeight = portraitOrientation === true ? max * (.8) * (ratio) : max * (.8);

    let lightbox = (
        <div className={"lightbox"}>
            <div className={"lightbox__backdrop"}>
                <div className={"lightbox__top-row"}>
                    <button onClick={(e) => {
                        setLightboxState(null);
                    }}>Close</button>
                </div>

                <div className={"lightbox__middle-row"}>
                    <div className={"lightbox__image--subcontainer"}>
                        <Image
                            src={lightboxImages?.[lightboxState]?.lg_img_url}
                            blurDataURL={lightboxImages?.[lightboxState]?.imgBlurSrc}
                            className={"lightbox__image"}
                            width={imageWidth} height={imageHeight}
                            alt={lightboxImages?.[lightboxState]?.alt}
                        />

                        <div onClick={(e) => {
                            e.stopPropagation();
                            setLightboxState(prev => (typeof prev !== "boolean" && prev-1 > -1) ? prev-1 : prev)}
                        } className={"lightbox__image--move-left"}></div>

                        <div onClick={(e) => {
                            e.stopPropagation();
                            setLightboxState(prev => (typeof prev !== "boolean" && prev+1 <= imageElements?.length-1) ? prev+1 : prev)}
                        } className={"lightbox__image--move-right"}></div>
                    </div>
                </div>

                <div className={"lightbox__bottom-row"}>
                    Title: {lightboxImages?.[lightboxState]?.alt}
                    Date: {lightboxImages?.[lightboxState]?.date}
                    Camera: {lightboxImages?.[lightboxState]?.camera_model}
                    Lens: {lightboxImages?.[lightboxState]?.lens}
                    Focal Length: {lightboxImages?.[lightboxState]?.focal}
                    Exposure Time: {lightboxImages?.[lightboxState]?.exposure}
                    ISO: {lightboxImages?.[lightboxState]?.iso}
                </div>
            </div>
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