import {Dispatch, MutableRefObject, ReactElement, SetStateAction, useEffect, useReducer, useRef, useState} from 'react';
import {checkInputForErrors} from "./utils/errorChecker";
import useResizeHook from "./hooks/useResizeHook";
import addGalleryDefaults from "./utils/galleryDefaults";
import createGalleryStyle from "./utils/galleryStyles";
import {
    GalleryStylesEssential,
    GalleryElementRef,
    GalleryInputsWithDefaults,
    GalleryInputs,
    ImageData,
    Action,
    LightboxState,
    SetLightboxState,
    LightboxOptions,
    LightboxEverOpened, SetLightboxEverOpened, ImagesData, LightboxDimensionsStyle
} from "./types/njGallery";
import {cc} from "../common/variables";
import createGalleryLayout from "./utils/galleryLayout";
import Image from "next/image";
import {useWindowDimensions} from "../hooks/useWindowDimensions";
import {initialShowGalleryData, lightboxDataSelectorTypes, lightboxInitialValueCase} from "./utils/variables";
import {lightboxButtonReducer} from "./utils/reducers";
import {useInterval, useTimeout} from "usehooks-ts";
import useEventListener from "@use-it/event-listener";
import InfoIcon from '@mui/icons-material/Info';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import CloseIcon from '@mui/icons-material/Close';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import CurtainsIcon from '@mui/icons-material/Curtains';
import {CircularProgress} from "@mui/material";

/*TODO
   Make it possible pass-in data for tooltips.
   CSS Transition.
   Add zoom to full size image.
   Add image dragging.
   Rapid-clickers may close the lightbox before the fullscreen animation finishes... Handle this reset.
   Base64 images get stretched.
   Add Fullscreen loading indicator.
   Add animation to show that buttons have been clicked, or are active.
   Fullscreen Close button moves when going from portrait to landscape images.
 */

function NjGallery(props: GalleryInputs) {
    checkInputForErrors(props);
    const galleryElementRef: GalleryElementRef = useRef(null);
    const [imageElements, setImageElements] = useState<JSX.Element[] | null>(null);
    const [lightboxState, setLightboxState] = useState<number | null>(null);
    const [lightboxEverOpened, setLightboxEverOpened] = useState(false);
    const [lightboxOptionsActive, lightboxOptionsActiveDispatch] = useReducer(lightboxButtonReducer, initialShowGalleryData);

    const galleryInputsWithDefaults: GalleryInputsWithDefaults = addGalleryDefaults(props); // TODO Design script to add original URL if large-img URL is not provided.
    const {containerPadding, containerWidth} = {...galleryInputsWithDefaults};
    const galleryStyles: GalleryStylesEssential = createGalleryStyle(containerPadding, containerWidth);

    OnPropsChange(props, galleryInputsWithDefaults, galleryElementRef, setLightboxState, setLightboxEverOpened, setImageElements);
    OnMount(lightboxOptionsActiveDispatch);
    useResizeHook(setImageElements, galleryInputsWithDefaults, galleryElementRef, setLightboxState, setLightboxEverOpened);
    LightboxCloseOnClickOutsideElem(lightboxState, setLightboxState, lightboxOptionsActive, lightboxEverOpened);
    HideNavbarWhenLightboxOpen(lightboxState);

    const lightboxImages: ImageData[] = changeDateFormatLightboxImages(galleryInputsWithDefaults.images);
    const [windowHeight, windowWidth] = useWindowDimensions();
    const lightboxDimensionsCSS = calculateImageSpecsForLightbox(lightboxState, lightboxImages, windowHeight, windowWidth);
    LightboxKeyPressHandler(lightboxImages, lightboxState, setLightboxState, lightboxOptionsActive, lightboxOptionsActiveDispatch);

    const tooltipsElems = createTooltipsElems(lightboxState, lightboxImages, windowWidth);
    const fullscreenLightboxElems = CreateFullscreenLightboxElems(lightboxOptionsActive, lightboxOptionsActiveDispatch, lightboxState, lightboxImages, setLightboxState, imageElements);

    const shuffleImages = () => {
        if (lightboxImages.length === 1) lightboxOptionsActiveDispatch({type: lightboxDataSelectorTypes.shuffleDisable});
        const currentPosition = lightboxState;
        setLightboxState(getRandomWholeNumber(lightboxImages.length, currentPosition))
    }

    function getRandomWholeNumber(num, currentNum = null){
        const random = Math.floor(Math.random() * num);
        if (random === currentNum) return getRandomWholeNumber(num, currentNum);
        return random;
    }

    const autoplayImages = () => {
        if (lightboxImages.length === 1) lightboxOptionsActiveDispatch({type: lightboxDataSelectorTypes.autoplayDisable});
        const currentPosition = lightboxState;
        const end = lightboxImages.length-1, beginning = 0;
        currentPosition === end ? setLightboxState(0) : setLightboxState((prev) => prev+1)
    }

    const lightbox = CreateLightbox(lightboxOptionsActiveDispatch, setLightboxState, lightboxImages, lightboxDimensionsCSS, lightboxState, lightboxOptionsActive, tooltipsElems, fullscreenLightboxElems, imageElements);
    useInterval(shuffleImages, lightboxState !== null && lightboxOptionsActive.shuffle ? 4000 : null);
    useInterval(autoplayImages, lightboxState !== null && lightboxOptionsActive.autoplay ? 4000 : null);

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

export function handleLightbox(event: React.MouseEvent<HTMLImageElement>,
                               galleryInputsWithDefaults: GalleryInputsWithDefaults,
                               setLightboxState: Dispatch<SetStateAction<number | null>>,
                               setLightboxEverOpened: Dispatch<SetStateAction<boolean>>): void{
    const eventTarget = event.target as HTMLDivElement;
    const url: string | null = eventTarget.getAttribute("data-largeimg");
    const position = galleryInputsWithDefaults.images.findIndex((elem) => {
        return elem.lg_img_url === url;
    });

    setLightboxState(position);
    setLightboxEverOpened(true);
}

export function changeDateFormatLightboxImages(lightboxImages: ImageData[]): ImageData[]{
    let lightboxImagesCopy: ImageData[] = [...lightboxImages];

    for (let entry of lightboxImages){
        if (entry?.date?.length === undefined || entry?.date?.length < 12) continue;
        entry.date = entry.date.slice(0, 10)
    }

    return lightboxImagesCopy;
}

export function handleLightboxButtons(lightboxDataDispatch: Dispatch<Action>): void{
    lightboxDataDispatch({type: lightboxDataSelectorTypes.tooltip})
}


export function LightboxCloseOnClickOutsideElem(lightboxState: LightboxState,
                                                setLightboxState: SetLightboxState,
                                                lightboxOptionsActive: LightboxOptions,
                                                lightboxEverOpened: LightboxEverOpened): void{
    const lightboxCloseOnClickOutsideElemListener = (e: MouseEvent) => {
        if (lightboxState !== null) {
            const elem = document.getElementById("lightboxArea");
            const eventTarget = e.target as HTMLDivElement | null;
            if (!elem?.contains(eventTarget) && lightboxOptionsActive.fullScreen !== true){
                setLightboxState(null);
            }
        }
    }

    useEffect(() => {
        if (lightboxEverOpened) window.addEventListener('click', lightboxCloseOnClickOutsideElemListener);
        return () => window.removeEventListener('click', lightboxCloseOnClickOutsideElemListener);
    }, [lightboxEverOpened]);

}

export function calculateImageSpecsForLightbox(lightboxState: LightboxState,
                                               lightboxImages: ImagesData,
                                               windowHeight: number,
                                               windowWidth: number): LightboxDimensionsStyle{
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

    let lightboxDimensionsStyle;
    if (unitsToTopOfLightbox < unitsToSideOfLightbox && !imageIsPortraitOrientation){
        lightboxDimensionsStyle = {height: `${windowHeight*.8}px`, width: `${windowHeight*(.8*(1/ratio))}px`};
    } else if (unitsToTopOfLightbox < unitsToSideOfLightbox && imageIsPortraitOrientation){
        lightboxDimensionsStyle = {height: `${windowHeight*(.8)}px`, width: `${windowHeight*(.8*ratio)}px`};
    } else if (unitsToTopOfLightbox > unitsToSideOfLightbox && !imageIsPortraitOrientation){
        lightboxDimensionsStyle = {height: `${windowWidth*(.8*(ratio))}px`, width: `${windowWidth*(.8)}px`};
    } else if (unitsToTopOfLightbox > unitsToSideOfLightbox && imageIsPortraitOrientation){
        lightboxDimensionsStyle = {height: `${windowWidth*(.8*(1/ratio))}px`, width: `${windowWidth*(.8)}px`};
    }

    return lightboxDimensionsStyle;
}

export function HideNavbarWhenLightboxOpen(lightboxState: LightboxState): void{
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

export function OnMount(lightboxButtonDispatch: Dispatch<Action>): void{
    useEffect(() => {
        lightboxButtonDispatch({type: lightboxInitialValueCase})
    }, []);
}

export function OnPropsChange(props: GalleryInputs,
                              galleryInputsWithDefaults: GalleryInputsWithDefaults,
                              galleryElementRef: MutableRefObject<HTMLDivElement | null>,
                              setLightboxState: SetLightboxState,
                              setLightboxEverOpened: SetLightboxEverOpened,
                              setImageElements: Dispatch<SetStateAction<JSX.Element[] | null>>): void{
    useEffect(() => {
        setImageElements(createGalleryLayout(galleryInputsWithDefaults, galleryElementRef, setLightboxState, setLightboxEverOpened));
    }, [props]);
}

export function LightboxKeyPressHandler(lightboxImages: ImagesData,
                                        lightboxState: LightboxState,
                                        setLightboxState: SetLightboxState,
                                        lightboxOptionsActive,
                                        lightboxOptionsActiveDispatch): void{
    const lightboxKeyPressListener = (e: KeyboardEvent) => {
        if (lightboxState !== null){
            if (e.keyCode === 39 && lightboxState < lightboxImages?.length-1 && lightboxState !== null){ setLightboxState((prev) => { return (prev !== null ? prev+1 : prev)}); return; }
            if (e.keyCode === 37 && lightboxState > 0 && lightboxState !== null){ setLightboxState((prev) => { return (prev !== null ? prev-1 : prev)}); return; }
            if (e.keyCode === 27 && lightboxState !== null && lightboxOptionsActive.fullScreen){ lightboxOptionsActiveDispatch({type: lightboxDataSelectorTypes.fullScreen}); return; }
            if (e.keyCode === 27 && lightboxState !== null && !lightboxOptionsActive.fullScreen){ setLightboxState(null); return; }
        }
    }

    useEventListener("keydown", lightboxKeyPressListener);
}

export function createTooltipsElems(lightboxState: LightboxState,
                                    lightboxImages: ImagesData,
                                    windowWidth: number): ReactElement{

    return (
        <>
            {windowWidth > 800 && (
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
                                { lightboxState !== null && lightboxImages?.[lightboxState]?.lens !== lightboxImages?.[lightboxState]?.focal && (<li>Lens: {lightboxImages?.[lightboxState]?.lens}</li>) }
                            <li>
                                Focal Length: { lightboxState !== null && lightboxImages?.[lightboxState]?.focal}
                            </li>
                            <li>
                                Aperture:  {lightboxState !== null && "f/" + lightboxImages?.[lightboxState]?.aperture}
                            </li>
                            <li>
                                Exposure Time: { lightboxState !== null && lightboxImages?.[lightboxState]?.exposure + "s"}
                            </li>
                            <li>
                                ISO: { lightboxState !== null && lightboxImages?.[lightboxState]?.iso}
                            </li>
                        </ul>
                    </div>
                </div>
                </>
                )}

            {windowWidth <= 800 && (
                <div className={"lightbox__image-data--right"}>
                    <div className={"lightbox__image-data--right-container"}>
                        <ul>
                            <li>
                                Title: { lightboxState !== null && lightboxImages?.[lightboxState]?.alt}
                            </li>
                            { lightboxState !== null && lightboxImages?.[lightboxState]?.date && (<li> Date: {lightboxImages?.[lightboxState]?.date} </li>) }
                            <li>

                            <br />

                                Camera: { lightboxState !== null && lightboxImages?.[lightboxState]?.camera_model}
                            </li>
                            { lightboxState !== null && lightboxImages?.[lightboxState]?.lens !== lightboxImages?.[lightboxState]?.focal && (<li>Lens: {lightboxImages?.[lightboxState]?.lens}</li>) }
                            <li>
                                Focal Length: { lightboxState !== null && lightboxImages?.[lightboxState]?.focal}
                            </li>
                            <li>
                                Aperture:  {lightboxState !== null && "f/" + lightboxImages?.[lightboxState]?.aperture}
                            </li>
                            <li>
                                Exposure Time: { lightboxState !== null && lightboxImages?.[lightboxState]?.exposure + "s"}
                            </li>
                            <li>
                                ISO: { lightboxState !== null && lightboxImages?.[lightboxState]?.iso}
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </>
    )
}

export function CreateFullscreenLightboxElems(lightboxOptionsActive: LightboxOptions,
                                              lightboxButtonDispatch: Dispatch<Action>,
                                              lightboxState: LightboxState,
                                              lightboxImages: ImagesData,
                                              setLightboxState: SetLightboxState,
                                              imageElements): ReactElement{
    const [fullscreenImageIsLoading, setFullscreenImageIsLoading] = useState(true);

    return (
            <>
                <div className={"lightbox__fullscreen" + (lightboxOptionsActive.fullScreen === true ? " active" : "") }
                     onClick={(e) => {
                         e.stopPropagation();
                     }}
                >
                    <div className={"lightbox__fullscreen--image-container" + (lightboxOptionsActive.fullScreen === true ? " active" : "" )}
                         onClick={(e) => {
                             if (lightboxOptionsActive.fullScreen === false) return;
                             //lightboxButtonDispatch({type: lightboxDataSelectorTypes.fullScreen}); Closes lightbox if user clicks anywhere in the window.

                         }}>
                        {fullscreenImageIsLoading && (
                            <div className={"lightbox__loading-indicator"}>
                                <CircularProgress/>
                            </div>
                        )}
                        <Image
                            key={lightboxState !== null && lightboxImages?.[lightboxState]?.lg_img_url || ""}
                            src={ lightboxState !== null && lightboxImages?.[lightboxState]?.lg_img_url || ""}
                            onLoad={() => setFullscreenImageIsLoading(true)}
                            onLoadingComplete={() => setFullscreenImageIsLoading(false)}
                            className={"lightbox__image"}
                            layout={"fill"}
                            objectFit={"contain"}
                            alt={ lightboxState !== null && lightboxImages?.[lightboxState]?.alt || ""}
                        />
                        <div className={"lightbox__fullscreen-image--move-left"} onClick={(e) => {
                             setLightboxState((prev: LightboxState) => (prev !== null && prev-1 > -1) ? prev-1 : prev)}}
                        />
                        <div className={"lightbox__fullscreen-image--move-right"} onClick={(e) => {
                            setLightboxState((prev: LightboxState) => (prev !== null && Array.isArray(imageElements) && prev+1 <= imageElements?.length-1) ? prev+1 : prev)}}
                        />
                        <div className={"lightbox__fullscreen--top-row"}>
                            <div className={"lightbox__fullscreen--close-button"}
                                onClick={() => {
                                lightboxButtonDispatch({type: lightboxDataSelectorTypes.fullScreen});
                            }}>
                                <CloseIcon style={{fontSize: "200%"}} />
                            </div>
                        </div>
                    </div>
                </div>
            </>
    );
}

export function CreateLightbox(lightboxButtonDispatch: Dispatch<Action>,
                               setLightboxState: SetLightboxState,
                               lightboxImages: ImagesData,
                               lightboxDimensionsStyle: LightboxDimensionsStyle,
                               lightboxState: LightboxState,
                               lightboxOptionsActive: LightboxOptions,
                               tooltipsElems: JSX.Element,
                               fullscreenLightboxElems: JSX.Element,
                               imageElements: JSX.Element[] | null,
                               ): ReactElement{

    const [lightboxImageIsLoadingState, setLightboxImageIsLoadingState] = useState(true);
    const test = (num) => {  cc(num); }

    return (
        <>
            <div className={"lightbox" + (lightboxOptionsActive.curtain && " curtain" || "")}>
                {fullscreenLightboxElems}
                <div className={"lightbox__backdrop"} id={"lightboxArea"}>
                    <div className={"lightbox__top-row"}>
                        <PlayCircleIcon
                            style={{fontSize: "200%"}}
                            onClick={() => {
                                lightboxButtonDispatch({type: lightboxDataSelectorTypes.autoplay});
                            }}
                        />
                        <ShuffleIcon
                            style={{fontSize: "200%"}}
                            onClick={() => {
                                lightboxButtonDispatch({type: lightboxDataSelectorTypes.shuffle});
                            }}
                        />
                        <FullscreenIcon
                            style={{fontSize: "200%"}}
                            onClick={() => {
                                lightboxButtonDispatch({type: lightboxDataSelectorTypes.fullScreen});
                            }}
                        />
                        <CurtainsIcon
                            style={{fontSize: "200%"}}
                            onClick={() => {
                                lightboxButtonDispatch({type: lightboxDataSelectorTypes.curtain});
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
                            {lightboxImageIsLoadingState && (
                                <div className={"lightbox__loading-indicator"}>
                                    <CircularProgress/>
                                </div>
                            )} {/*Note: Rare case, but if a user's cache is disabled, selecting the same image twice will result in no loading indicator the second (and subsequent) times. With cache, the image loads instantly and no loading indicator is needed.*/}

                            <Image
                                key={lightboxState !== null && lightboxImages?.[lightboxState]?.lg_img_url || ""}
                                src={ lightboxState !== null && lightboxImages?.[lightboxState]?.lg_img_url || ""}
                                className={"lightbox__image"}
                                onLoad={() => setLightboxImageIsLoadingState(true)}
                                onLoadingComplete={() => setLightboxImageIsLoadingState(false)}
                                layout={"fill"}
                                objectFit={"contain"}
                                alt={ lightboxState !== null && lightboxImages?.[lightboxState]?.alt || ""}
                            />

                            <div onClick={(e) => {
                                setLightboxState((prev: LightboxState) => (prev !== null && prev-1 > -1) ? prev-1 : prev)}
                            } className={"lightbox__image--move-left"}>
                            </div>

                            <div onClick={(e) => {
                                setLightboxState((prev: LightboxState) => (prev !== null && Array.isArray(imageElements) && prev+1 <= imageElements?.length-1) ? prev+1 : prev)}
                            }
                                 className={"lightbox__image--move-right"}>
                            </div>
                            {lightboxOptionsActive?.tooltip === true && tooltipsElems}
                        </div>
                    </div>

                    <div className={"lightbox__bottom-row"}></div>
                </div>
            </div>
        </>
    );
}

export default NjGallery;