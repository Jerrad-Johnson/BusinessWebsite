import {Dispatch, MutableRefObject, SetStateAction} from "react";

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
    lg_img_url?: string;
    date: string | null;
    lens: string | null;
    camera_model: string | null;
    focal: string | null;
    exposure: string | null;
    iso: string | null;
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
    lg_img_url?: string;
    imgBlurSrc?: string;
    alt?: string;
}

export interface GalleryStylesEssential {
    width: number | string;
    display: "flex";
    flexWrap: "wrap";
    padding: string;
}

export interface LightboxOptions {
    fullScreen: boolean;
    imageData: boolean;
}

export interface Action {
    type: string;
    payload?: any;
}

export type LightboxState = null | number;
export type LightboxEverOpened = boolean;
export type SetLightboxState = Dispatch<SetStateAction<LightboxState>>;
export type GalleryElementRef = MutableRefObject<null | HTMLDivElement>;
export type SetLightboxEverOpened = Dispatch<SetStateAction<boolean>>;