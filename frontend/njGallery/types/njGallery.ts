import {Property} from "csstype";
import FlexWrap = Property.FlexWrap;
import {MutableRefObject, ReactElement} from "react";

export interface GalleryInputs {
    images: ImageArrayFormat[];
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
    images: ImageArrayFormat[];
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

export type ImageArrayFormat = {
    src: string;
    blurSrc?: string;
    height: number;
    width: number;
    alt?: string;
}

export interface GalleryBaseStyles {
    width: number | string;
    display: "flex";
    flexWrap: "wrap";
    padding: string;
}

export type GalleryInputRef = MutableRefObject<null | HTMLDivElement>;