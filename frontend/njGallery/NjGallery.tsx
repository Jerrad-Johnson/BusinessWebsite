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
import * as querystring from "querystring";
import useScreenWidth from "../hooks/useScreenWidth";


function NjGallery(props: GalleryInputs) {
    checkInputForErrors(props);
    const galleryElementRef: GalleryElementRef = useRef(null);
    const [imageElements, setImageElements] = useState<JSX.Element[] | null>(null);
    const [lightboxState, setLightboxState] = useState<number | null>(null);

    const galleryInputsWithDefaults: GalleryInputsWithDefaults = addGalleryDefaults(props); // TODO Design script to add original URL if large-img URL is not provided.
    const {containerPadding, containerWidth} = {...galleryInputsWithDefaults};
    const galleryStyles: GalleryStylesEssential = createGalleryStyle(containerPadding, containerWidth);
    const [lightboxEverOpened, setLightboxEverOpened] = useState(false);

    useEffect(() => {
        setImageElements(createGalleryLayout(galleryInputsWithDefaults, galleryElementRef, setLightboxState, setLightboxEverOpened));
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
    useResizeHook(setImageElements, galleryInputsWithDefaults, galleryElementRef, setLightboxState, setLightboxEverOpened);

    //@ts-ignore
    useEffect(() => {
        if (lightboxEverOpened){
            window.addEventListener('click', (e) => {
                if (lightboxState !== null) {
                    const elem = document.getElementById("lightboxArea");
                    //@ts-ignore
                    if (!elem?.contains(e.target)){
                        setLightboxState(null);
                    }
                }
            })

            return () => {
                window.removeEventListener('click', (e) => {
                    if (lightboxState !== null) {
                        const elem = document.getElementById("lightboxArea");
                        //@ts-ignore
                        if (!elem?.contains(e.target)){
                            setLightboxState(null);
                        }
                    }
                })
            }
        }
    }, [lightboxEverOpened]);

    const [windowHeight, windowWidth] = useWindowDimensions();

    let lightboxImages: ImageArrayData[] = galleryInputsWithDefaults.images;
    lightboxImages = changeDateFormatLightboxImages(lightboxImages);

    let activeImageWidth = 0;
    if (lightboxState !== null) activeImageWidth = lightboxImages?.[lightboxState]?.width;
    let activeImageHeight = 0 ;
    if (lightboxState !== null) activeImageHeight = lightboxImages?.[lightboxState]?.height;

    let ratio = activeImageHeight/activeImageWidth <= 1 ? activeImageHeight/activeImageWidth : activeImageWidth/activeImageHeight;
    let imageIsPortraitOrientation = activeImageWidth < activeImageHeight ? true : false;
    let unitsToTopOfLightbox = 0;
    let unitsToSideOfLightbox = 0;

    if (imageIsPortraitOrientation){
        unitsToTopOfLightbox = windowHeight / 80;
        unitsToSideOfLightbox = windowWidth / (80*ratio);
    } else {
        unitsToTopOfLightbox = windowHeight / (80*ratio);
        unitsToSideOfLightbox = windowWidth / 80;
    }

    let imageDimensionsStyle;
    if (unitsToTopOfLightbox < unitsToSideOfLightbox && !imageIsPortraitOrientation){
        imageDimensionsStyle = {height: `${windowHeight*.8}px`, width: `${windowHeight*(.8*(1/ratio))}px`};
    } else if (unitsToTopOfLightbox < unitsToSideOfLightbox && imageIsPortraitOrientation){
        imageDimensionsStyle = {height: `${windowHeight*(.8)}px`, width: `${windowHeight*(.8*ratio)}px`};
    } else if (unitsToTopOfLightbox > unitsToSideOfLightbox && !imageIsPortraitOrientation){
        imageDimensionsStyle = {height: `${windowWidth*(.8*(ratio))}px`, width: `${windowWidth*(.8)}px`};
    } else if (unitsToTopOfLightbox > unitsToSideOfLightbox && imageIsPortraitOrientation){
        imageDimensionsStyle = {height: `${windowWidth*(.8*(1/ratio))}px`, width: `${windowWidth*(.8)}px`};
    }

    const imageData = (
        <>
            <div className={"lightbox__image-data--left"}>
                <div className={"lightbox__image-data--left-container"}>
                    <ul>
                        <li>
                            Title: { lightboxState !== null && lightboxImages?.[lightboxState]?.alt}
                        </li>
                        <li>
                            Date: { lightboxState !== null && lightboxImages?.[lightboxState]?.date || "Not Listed" }
                        </li>
                    </ul>
                </div>
            </div>

            <div className={"lightbox__image-data--right"}>
                <div className={"lightbox__image-data--right-container"}>
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
        </>
    )

    /*TODO Add lightbox image-shift on key press. CSS Transition. */

    let lightbox = (
        <div className={"lightbox"}>
            <div className={"lightbox__backdrop"} id={"lightboxArea"}>
                <div className={"lightbox__top-row"}></div>

                <div className={"lightbox__middle-row"}>
                    <div className={"lightbox__image--subcontainer"} style={imageDimensionsStyle}>
                        <Image
                            key={lightboxState !== null && lightboxImages?.[lightboxState]?.lg_img_url || ""}
                            src={ lightboxState !== null && lightboxImages?.[lightboxState]?.lg_img_url || ""}
                            blurDataURL={ lightboxState !== null && lightboxImages?.[lightboxState]?.blurSrc || ""}
                            placeholder={"blur"}
                            className={"lightbox__image"}
                            layout={"fill"}
                            objectFit={"contain"}
                            alt={ lightboxState !== null && lightboxImages?.[lightboxState]?.alt || ""}
                        />

                        <div onClick={(e) => {
                                setLightboxState(prev => (prev !== null && prev-1 > -1) ? prev-1 : prev)}
                            } className={"lightbox__image--move-left"}>
                        </div>

                        <div onClick={(e) => {
                                setLightboxState(prev => (prev !== null && Array.isArray(imageElements) && prev+1 <= imageElements?.length-1) ? prev+1 : prev)}
                            } className={"lightbox__image--move-right"}>
                        </div>
                        {imageData}
                    </div>
                </div>

                <div className={"lightbox__bottom-row"}></div>
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

export function handleLightbox(event: React.MouseEvent<HTMLImageElement>, galleryInputsWithDefaults: GalleryInputsWithDefaults, setLightboxState: Dispatch<SetStateAction<number | null>>, setLightboxEverOpened: Dispatch<SetStateAction<boolean>>){
    //@ts-ignore
    let url = event.target.getAttribute("data-largeimg")
    let position = galleryInputsWithDefaults.images.findIndex((elem) => {
        return elem.lg_img_url === url;
    });

    setLightboxState(position);
    setLightboxEverOpened(true);
}

function changeDateFormatLightboxImages(lightboxImages: ImageArrayData[]): ImageArrayData[]{
    let lightboxImagesCopy = {...lightboxImages};

    for (let entry of lightboxImages){
        if (entry?.date?.length === undefined || entry?.date?.length < 12) continue;
        entry.date = entry.date.slice(0, 10)
    }

    return lightboxImagesCopy;
}

/*export function getImageWidth(portraitImageOrientation, max, ratio, windowWidth, windowHeight, portraitScreenOrientation){
    if (portraitImageOrientation === true && windowWidth < 801 && portraitScreenOrientation){
        return windowWidth * (.8);
    } else if (portraitImageOrientation === true && windowWidth < 801 && !portraitScreenOrientation){
        return max * (.9) * (ratio);
    } else if (portraitImageOrientation === false && windowWidth < 801){
        return windowWidth * (.9);
    } else if (portraitImageOrientation === true){
        return max * (.8);
    } else {
        return max * (.8);
    }
}

export function getImageHeight(portraitImageOrientation, max, ratio, windowWidth, windowHeight, portraitScreenOrientation){
    if (portraitImageOrientation === true && windowWidth < 801 && portraitScreenOrientation){
        return windowWidth * (1 / ratio) * .8;
    } else if (portraitImageOrientation === true && windowWidth < 801 && !portraitScreenOrientation){
        return max * (.9);
    } else if (portraitImageOrientation === false && windowWidth < 801){
        return windowWidth * (.9) * (ratio);
    } else if (portraitImageOrientation === true){
        return max * (1/ratio) * .8;
    } else {
        return max * (.8) * (ratio);
    }
}*/

export default NjGallery;