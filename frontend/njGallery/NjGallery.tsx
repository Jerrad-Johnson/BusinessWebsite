import {cc} from "../common/variables";
import {useReducer, useRef, useState} from 'react';
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
} from "./types/njGallery";
import {useWindowDimensions} from "../hooks/useWindowDimensions";
import {initialShowGalleryData} from "./utils/variables";
import {lightboxOptionsActiveReducer} from "./utils/reducers";
import useInterval from "./hooks/useInterval";
import {changeLightboxImagesDateFormat,
    LightboxCloseOnClickOutsideElem,
    calculateImageSpecsForLightbox,
    HideNavbarWhenLightboxOpen,
    OnMount,
    OnPropsChange,
    createTooltipsElems,
    shuffleImages,
    getRandomWholeNumber,
    autoplayImages,
    CreateMUITheme,
    LightboxKeyPressHandler,
    CreateFullscreenLightboxElems,
    CreateLightbox
} from "./utils/lightbox";

/*TODO
   Make it possible to pass-in data for tooltips.
   Add zoom to full size image.
   Add portrait-landscape button, which will remove all non-landscape or non-portrait images from the gallery.
   Major Bug: When mobile users stretch the screen e.g. via reaching the end and continuing, all gallery images disappear. ... May be resolved, untested.
   Add conditional cursor rendering to image-next/last.
   Add shuffle and autoplay reset on keypress.
   Replace CircularProgress in order to remove React c.log errors.
 */

function NjGallery(props: GalleryInputs) {
    checkInputForErrors(props);

    const galleryElemRef: GalleryElemRef = useRef(null);
    const [imageElems, setImageElems] = useState<JSX.Element[] | null>(null);
    const [lightboxState, setLightboxState] = useState<number | null>(null);
    const [lightboxEverOpened, setLightboxEverOpened] = useState(false);
    const [lightboxOptionsActive, lightboxOptionsActiveDispatch] = useReducer(lightboxOptionsActiveReducer, initialShowGalleryData);

    const [shuffleReset] = useInterval(() => {
        shuffleImages(lightboxImages, lightboxState, setLightboxState, lightboxOptionsActiveDispatch, getRandomWholeNumber)
    }, lightboxState !== null && lightboxOptionsActive.shuffle ? 3000 : null);
    const [autoplayReset] = useInterval(() => {
        autoplayImages(lightboxImages, lightboxOptionsActiveDispatch, setLightboxState, lightboxState)
    }, lightboxState !== null && lightboxOptionsActive.autoplay ? 3000 : null);

    const galleryInputsWithDefaults: GalleryInputsWithDefaults = addGalleryDefaults(props); // TODO Design script to add original URL if large-img URL is not provided.
    const {containerPadding, containerWidth} = {...galleryInputsWithDefaults};
    const galleryCSS: GalleryStylesEssential = createGalleryStyle(containerPadding, containerWidth);
    useResizeHook(setImageElems, galleryInputsWithDefaults, galleryElemRef, setLightboxState, setLightboxEverOpened);

    OnMount(lightboxOptionsActiveDispatch);
    OnPropsChange(props, galleryInputsWithDefaults, galleryElemRef, setLightboxState, setLightboxEverOpened, setImageElems, lightboxOptionsActiveDispatch);
    HideNavbarWhenLightboxOpen(lightboxState);
    LightboxCloseOnClickOutsideElem(lightboxState, setLightboxState, lightboxOptionsActive, lightboxEverOpened, lightboxOptionsActiveDispatch);

    const [windowHeight, windowWidth] = useWindowDimensions();
    const lightboxImages: ImageData[] = changeLightboxImagesDateFormat(galleryInputsWithDefaults.images);
    const lightboxDimensionsCSS = calculateImageSpecsForLightbox(lightboxState, lightboxImages, windowHeight, windowWidth);
    const muiTheme = CreateMUITheme();
    LightboxKeyPressHandler(lightboxImages, lightboxState, setLightboxState, lightboxOptionsActive, lightboxOptionsActiveDispatch);
    const tooltipsElems = createTooltipsElems(lightboxState, lightboxImages, windowWidth);
    const fullscreenLightboxElems = CreateFullscreenLightboxElems(lightboxOptionsActive, lightboxOptionsActiveDispatch,
        lightboxState, lightboxImages, setLightboxState, imageElems, shuffleReset, autoplayReset);
    const lightboxElems = CreateLightbox(lightboxOptionsActiveDispatch, setLightboxState, lightboxImages, lightboxDimensionsCSS,
        lightboxState, lightboxOptionsActive, tooltipsElems, fullscreenLightboxElems, imageElems, muiTheme, shuffleReset, autoplayReset);

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

export default NjGallery;