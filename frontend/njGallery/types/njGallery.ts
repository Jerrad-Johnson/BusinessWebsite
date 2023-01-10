import {MutableRefObject} from "react";

export interface GalleryInputs {
    images: ImageArrayData[];
    containerWidth?: string | number;
    containerPadding?: number;
    imagePadding?: ImagePaddingDirections;
    targetRowHeight?: number;
    showIncompleteRows?: boolean;
    targetRowHeightTolerance?: number;
    justifyFinalRow?: boolean;
    maxRows?: number;
}

export interface GalleryInputsWithDefaults {
    images: ImageArrayData[];
    containerWidth: string | number;
    containerPadding: number;
    imagePadding: ImagePaddingDirections;
    targetRowHeight: number;
    showIncompleteRows: boolean;
    targetRowHeightTolerance: number;
    justifyFinalRow: boolean;
    maxRows: number;
}

type ImagePaddingDirections = {
    vertical: number;
    horizontal: number;
}

export interface ImageArrayData {
    src: string;
    blurSrc?: string;
    height: number;
    width: number;
    alt?: string;
}

export interface GalleryLayoutData {
    boxes: {
        aspectRatio: number;
        top: number;
        width: number;
        height: number;
        left: number;
    }[];
    containerHeight: number;
    widowCount: number;
}

export interface ReformattedGalleryLayout {
    boxHeight: number;
    boxWidth: number;
    imgSrc: string;
    imgBlurSrc?: string;
    alt?: string;
}

export interface GalleryStylesEssential {
    width: number | string;
    display: "flex";
    flexWrap: "wrap";
    padding: string;
}

export type GalleryElementRef = MutableRefObject<null | HTMLDivElement>;