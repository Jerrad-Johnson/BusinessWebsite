import Image from "next/image";
import {
    GalleryElementRef,
    GalleryInputsWithDefaults,
    GalleryLayoutData,
    ImageArrayData, ReformattedGalleryLayout
} from "../types/njGallery";
import {Dispatch, ReactElement, SetStateAction} from "react";
import {cc} from "../../common/variables";
import gallery from "../../pages/gallery";
const layoutGeometry = require('../justified-layout');
import {handleLightbox} from "../NjGallery";

function createGalleryLayout(galleryInputsWithDefaults: GalleryInputsWithDefaults, galleryElementRef: GalleryElementRef, setLightboxState: Dispatch<SetStateAction<number | null>>, setLightboxEverOpened: Dispatch<SetStateAction<boolean>>): ReactElement[]{
    const galleryInputsWithDefaultsCopy: GalleryInputsWithDefaults = {...galleryInputsWithDefaults}
    const {images, imagePadding} = galleryInputsWithDefaultsCopy; //@ts-ignore
    const galleryLayout = calculateGalleryLayout(galleryInputsWithDefaultsCopy, galleryElementRef);
    const reformattedGalleryLayout = reformatGalleryData(galleryLayout, images);

    return reformattedGalleryLayout.map((e) => {
        const boxHeight = Math.trunc(+e.boxHeight);
        const boxWidth = Math.trunc(+e.boxWidth);
        const imgBlurSrc = e.imgBlurSrc ? "blur" : undefined;
        let ratio = +(e.boxHeight / e.boxWidth).toFixed(3);

        return (
            <div
                style={{ "margin": (imagePadding.vertical/2) + "px " + (imagePadding.horizontal/2) + "px " + (imagePadding.vertical/2) + "px " + (imagePadding.horizontal/2) + "px", }}
                key={e.imgSrc}
            >
                <Image
                    key={e.imgSrc}
                    src={e.imgSrc}
                    onClick={((event) => {
                        event.stopPropagation();
                        handleLightbox(event, galleryInputsWithDefaults, setLightboxState, setLightboxEverOpened);
                    })}
                    data-ratio={ratio}
                    data-largeimg={e.lg_img_url}
                    blurDataURL={e.imgBlurSrc}
                    placeholder={imgBlurSrc}
                    className={"njGalleryImage"}
                    width={boxWidth}
                    height={boxHeight}
                    alt={e.alt}
                />
            </div>
        );
    });
}

function calculateGalleryLayout(galleryInputsWithDefaultsCopy: GalleryInputsWithDefaults, galleryElementRef: GalleryElementRef): GalleryLayoutData{
    const {images, containerPadding, targetRowHeight, imagePadding, maxRows, showIncompleteRows, targetRowHeightTolerance} = galleryInputsWithDefaultsCopy;
    const imagesDimensions = images.map((e) => { return {width: e.width, height: e.height} });
    let galleryContainerWidth = galleryElementRef?.current?.offsetWidth ? galleryElementRef?.current?.offsetWidth-4 : 14; // -4 because otherwise at some widths, the last image in a row jumps to the next row. Total width might be e.g. 0.42 pixels too large.
    if ((galleryContainerWidth - containerPadding) < 14) galleryContainerWidth = 14 + containerPadding;
    const galleryContainerCalculatedWidth = Math.trunc(galleryContainerWidth);

    return layoutGeometry(imagesDimensions, {
            containerWidth: galleryContainerCalculatedWidth,
            targetRowHeight: targetRowHeight || 300,
            containerPadding: containerPadding,
            boxSpacing: imagePadding,
            maxNumRows: maxRows,
            showWidows: showIncompleteRows,
            targetRowHeightTolerance: targetRowHeightTolerance,
            edgeCaseMinRowHeight: 80,
        }
    );
}

function reformatGalleryData(galleryLayout: GalleryLayoutData, images: ImageArrayData[]): ReformattedGalleryLayout[] | []{
    const imagesCopy = [...images];
    let reformattedGalleryLayout = [];

    for (let i = 0; i < galleryLayout.boxes.length; i++){
        reformattedGalleryLayout[i] = {} as ReformattedGalleryLayout;
        reformattedGalleryLayout[i].boxHeight = galleryLayout.boxes[i].height;
        reformattedGalleryLayout[i].boxWidth = galleryLayout.boxes[i].width;
        reformattedGalleryLayout[i].imgSrc = imagesCopy[i].src;
        reformattedGalleryLayout[i].imgBlurSrc = imagesCopy[i].blurSrc;
        reformattedGalleryLayout[i].alt = imagesCopy[i].alt;
        reformattedGalleryLayout[i].lg_img_url = imagesCopy[i].lg_img_url;
    }

    return reformattedGalleryLayout;
}

export default createGalleryLayout;
