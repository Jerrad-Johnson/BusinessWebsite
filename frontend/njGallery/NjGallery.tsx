import {Dispatch, MutableRefObject, ReactElement, SetStateAction, useEffect, useReducer, useRef, useState} from 'react';
import {checkInputForErrors} from "./utils/errorChecker";
import useResizeHook from "./hooks/useResizeHook";
import addGalleryDefaults from "./utils/galleryDefaults";
import createGalleryStyle from "./utils/galleryStyles";
import {
    GalleryStylesEssential,
    GalleryElemRef,
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
import {initialShowGalleryData, lightboxReducerCases, lightboxInitialValueCase} from "./utils/variables";
import {lightboxOptionsActiveReducer} from "./utils/reducers";
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
   Make it possible to pass-in data for tooltips.
   Add zoom to full size image.
   Add portrait-landscape button, which will remove all non-landscape or non-portrait images from the gallery.
   Add margins to MUI buttons
   Colorize MUI buttons
 */

function NjGallery(props: GalleryInputs) {
    checkInputForErrors(props);

    const galleryElemRef: GalleryElemRef = useRef(null);
    const [imageElems, setImageElems] = useState<JSX.Element[] | null>(null);
    const [lightboxState, setLightboxState] = useState<number | null>(null);
    const [lightboxEverOpened, setLightboxEverOpened] = useState(false);
    const [lightboxOptionsActive, lightboxOptionsActiveDispatch] = useReducer(lightboxOptionsActiveReducer, initialShowGalleryData);
    useInterval(() => shuffleImages(lightboxImages, lightboxState, setLightboxState, lightboxOptionsActiveDispatch, getRandomWholeNumber), lightboxState !== null && lightboxOptionsActive.shuffle ? 4000 : null);
    useInterval(() => autoplayImages(lightboxImages, lightboxOptionsActiveDispatch, setLightboxState, lightboxState), lightboxState !== null && lightboxOptionsActive.autoplay ? 4000 : null);

    const galleryInputsWithDefaults: GalleryInputsWithDefaults = addGalleryDefaults(props); // TODO Design script to add original URL if large-img URL is not provided.
    const galleryCSS: GalleryStylesEssential = createGalleryStyle({...galleryInputsWithDefaults.containerPadding}, {...galleryInputsWithDefaults.containerWidth});
    useResizeHook(setImageElems, galleryInputsWithDefaults, galleryElemRef, setLightboxState, setLightboxEverOpened);

    OnMount(lightboxOptionsActiveDispatch);
    OnPropsChange(props, galleryInputsWithDefaults, galleryElemRef, setLightboxState, setLightboxEverOpened, setImageElems);
    HideNavbarWhenLightboxOpen(lightboxState);
    LightboxCloseOnClickOutsideElem(lightboxState, setLightboxState, lightboxOptionsActive, lightboxEverOpened, lightboxOptionsActiveDispatch);

    const [windowHeight, windowWidth] = useWindowDimensions();
    const lightboxImages: ImageData[] = changeLightboxImagesDateFormat(galleryInputsWithDefaults.images);
    const lightboxDimensionsCSS = calculateImageSpecsForLightbox(lightboxState, lightboxImages, windowHeight, windowWidth);
    LightboxKeyPressHandler(lightboxImages, lightboxState, setLightboxState, lightboxOptionsActive, lightboxOptionsActiveDispatch);
    const tooltipsElems = createTooltipsElems(lightboxState, lightboxImages, windowWidth);
    const fullscreenLightboxElems = CreateFullscreenLightboxElems(lightboxOptionsActive, lightboxOptionsActiveDispatch, lightboxState, lightboxImages, setLightboxState, imageElems);
    const lightboxElems = CreateLightbox(lightboxOptionsActiveDispatch, setLightboxState, lightboxImages, lightboxDimensionsCSS, lightboxState, lightboxOptionsActive, tooltipsElems, fullscreenLightboxElems, imageElems);

    return (
        <>
            {lightboxState !== null && lightboxElems}

            <div className={"njGallery"}
                 style={galleryCSS}
                 ref={galleryElemRef}
            >
                {imageElems}
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

export function changeLightboxImagesDateFormat(lightboxImages: ImageData[]): ImageData[]{
    let lightboxImagesCopy: ImageData[] = [...lightboxImages];

    for (let entry of lightboxImages){
        if (entry?.date?.length === undefined || entry?.date?.length < 12) continue;
        entry.date = entry.date.slice(0, 10)
    }

    return lightboxImagesCopy;
}

export function handleLightboxButtons(lightboxDataDispatch: Dispatch<Action>): void{
    lightboxDataDispatch({type: lightboxReducerCases.tooltip})
}

export function LightboxCloseOnClickOutsideElem(lightboxState: LightboxState,
                                                setLightboxState: SetLightboxState,
                                                lightboxOptionsActive: LightboxOptions,
                                                lightboxEverOpened: LightboxEverOpened,
                                                lightboxOptionsActiveDispatch): void{

    const listener = (e: MouseEvent) => {
        if (lightboxState !== null) {
            const elem = document.getElementById("lightboxArea");
            const target = e.target as HTMLDivElement | null;
            if (!elem?.contains(target) && lightboxOptionsActive.fullScreen !== true){
                setLightboxState(null);
                lightboxOptionsActiveDispatch({type: lightboxReducerCases.fullScreenDisable})
            }
        }
    }

    useEffect(() => {
        if (lightboxEverOpened) window.addEventListener('click', listener);
        return () => window.removeEventListener('click', listener);
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

export function OnMount(lightboxOptionsActiveDispatch: Dispatch<Action>): void{
    useEffect(() => {
        lightboxOptionsActiveDispatch({type: lightboxInitialValueCase})
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

    const listener = (e: KeyboardEvent) => {
        if (lightboxState !== null){
            if (e.keyCode === 39 && lightboxState < lightboxImages?.length-1 && lightboxState !== null){ setLightboxState((prev) => { return (prev !== null ? prev+1 : prev)}); return; }
            if (e.keyCode === 37 && lightboxState > 0 && lightboxState !== null){ setLightboxState((prev) => { return (prev !== null ? prev-1 : prev)}); return; }
            if (e.keyCode === 27 && lightboxState !== null && lightboxOptionsActive.fullScreen){ lightboxOptionsActiveDispatch({type: lightboxReducerCases.fullScreen}); return; }
            if (e.keyCode === 27 && lightboxState !== null && !lightboxOptionsActive.fullScreen){ setLightboxState(null); return; }
        }
    }

    useEventListener("keydown", listener);
}

export function createTooltipsElems(lightboxState: LightboxState,
                                    lightboxImages: ImagesData,
                                    windowWidth: number): ReactElement{

    return (
        <>
            {windowWidth > 800 && (
                <>
                <div className={"lightbox__tooltip--left"}>
                    <div className={"lightbox__tooltip--left-container"}>
                        <ul>
                            <li>
                                Title: { lightboxState !== null && lightboxImages?.[lightboxState]?.alt}
                            </li>
                            { lightboxState !== null && lightboxImages?.[lightboxState]?.date && (<li> Date: {lightboxImages?.[lightboxState]?.date} </li>) }
                        </ul>
                    </div>
                </div>

                <div className={"lightbox__tooltip--right"}>
                    <div className={"lightbox__tooltip--right-container"}>
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
                <div className={"lightbox__tooltip--right"}>
                    <div className={"lightbox__tooltip--right-container"}>
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
                                              lightboxOptionsActiveDispatch: Dispatch<Action>,
                                              lightboxState: LightboxState,
                                              lightboxImages: ImagesData,
                                              setLightboxState: SetLightboxState,
                                              imageElements): ReactElement{

    const [fullscreenImageIsLoading, setFullscreenImageIsLoading] = useState(true);

    return (
            <>
                <div className={"lightbox__fullscreen" + (lightboxOptionsActive.fullScreen === true ? " active" : "") }
                     onClick={(e) => e.stopPropagation() }
                >
                    <div className={"lightbox__fullscreen--image-container" + (lightboxOptionsActive.fullScreen === true ? " active" : "" )}
                         onClick={(e) => {
                             if (lightboxOptionsActive.fullScreen === false) return;
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
                                lightboxOptionsActiveDispatch({type: lightboxReducerCases.fullScreen});
                            }}>
                                <CloseIcon
                                    color={"secondary"}
                                    style={{fontSize: "200%"}}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </>
    );
}

export function CreateLightbox(lightboxOptionsActiveDispatch: Dispatch<Action>,
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

    return (
        <>
            <div className={"lightbox" + (lightboxOptionsActive.curtain && " curtain" || "")}>
                {fullscreenLightboxElems}
                <div className={"lightbox__backdrop"} id={"lightboxArea"}>
                    <div className={"lightbox__top-row"}>
                        <PlayCircleIcon
                            style={{fontSize: "200%"}}
                            color={(lightboxOptionsActive.autoplay ? "primary" : "")}
                            onClick={() => {
                                lightboxOptionsActiveDispatch({type: lightboxReducerCases.autoplay});
                            }}
                        />
                        <ShuffleIcon
                            style={{fontSize: "200%"}}
                            color={(lightboxOptionsActive.shuffle ? "primary" : "")}
                            onClick={() => {
                                lightboxOptionsActiveDispatch({type: lightboxReducerCases.shuffle});
                            }}
                        />
                        <FullscreenIcon
                            style={{fontSize: "200%"}}
                            color={(lightboxOptionsActive.fullScreen ? "primary" : "")}
                            onClick={() => {
                                lightboxOptionsActiveDispatch({type: lightboxReducerCases.fullScreen});
                            }}
                        />
                        <CurtainsIcon
                            style={{fontSize: "200%"}}
                            color={(lightboxOptionsActive.curtain ? "primary" : "")}
                            onClick={() => {
                                lightboxOptionsActiveDispatch({type: lightboxReducerCases.curtain});
                            }}
                        />
                        <InfoIcon
                            style={{fontSize: "200%"}}
                            color={(lightboxOptionsActive.tooltip ? "primary" : "")}
                            onClick={() => {
                                handleLightboxButtons(lightboxOptionsActiveDispatch);
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

export const autoplayImages = (lightboxImages, lightboxOptionsActiveDispatch, setLightboxState, lightboxState) => {
    if (lightboxImages.length === 1) lightboxOptionsActiveDispatch({type: lightboxReducerCases.autoplayDisable});
    const currentPosition = lightboxState;
    const end = lightboxImages.length-1, beginning = 0;
    currentPosition === end ? setLightboxState(0) : setLightboxState((prev) => prev+1)
}

export const shuffleImages = (lightboxImages, lightboxState, setLightboxState, lightboxOptionsActiveDispatch, getRandomWholeNumber) => {
    if (lightboxImages.length === 1) lightboxOptionsActiveDispatch({type: lightboxReducerCases.shuffleDisable});
    const currentPosition = lightboxState;
    setLightboxState(getRandomWholeNumber(lightboxImages.length, currentPosition))
}

export function getRandomWholeNumber(num, currentNum = null){
    const random = Math.floor(Math.random() * num);
    if (random === currentNum) return getRandomWholeNumber(num, currentNum);
    return random;
}

export default NjGallery;