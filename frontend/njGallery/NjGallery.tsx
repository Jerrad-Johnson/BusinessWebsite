import {Dispatch, SetStateAction, useEffect, useRef, useState} from 'react';
import {checkInputForErrors} from "./utils/errorChecker";
import useResizeHook from "./hooks/useResizeHook";
import addGalleryDefaults from "./utils/galleryDefaults";
import createGalleryStyle from "./utils/galleryStyles";
import {
    GalleryStylesEssential,
    GalleryElementRef,
    GalleryInputsWithDefaults,
    GalleryInputs, ImageArrayData
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
            const navbarElem: HTMLElement | null = document.querySelector(".navbar");
            if (navbarElem !== null) navbarElem.style.zIndex = "10";
        } else {
            const navbarElem: HTMLElement | null = document.querySelector(".navbar");
            if (navbarElem !== null) navbarElem.style.zIndex = "1";
        }
    }, [lightboxState]);

    //@ts-ignore
    useResizeHook(setImageElements, galleryInputsWithDefaults, galleryElementRef, setLightboxState);

    const [windowHeight, windowWidth] = useWindowDimensions();

    let lightboxImages: ImageArrayData[] = galleryInputsWithDefaults.images;
    let activeImageWidth = 0;
    if (lightboxState !== null) activeImageWidth = lightboxImages?.[lightboxState]?.width;
    let activeImageHeight = 0 ;
    if (lightboxState !== null) activeImageHeight = lightboxImages?.[lightboxState]?.height;
    let ratio = activeImageHeight/activeImageWidth <= 1 ? activeImageHeight/activeImageWidth : activeImageWidth/activeImageHeight;

    let max = windowHeight > windowWidth ? windowWidth : windowHeight
        //activeImageHeight/activeImageWidth <= 1 ? windowWidth : windowHeight;
        //Math.max(windowHeight, windowWidth);
    let portraitOrientation = activeImageWidth/activeImageHeight >= 1 ? true : false;
    let imageWidth = portraitOrientation === true ? max * (.8) : max * (.8) * (ratio);
    let imageHeight = portraitOrientation === true ? max * (.8) * (ratio) : max * (.8);


    /*TODO Add lightbox image-shift on key press. Change Lightbox "Date" format. CSS Transition.*/
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
                            src={ lightboxState !== null && lightboxImages?.[lightboxState]?.lg_img_url || ""}
                            blurDataURL={ lightboxState !== null && lightboxImages?.[lightboxState]?.blurSrc || ""}
                            className={"lightbox__image"}
                            width={ imageWidth }
                            height={ imageHeight }
                            alt={ lightboxState !== null && lightboxImages?.[lightboxState]?.alt || ""}
                        />

                        <div onClick={(e) => {
                            e.stopPropagation();
                            setLightboxState(prev => (prev !== null && prev-1 > -1) ? prev-1 : prev)}
                        } className={"lightbox__image--move-left"}></div>

                        <div onClick={(e) => {
                            e.stopPropagation();
                            setLightboxState(prev => (prev !== null && Array.isArray(imageElements) && prev+1 <= imageElements?.length-1) ? prev+1 : prev)}
                        } className={"lightbox__image--move-right"}></div>
                    </div>
                </div>

                <div className={"lightbox__bottom-row"}>
                    <div className={"lightbox__bottom-row--left"}>
                        <ul>
                            <li>
                                Title: { lightboxState !== null && lightboxImages?.[lightboxState]?.alt}
                            </li>
                            <li>
                                Date: { lightboxState !== null && lightboxImages?.[lightboxState]?.date || "Not Listed" }
                            </li>
                        </ul>
                    </div>

                    <div className={"lightbox__bottom-row--right"}>
                        <ul>
                            <li>
                                Camera: { lightboxState !== null && lightboxImages?.[lightboxState]?.camera_model}
                            </li>
                            <li>
                                Lens: { lightboxState !== null && lightboxImages?.[lightboxState]?.lens}
                            </li>
                            <li>
                                Focal Length: { lightboxState !== null && lightboxImages?.[lightboxState]?.focal}
                            </li>
                            <li>
                                Exposure Time: { lightboxState !== null && lightboxImages?.[lightboxState]?.exposure}
                            </li>
                            <li>
                                ISO: { lightboxState !== null && lightboxImages?.[lightboxState]?.iso}
                            </li>
                        </ul>
                    </div>
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

export function handleLightbox(event: React.MouseEvent<HTMLImageElement>, galleryInputsWithDefaults: GalleryInputsWithDefaults, setLightboxState: Dispatch<SetStateAction<number | null>>){
    //@ts-ignore
    let url = event.target.getAttribute("data-largeimg")
    let position = galleryInputsWithDefaults.images.findIndex((elem) => {
        return elem.lg_img_url === url;
    });

    setLightboxState(position);
}

export default NjGallery;