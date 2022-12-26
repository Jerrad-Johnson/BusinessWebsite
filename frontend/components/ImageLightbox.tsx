import {useEffect, useRef, useState} from 'react';
import Image from "next/image";
const layoutGeometry = require('justified-layout');

function MyImageGallery(galleryInput) {
    checkInputForErrors(galleryInput);

    const galleryElementRef = useRef(null);
    const [ imageElements, setImageElements ] = useState(null);

    const galleryInputWithDefaults = addDefaultsToGalleryInput(galleryInput);
    const { containerPadding, containerWidth } = {...galleryInputWithDefaults};
    const njGalleryStyle = createGalleryStyle(containerPadding, containerWidth);

    effectHook(setImageElements, galleryInputWithDefaults, galleryElementRef);

    return (
            <div className={"njGallery"}
                style={njGalleryStyle}
                ref={galleryElementRef}
            >
                {imageElements}
            </div>
    );
}


function createGalleryLayout(galleryInputWithDefaults, galleryElementRef){
    const galleryInputCopy = {...galleryInputWithDefaults}
    const {images, imagePadding} = galleryInputCopy;
    const imageLayout = calculateGalleryLayout(galleryInputCopy, galleryElementRef);
    const reformattedImageData = reformatGalleryData(imageLayout, images);

    return reformattedImageData.map((e, k) => {
        e.height = Math.trunc(+e.boxHeight);
        e.width = Math.trunc(+e.boxWidth);

        return (
            <div
                style={{ "margin": (imagePadding.vertical/2) + "px " + (imagePadding.horizontal/2) + "px " + (imagePadding.vertical/2) + "px " + (imagePadding.horizontal/2) + "px", }}
                key={k}
            >
                <Image
                    src={e.imgSrc}
                    blurDataURL={e.imgBlurSrc}
                    placeholder={e.imgBlurSrc && "blur"}
                    className={"njGalleryImage"}
                    width={e.boxWidth}
                    height={e.boxHeight}
                    alt={e.alt}
                />
            </div>
        );
    });
}

function calculateGalleryLayout(galleryInputCopy, galleryElementRef){
    galleryElementRef = galleryElementRef.current;
    const { images, containerPadding, targetRowHeight, imagePadding, maxRows, showIncompleteRows, targetRowHeightTolerance } = galleryInputCopy;

    const imageDimensions = images.map((e) => {
        return {width: e.width, height: e.height}
    });

    const autoGeneratedWidth = Math.trunc(+galleryElementRef.offsetWidth-2); // -2 because otherwise at some widths, the last image in a row jumps to the next row. Total width might be e.g. 0.42 pixels too large.
    const imageLayout = layoutGeometry(imageDimensions, {
            containerWidth: autoGeneratedWidth,
            targetRowHeight: targetRowHeight || 300,
            containerPadding: containerPadding,
            boxSpacing: imagePadding,
            maxNumRows: maxRows,
            showWidows: showIncompleteRows,
            targetRowHeightTolerance: targetRowHeightTolerance,
        }
    );

    return imageLayout;
}

function reformatGalleryData(imageLayout, images){
    const imagesCopy = [...images];
    let reformattedImageData = [];

    for (let i = 0; i < imageLayout.boxes.length; i++){
        reformattedImageData[i] = {};
        reformattedImageData[i].boxHeight = imageLayout.boxes[i].height;
        reformattedImageData[i].boxWidth = imageLayout.boxes[i].width;
        reformattedImageData[i].imgSrc = imagesCopy[i].src;
        reformattedImageData[i].imgBlurSrc = imagesCopy[i].blurSrc;
        reformattedImageData[i].alt = imagesCopy[i].alt;
    }

    return reformattedImageData;
}

function checkInputForErrors(galleryInput){
    const galleryInputCopy = {...galleryInput}
    const {containerPadding, images, targetRowHeightTolerance} = galleryInputCopy;

    if (!images) throw new Error("You must include images.");
    if (targetRowHeightTolerance && targetRowHeightTolerance > 1 || targetRowHeightTolerance < 0 || typeof targetRowHeightTolerance !== "number") throw new Error("targetRowHeightTolerance must be a number between 0 and 1.");
    for (let entry of images){
        if (!entry.src) throw new Error("Every image must include a source (URL).");
        if (!entry.width) throw new Error("Every image must include a width value.");
        if (!entry.height) throw new Error("Every image must include a height value.");
        if (typeof entry.width !== "number") throw new Error("Image width must be a number, not a string.");
        if (typeof entry.height !== "number") throw new Error("Image height must be a number, not a string.");
    }

    if (containerPadding && containerPadding % 2 !== 0) throw new Error("Padding must be an even number");
}

function addDefaultsToGalleryInput(galleryInput){
    const galleryInputCopy = {...galleryInput}

    return {
        images: galleryInputCopy.images,
        containerPadding: galleryInputCopy.containerPadding || 10,
        containerWidth: galleryInputCopy.containerWidth || "100%",
        targetRowHeight: galleryInputCopy.targetRowHeight || 300,
        justifyFinalRow: galleryInputCopy.justifyFinalRow || false,
        imagePadding: galleryInputCopy.imagePadding || {vertical: 10, horizontal: 10},
        maxRows: galleryInputCopy.maxRows || Number.POSITIVE_INFINITY,
        showIncompleteRows: (galleryInputCopy.showIncompleteRows === false ? false : true),
        targetRowHeightTolerance: galleryInputCopy.targetRowHeightTolerance || 0.25,
    }
}

function effectHook(setGalleryElements, galleryInputWithDefaults, galleryElementRef){
    useEffect(() => {
        setGalleryElements(createGalleryLayout(galleryInputWithDefaults, galleryElementRef));

        window.addEventListener('resize', () => setGalleryElements(createGalleryLayout(galleryInputWithDefaults, galleryElementRef)));
        return () => {
            window.removeEventListener('resize', () => setGalleryElements(createGalleryLayout(galleryInputWithDefaults, galleryElementRef)));
        }
    }, []);
}

function createGalleryStyle(containerPadding, containerWidth){
    return {
        "width": (containerWidth),
        "display": "flex",
        "flexWrap": "wrap",
        "padding": (containerPadding/2) + "px " + (containerPadding/2) + "px " + (containerPadding/2) + "px " + (containerPadding/2) + "px",
    }
}

export default MyImageGallery;