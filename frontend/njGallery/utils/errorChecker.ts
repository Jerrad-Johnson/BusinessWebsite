import {GalleryInputs} from "../types/njGallery";

export function checkInputForErrors(galleryInputsFromUser: GalleryInputs): void{
    const {images, containerPadding, imagePadding, targetRowHeight, targetRowHeightTolerance,
        showIncompleteRows, maxRows } = {...galleryInputsFromUser};

    if (!images) throw new Error("You must include images.");
    for (let image of images){
        if (!image.src) throw new Error("Every image must include a source (URL).");
        if (!image.width) throw new Error("Every image must include a width value.");
        if (!image.height) throw new Error("Every image must include a height value.");
        if (typeof image.width !== "number") throw new Error("Image width must be a number, not a string.");
        if (typeof image.height !== "number") throw new Error("Image height must be a number, not a string.");
        if (image.blurSrc === "") throw new Error("Blur src must not be an empty string. Provide a URL, or leave it undefined.");
    }

    if (targetRowHeightTolerance !== undefined && (targetRowHeightTolerance > 1 || targetRowHeightTolerance < 0 || typeof targetRowHeightTolerance !== "number")) throw new Error("targetRowHeightTolerance must be a number between 0 and 1.");
    if (containerPadding && containerPadding % 2 !== 0) throw new Error("Container Padding must be an even number.");
    if (targetRowHeight && typeof targetRowHeight !== "number") throw new Error("Target Row Height must be a number.");
    if (targetRowHeight && targetRowHeight < 10) throw new Error("Target Row Height must be a positive number, and greater than 10.");
    if (showIncompleteRows && typeof showIncompleteRows !== "boolean") throw new Error("Show Incomplete Rows must be boolean (true or false)");
    if (maxRows && typeof maxRows !== "number") throw new Error("Max rows must be a number");
    if (maxRows && maxRows < 1) throw new Error("Max rows must be 1 or greater.");


    checkPaddingsForErrors(containerPadding, "Container");
    checkPaddingsForErrors(imagePadding?.vertical, "Image vertical");
    checkPaddingsForErrors(imagePadding?.horizontal, "Image horizontal");

    function checkPaddingsForErrors(element: string | number | undefined, elementName: string){
        if (element && typeof element !== "number") throw new Error(`${elementName} padding must be a number.`);
        if (element && typeof element === "number" && element < 0) throw new Error(`${elementName} padding must be a positive number.`);
    }

    checkForDecimals(maxRows, "Max Rows");
    checkForDecimals(targetRowHeight, "Target row height");
    checkForDecimals(imagePadding?.vertical, "Vertical image padding");
    checkForDecimals(imagePadding?.horizontal, "Horizontal image padding");

    function checkForDecimals(element: string | number | undefined, elementName: string){
        if (element && typeof element === "number" && element % 1 !== 0) throw new Error(`${elementName} must not contain decimals.`);
    }
}