import {GalleryInputs} from "../types/njGallery";

//TODO   Checking for   justifyFinalRow?: boolean;
//     maxRows?: number;

export function checkInputForErrors(galleryInput: GalleryInputs){
    const galleryInputCopy = {...galleryInput}
    const {images, containerPadding, imagePadding, targetRowHeight, targetRowHeightTolerance, showIncompleteRows } = galleryInputCopy;

    if (!images) throw new Error("You must include images.");
    for (let entry of images){
        if (!entry.src) throw new Error("Every image must include a source (URL).");
        if (!entry.width) throw new Error("Every image must include a width value.");
        if (!entry.height) throw new Error("Every image must include a height value.");
        if (typeof entry.width !== "number") throw new Error("Image width must be a number, not a string.");
        if (typeof entry.height !== "number") throw new Error("Image height must be a number, not a string.");
    }

    if (targetRowHeightTolerance !== undefined && (targetRowHeightTolerance > 1 || targetRowHeightTolerance < 0 || typeof targetRowHeightTolerance !== "number")) throw new Error("targetRowHeightTolerance must be a number between 0 and 1.");
    if (containerPadding && containerPadding % 2 !== 0) throw new Error("Container padding must be an even number.");
    if (targetRowHeight && typeof targetRowHeight !== "number") throw new Error("Target row height must be a number.");
    if (targetRowHeight && typeof targetRowHeight === "number" && targetRowHeight < 10) throw new Error("Target row height must be a positive number, and greater than 10.");
    if (showIncompleteRows && typeof showIncompleteRows !== "boolean") throw new Error("Show Incomplete Rows must be boolean (true or false)");

    checkPaddingsForErrors(containerPadding, "Container");
    checkPaddingsForErrors(imagePadding?.vertical, "Image vertical");
    checkPaddingsForErrors(imagePadding?.horizontal, "Image horizontal");

    function checkPaddingsForErrors(element: string | number | undefined, elementName: string){
        if (element && typeof element !== "number") throw new Error(`${elementName} padding must be a number.`);
        if (element && typeof element === "number" && element < 0) throw new Error(`${elementName} padding must be a positive number.`);
    }
}