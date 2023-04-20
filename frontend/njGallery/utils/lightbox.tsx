import {
    Action, GalleryInputs,
    GalleryInputsWithDefaults,
    ImageData, ImagesData, LightboxDimensionsStyle, LightboxEverOpened,
    LightboxOptions,
    LightboxState, SetLightboxEverOpened,
    SetLightboxState
} from "../types/njGallery";
import {Dispatch, MutableRefObject, ReactElement, SetStateAction, useEffect, useState} from "react";
import {lightboxInitialValueCase, lightboxReducerCases} from "./variables";
import createGalleryLayout from "./galleryLayout";
import useEventListener from "@use-it/event-listener";
import {CircularProgress, createTheme, Theme, ThemeProvider} from "@mui/material";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import CurtainsIcon from "@mui/icons-material/Curtains";
import InfoIcon from "@mui/icons-material/Info";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {themeOptions} from "../../features/theme/themeSlice";
import {cc} from "../../common/variables";

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
                                                lightboxOptionsActiveDispatch: Dispatch<Action>,
                                                shuffleReset: Dispatch<SetStateAction<boolean>>,
                                                autoplayReset: Dispatch<SetStateAction<boolean>>,
                                                ): void{
    const listener = (e: MouseEvent) => {
        if (lightboxState !== null) {
            const elem = document.getElementById("lightboxArea");
            const target = e.target as HTMLDivElement | null;
            if (!elem?.contains(target) && lightboxOptionsActive.fullscreen !== true){
                setLightboxState(null);
                resetAutoplayIfTrue(lightboxOptionsActiveDispatch, lightboxOptionsActive, shuffleReset, autoplayReset)
                lightboxOptionsActiveDispatch({type: lightboxReducerCases.fullscreenDisable})
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
                                               windowWidth: number
                                               ): LightboxDimensionsStyle{
    let activeImageWidth = 0;
    if (lightboxState !== null) activeImageWidth = lightboxImages?.[lightboxState]?.width;
    let activeImageHeight = 0 ;
    if (lightboxState !== null) activeImageHeight = lightboxImages?.[lightboxState]?.height;

    let ratio = activeImageHeight/activeImageWidth <= 1
        ? activeImageHeight/activeImageWidth : activeImageWidth/activeImageHeight;
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
                              setImageElements: Dispatch<SetStateAction<JSX.Element[] | null>>,
                              lightboxOptionsActiveDispatch: Dispatch<Action>
                              ): void{
    useEffect(() => {
        setImageElements((prevElements) => createGalleryLayout(galleryInputsWithDefaults,
            galleryElementRef, setLightboxState, setLightboxEverOpened, prevElements));
    }, [props]);
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
    { lightboxState !== null && lightboxImages?.[lightboxState]?.date && (<li>
        Date: {lightboxImages?.[lightboxState]?.date} </li>) }
    </ul>
    </div>
    </div>

    <div className={"lightbox__tooltip--right"}>
    <div className={"lightbox__tooltip--right-container"}>
        <ul>
            <li>
                Camera: { lightboxState !== null && lightboxImages?.[lightboxState]?.camera_model}
        </li>
        { lightboxState !== null && lightboxImages?.[lightboxState]?.lens !== lightboxImages?.[lightboxState]?.focal
            && (<li>Lens: {lightboxImages?.[lightboxState]?.lens}</li>) }
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
            { lightboxState !== null && lightboxImages?.[lightboxState]?.date &&
                (<li> Date: {lightboxImages?.[lightboxState]?.date} </li>) }
            <li>

            <br />

            Camera: { lightboxState !== null && lightboxImages?.[lightboxState]?.camera_model}
                </li>
                { lightboxState !== null && lightboxImages?.[lightboxState]?.lens
                    !== lightboxImages?.[lightboxState]?.focal
                    && (<li>Lens: {lightboxImages?.[lightboxState]?.lens}</li>) }
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

export function LightboxKeyPressHandler(lightboxImages: ImagesData,
                                        lightboxState: LightboxState,
                                        setLightboxState: SetLightboxState,
                                        lightboxOptionsActive: LightboxOptions,
                                        lightboxOptionsActiveDispatch: Dispatch<Action>,
                                        shuffleReset: Dispatch<SetStateAction<boolean>>,
                                        autoplayReset: Dispatch<SetStateAction<boolean>>,
                                        ): void{

    const listener = (e: KeyboardEvent) => {
        if (lightboxState !== null){
            //27 == escape key, 39 == right arrow, 37 == left arrow.
            if (e.keyCode === 39 && lightboxState < lightboxImages?.length-1 && lightboxState !== null){
                setLightboxState((prev) => { return (prev !== null ? prev+1 : prev)});
                resetAutoplayIfTrue(lightboxOptionsActiveDispatch, lightboxOptionsActive, shuffleReset, autoplayReset)
                return;
            }
            if (e.keyCode === 37 && lightboxState > 0 && lightboxState !== null){
                setLightboxState((prev) => { return (prev !== null ? prev-1 : prev)});
                resetAutoplayIfTrue(lightboxOptionsActiveDispatch, lightboxOptionsActive, shuffleReset, autoplayReset)
                return;
            }
            if (e.keyCode === 27 && lightboxState !== null && lightboxOptionsActive.fullscreen){
                lightboxOptionsActiveDispatch({type: lightboxReducerCases.fullscreen});
                resetAutoplayIfTrue(lightboxOptionsActiveDispatch, lightboxOptionsActive, shuffleReset, autoplayReset)
                return;
            }
            if (e.keyCode === 27 && lightboxState !== null && !lightboxOptionsActive.fullscreen){
                setLightboxState(null);
                resetAutoplayIfTrue(lightboxOptionsActiveDispatch, lightboxOptionsActive, shuffleReset, autoplayReset)
                return;
            }
        }
    }

    useEventListener("keydown", listener);
}

export const autoplayImages = (lightboxImages: ImagesData,
                               lightboxOptionsActiveDispatch: Dispatch<Action>,
                               setLightboxState: SetLightboxState,
                               lightboxState: LightboxState
                               ): void => {
    if (lightboxImages.length === 1) lightboxOptionsActiveDispatch({type: lightboxReducerCases.autoplayDisable});
    const currentPosition = lightboxState;
    const end = lightboxImages.length-1, beginning = 0;
    currentPosition === end ? setLightboxState(0) : setLightboxState((prev: number | null) => {
        if (prev !== null) return prev+1
        return prev;
    })
}

export const shuffleImages = (lightboxImages: ImagesData,
                              lightboxState: LightboxState,
                              setLightboxState: SetLightboxState,
                              lightboxOptionsActiveDispatch: Dispatch<Action>,
                              getRandomWholeNumber: (num: number, currentNum?: number | null) => number
                              ) => {
    if (lightboxImages.length === 1) lightboxOptionsActiveDispatch({type: lightboxReducerCases.shuffleDisable});
    const currentPosition = lightboxState;
    setLightboxState(getRandomWholeNumber(lightboxImages.length, currentPosition))
}

export function getRandomWholeNumber(num: number,
                                     currentNum: number | null = null
                                     ): number{
    const random = Math.floor(Math.random() * num);
    if (random === currentNum) return getRandomWholeNumber(num, currentNum);
    return random;
}

export function CreateMUITheme(){
    const themeType: string = useSelector((state: RootState) => state.theme.value);

    if (themeType === themeOptions.dark){
        return createTheme({
            palette: {
                primary: {
                    main: '#dddddd',
                    contrastText: '#fff',
                },
                secondary: {
                    main: '#555555',
                    contrastText: '#000',
                },
            },
        });
    } else {
        return createTheme({
            palette: {
                primary: {
                    main: '#333333',
                    contrastText: '#fff',
                },
                secondary: {
                    main: '#bbbbbb',
                    contrastText: '#000',
                },
            },
        });
    }
}


export function CreateFullscreenLightboxElems(lightboxOptionsActive: LightboxOptions,
                                              lightboxOptionsActiveDispatch: Dispatch<Action>,
                                              lightboxState: LightboxState,
                                              lightboxImages: ImagesData,
                                              setLightboxState: SetLightboxState,
                                              imageElements: JSX.Element[] | null,
                                              shuffleReset: Dispatch<SetStateAction<boolean>>,
                                              autoplayReset: Dispatch<SetStateAction<boolean>>,
                                              ): ReactElement{
    const muiTheme = {
        palette: {
            primary: {
                main: '#dddddd',
                contrastText: '#fff',
            },
        }
    }

    const [fullscreenImageIsLoading, setFullscreenImageIsLoading] = useState(true);

    return (
        <>
            <div className={"lightbox__fullscreen" + (lightboxOptionsActive.fullscreen === true ? " active" : "") }
                 onClick={(e) => e.stopPropagation() }
            >
                <div className={"lightbox__fullscreen--image-container"
                    + (lightboxOptionsActive.fullscreen === true ? " active" : "" )}
                     onClick={(e) => {
                         if (lightboxOptionsActive.fullscreen === false) return;
                     }}>
                    {fullscreenImageIsLoading && (
                        <div className={"lightbox__loading-indicator"}>
                            <CircularProgress />
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
                    <div
                        className={"lightbox__fullscreen-image--move-left"}
                        style={((checkSubsequentImageExists(lightboxImages.length, lightboxState, -1))
                            ? {cursor: "pointer"} : {})}
                        onClick={(e) => {
                            setLightboxState((prev: LightboxState) => (prev !== null && prev-1 > -1) ? prev-1 : prev)
                            resetAutoplayIfTrue(lightboxOptionsActiveDispatch, lightboxOptionsActive, shuffleReset,
                                autoplayReset);
                        }} />
                    <div
                        style={((checkSubsequentImageExists(lightboxImages.length, lightboxState, +1))
                            ? {cursor: "pointer"} : {})}
                        className={"lightbox__fullscreen-image--move-right"}
                        onClick={(e) => {
                            setLightboxState((prev: LightboxState) => (prev !== null && Array.isArray(imageElements)
                                && prev+1 <= imageElements?.length-1) ? prev+1 : prev)
                            resetAutoplayIfTrue(lightboxOptionsActiveDispatch, lightboxOptionsActive, shuffleReset,
                                autoplayReset);
                        }} />
                    <div className={"lightbox__fullscreen--top-row"}>
                        <div className={"lightbox__fullscreen--close-button"}
                             onClick={() => {
                                 lightboxOptionsActiveDispatch({type: lightboxReducerCases.fullscreen});
                                 resetAutoplayIfTrue(lightboxOptionsActiveDispatch, lightboxOptionsActive, shuffleReset,
                                     autoplayReset)
                             }}>
                            <ThemeProvider theme={muiTheme}>
                                <CloseIcon
                                    color={"primary"}
                                    style={{fontSize: "200%"}}
                                />
                            </ThemeProvider>
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
                               muiTheme: Theme,
                               shuffleReset: Dispatch<SetStateAction<boolean>>,
                               autoplayReset: Dispatch<SetStateAction<boolean>>,
                               ): ReactElement{

    const [lightboxImageIsLoadingState, setLightboxImageIsLoadingState] = useState(true);
    const standardMargin = {ml: 1};
    const buttonStyleWithCursor = {fontSize: "200%", cursor: "pointer"}

    return (
        <>
            <div className={"lightbox" + (lightboxOptionsActive.curtain && " curtain" || "")}>
                {fullscreenLightboxElems}
                <div className={"lightbox__backdrop"} id={"lightboxArea"}>
                    <div className={"lightbox__top-row"}>
                        <ThemeProvider theme={muiTheme}>
                            <PlayCircleIcon
                                sx={standardMargin}
                                style={(buttonStyleWithCursor)}
                                color={(lightboxOptionsActive.autoplay ? "primary" : "secondary")}
                                onClick={() => {
                                    lightboxOptionsActiveDispatch({type: lightboxReducerCases.autoplay});
                                }}
                            />
                            <ShuffleIcon
                                sx={standardMargin}
                                style={buttonStyleWithCursor}
                                color={(lightboxOptionsActive.shuffle ? "primary" : "secondary")}
                                onClick={() => {
                                    lightboxOptionsActiveDispatch({type: lightboxReducerCases.shuffle});
                                }}
                            />
                            <FullscreenIcon
                                sx={standardMargin}
                                style={buttonStyleWithCursor}
                                color={(lightboxOptionsActive.fullscreen ? "primary" : "secondary")}
                                onClick={() => {
                                    lightboxOptionsActiveDispatch({type: lightboxReducerCases.fullscreen});
                                    resetAutoplayIfTrue(lightboxOptionsActiveDispatch, lightboxOptionsActive,
                                        shuffleReset, autoplayReset)
                                }}
                            />
                            <CurtainsIcon
                                sx={standardMargin}
                                style={buttonStyleWithCursor}
                                color={(lightboxOptionsActive.curtain ? "primary" : "secondary")}
                                onClick={() => {
                                    lightboxOptionsActiveDispatch({type: lightboxReducerCases.curtain});
                                }}
                            />
                            <InfoIcon
                                sx={standardMargin}
                                style={buttonStyleWithCursor}
                                color={(lightboxOptionsActive.tooltip ? "primary" : "secondary")}
                                onClick={() => {
                                    handleLightboxButtons(lightboxOptionsActiveDispatch);
                                }}
                            />
                            <CloseIcon
                                sx={{ml: 4}}
                                style={buttonStyleWithCursor}
                                color={"primary"}
                                onClick={() => {
                                    setLightboxState(null);
                                    resetAutoplayIfTrue(lightboxOptionsActiveDispatch, lightboxOptionsActive,
                                        shuffleReset, autoplayReset)
                                }}
                            />
                        </ThemeProvider>
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

                            <div
                                style={((checkSubsequentImageExists(lightboxImages.length, lightboxState, -1))
                                    ? {cursor: "pointer"} : {})}
                                onClick={(e) => {
                                    setLightboxState((prev: LightboxState) => (prev !== null && prev-1 > -1)
                                        ? prev-1 : prev)
                                    resetAutoplayIfTrue(lightboxOptionsActiveDispatch, lightboxOptionsActive,
                                        shuffleReset, autoplayReset);
                            }}
                                className={"lightbox__image--move-left"}>
                            </div>

                            <div
                                style={((checkSubsequentImageExists(lightboxImages.length, lightboxState, +1))
                                    ? {cursor: "pointer"} : {})}
                                onClick={(e) => {
                                    setLightboxState((prev: LightboxState) => (prev !== null
                                        && Array.isArray(imageElements) && prev+1 <= imageElements?.length-1)
                                        ? prev+1 : prev)
                                    resetAutoplayIfTrue(lightboxOptionsActiveDispatch, lightboxOptionsActive,
                                        shuffleReset, autoplayReset);
                                    shuffleReset(true);
                                }}
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

function resetAutoplayIfTrue(lightboxOptionsActiveDispatch: Dispatch<Action>,
                             lightboxOptionsActive: LightboxOptions,
                             shuffleReset: Dispatch<SetStateAction<boolean>>,
                             autoplayReset: Dispatch<SetStateAction<boolean>>,
                             ): void{
    if (lightboxOptionsActive.autoplay) autoplayReset(true);
    if (lightboxOptionsActive.shuffle) shuffleReset(true);
}

function checkSubsequentImageExists(lightboxImageCount: number,
                                    lightboxState: LightboxState,
                                    direction: number,
                                    ): boolean{
    if (lightboxState === null) return false;
    const range = Array.from({length: lightboxImageCount}, (v, i) => i);
    if (range[lightboxState + direction] !== undefined) return true;
    return false;
}