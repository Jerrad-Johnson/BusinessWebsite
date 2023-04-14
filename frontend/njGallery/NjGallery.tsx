import {Dispatch, SetStateAction, useEffect, useReducer, useRef, useState} from 'react';
import {checkInputForErrors} from "./utils/errorChecker";
import useResizeHook from "./hooks/useResizeHook";
import addGalleryDefaults from "./utils/galleryDefaults";
import createGalleryStyle from "./utils/galleryStyles";
import {
    GalleryStylesEssential,
    GalleryElementRef,
    GalleryInputsWithDefaults,
    GalleryInputs, ImageArrayData, Action
} from "./types/njGallery";
import {cc} from "../common/variables";
import createGalleryLayout from "./utils/galleryLayout";
import Image from "next/image";
import {useWindowDimensions} from "../hooks/useWindowDimensions";
import {initialShowGalleryData, lightboxDataSelectorTypes, lightboxInitialValueCase} from "./utils/variables";
import {lightboxButtonReducer} from "./utils/reducers";
import InfoIcon from '@mui/icons-material/Info';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import CloseIcon from '@mui/icons-material/Close';
import useEventListener from "@use-it/event-listener";

/*TODO
   Add Fullscreen lightbox image-shift click areas.
   CSS Transition.
   Add zoom to full size image.
   Add button to darken background... curtain icon? brightness icon? eye icon?
   Auto-play.
   Randomizer.
   Add image dragging.
   Rapid-clickers may close the lightbox before the fullscreen animation finishes, handle this reset. Lightbox Base64 images get vertically stretched.
   Make tooltip single-column if screen is very narrow, and increase font size.
   Do not print both lens *and* focal length when they're identical.
   Add aperture to tooltip.
   Blur does not render corretly in lgihtbvox or FS lightbox
   Use loading icon and do CSS transition when switching between images. Or fix blur.
 */

function NjGallery(props: GalleryInputs) {
    checkInputForErrors(props);
    const galleryElementRef: GalleryElementRef = useRef(null);
    const [imageElements, setImageElements] = useState<JSX.Element[] | null>(null);
    const [lightboxState, setLightboxState] = useState<number | null>(null);
    const [lightboxEverOpened, setLightboxEverOpened] = useState(false);
    const [lightboxButtonsActive, lightboxButtonDispatch] = useReducer(lightboxButtonReducer, initialShowGalleryData);

    const galleryInputsWithDefaults: GalleryInputsWithDefaults = addGalleryDefaults(props); // TODO Design script to add original URL if large-img URL is not provided.
    const {containerPadding, containerWidth} = {...galleryInputsWithDefaults};
    const galleryStyles: GalleryStylesEssential = createGalleryStyle(containerPadding, containerWidth);

    onPropsChange(props, galleryInputsWithDefaults, galleryElementRef, setLightboxState, setLightboxEverOpened, setImageElements);
    onMount(lightboxButtonDispatch); //@ts-ignore
    useResizeHook(setImageElements, galleryInputsWithDefaults, galleryElementRef, setLightboxState, setLightboxEverOpened);
    lightboxCloseOnClickOutsideElem(lightboxState, setLightboxState, lightboxButtonsActive, lightboxEverOpened);
    hideNavbarWhenLightboxOpen(lightboxState);

    const lightboxImages: ImageArrayData[] = changeDateFormatLightboxImages(galleryInputsWithDefaults.images);
    const lightboxDimensionsCSS = calculateImageSpecsForLightbox(lightboxState, lightboxImages, ...useWindowDimensions());
    lightboxKeyPressHandler(lightboxImages, lightboxState, setLightboxState);

    const tooltipsElems = createTooltipsElems(lightboxState, lightboxImages);
    const fullscreenLightboxElems = createFullscreenLightboxElems(lightboxButtonsActive, lightboxButtonDispatch, lightboxState, lightboxImages);
    const lightbox = createLightbox(lightboxButtonDispatch, setLightboxState, lightboxImages, lightboxDimensionsCSS, lightboxState, lightboxButtonsActive, tooltipsElems, fullscreenLightboxElems, imageElements);

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

export function changeDateFormatLightboxImages(lightboxImages: ImageArrayData[]): ImageArrayData[]{
    let lightboxImagesCopy = [...lightboxImages];

    for (let entry in lightboxImages){
        if (entry?.date?.length === undefined || entry?.date?.length < 12) continue;
        entry.date = entry.date.slice(0, 10)
    }

    return lightboxImagesCopy;
}

export function handleLightboxButtons(lightboxDataDispatch: Dispatch<Action>){
    lightboxDataDispatch({type: lightboxDataSelectorTypes.imageData})
}

export function handleFullScreenButton(){

}

export function lightboxCloseOnClickOutsideElem(lightboxState, setLightboxState, lightboxButtonsActive, lightboxEverOpened){
    const lightboxCloseOnClickOutsideElemListener = (e) => {
        if (lightboxState !== null) {
            const elem = document.getElementById("lightboxArea");
            //@ts-ignore
            if (!elem?.contains(e.target) && lightboxButtonsActive.fullScreen !== true){
                setLightboxState(null);
            }
        }
    }

    useEffect(() => {
        if (lightboxEverOpened) {
            window.addEventListener('click', lightboxCloseOnClickOutsideElemListener);
            return () => window.removeEventListener('click', lightboxCloseOnClickOutsideElemListener);
        }
    }, [lightboxEverOpened]);

}

export function calculateImageSpecsForLightbox(lightboxState, lightboxImages, windowHeight, windowWidth){
    let activeImageWidth = 0;
    if (lightboxState !== null) activeImageWidth = lightboxImages?.[lightboxState]?.width;
    let activeImageHeight = 0 ;
    if (lightboxState !== null) activeImageHeight = lightboxImages?.[lightboxState]?.height;

    let ratio = activeImageHeight/activeImageWidth <= 1 ? activeImageHeight/activeImageWidth : activeImageWidth/activeImageHeight;
    let imageIsPortraitOrientation = activeImageWidth < activeImageHeight;
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

    return imageDimensionsStyle;
}

export function hideNavbarWhenLightboxOpen(lightboxState){
    useEffect(() => {
        if (lightboxState === null){
            const navbarElem: HTMLElement | null = document.querySelector(".navbar");
            if (navbarElem !== null) navbarElem.style.zIndex = "10";
        } else {
            const navbarElem: HTMLElement | null = document.querySelector(".navbar");
            if (navbarElem !== null) navbarElem.style.zIndex = "1";
        }
    }, [lightboxState]);
}

export function onMount(lightboxButtonDispatch){
    useEffect(() => {
        lightboxButtonDispatch({type: lightboxInitialValueCase})
    }, []);
}

export function onPropsChange(props, galleryInputsWithDefaults, galleryElementRef, setLightboxState, setLightboxEverOpened, setImageElements){
    useEffect(() => {
        setImageElements(createGalleryLayout(galleryInputsWithDefaults, galleryElementRef, setLightboxState, setLightboxEverOpened));
    }, [props]);
}

export function lightboxKeyPressHandler(lightboxImages, lightboxState, setLightboxState){
    const lightboxKeyPressListener = (e) => {
        if (lightboxState !== null){
            if (e.keyCode === 39 && lightboxState < lightboxImages?.length-1) setLightboxState((prev) => prev+1);
            if (e.keyCode === 37 && lightboxState > 0) setLightboxState((prev) => prev-1);
        }
    }

    useEventListener("keydown", lightboxKeyPressListener);
}

export function createTooltipsElems(lightboxState, lightboxImages){
    return (
        <>
            <div className={"lightbox__image-data--left"}>
                <div className={"lightbox__image-data--left-container"}>
                    <ul>
                        <li>
                            Title: { lightboxState !== null && lightboxImages?.[lightboxState]?.alt}
                        </li>
                        { lightboxState !== null && lightboxImages?.[lightboxState]?.date && (<li> Date: {lightboxImages?.[lightboxState]?.date} </li>) }
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
}

export function createFullscreenLightboxElems(lightboxButtonsActive, lightboxButtonDispatch, lightboxState, lightboxImages){
    return (
            <>
                <div className={"lightbox__fullscreen" + (lightboxButtonsActive.fullScreen === true ? " active" : "") }
                     onClick={(e) => {
                         e.stopPropagation();
                     }}
                >
                    <div className={"lightbox__fullscreen--image-container" + (lightboxButtonsActive.fullScreen === true ? " active" : "" )}
                         onClick={(e) => {
                             if (lightboxButtonsActive.fullScreen === false) return;
                             lightboxButtonDispatch({type: lightboxDataSelectorTypes.fullScreen});

                         }}>
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
                    </div>
                </div>
            </>
    );
}

export function createLightbox(lightboxButtonDispatch, setLightboxState, lightboxImages, lightboxDimensionsStyle, lightboxState, lightboxButtonsActive, tooltipsElems, fullscreenLightboxElems, imageElements){
    return (
        <div className={"lightbox"}>
            {fullscreenLightboxElems}
            <div className={"lightbox__backdrop"} id={"lightboxArea"}>
                <div className={"lightbox__top-row"}>
                    <FullscreenIcon
                        style={{fontSize: "200%"}}
                        onClick={() => {
                            lightboxButtonDispatch({type: lightboxDataSelectorTypes.fullScreen});
                        }}
                    />
                    <InfoIcon
                        style={{fontSize: "200%"}}
                        onClick={() => {
                            handleLightboxButtons(lightboxButtonDispatch);
                        }}
                    />
                    <CloseIcon
                        style={{fontSize: "200%"}}
                        onClick={() => {
                            setLightboxState(null);
                        }}
                    />
                </div>

                <div className={"lightbox__middle-row"}>
                    <div className={"lightbox__image--subcontainer"} style={lightboxDimensionsStyle}>
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
                        }
                             className={"lightbox__image--move-right"}>
                        </div>
                        {lightboxButtonsActive?.imageData === true && tooltipsElems}
                    </div>
                </div>

                <div className={"lightbox__bottom-row"}></div>
            </div>
        </div>
    );
}

export default NjGallery;