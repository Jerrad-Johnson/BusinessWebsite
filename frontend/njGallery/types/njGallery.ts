export interface GalleryInputs {
    images: ImageArrayFormat[];
    containerWidth?: string | number;
    containerPadding?: number;
    imagePadding?: ImagePaddingDirections;
    targetRowHeight?: number;
    showIncompleteRows?: boolean;
    targetRowHeightTolerance?: number;
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