export function addDefaultsToGalleryInput(galleryInput){
    const galleryInputCopy = {...galleryInput}
    const defaults = {
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

    return Object.assign(galleryInputCopy, defaults);
}


export function createGalleryStyle(containerPadding, containerWidth){
    return {
        "width": (containerWidth),
        "display": "flex",
        "flexWrap": "wrap",
        "padding": (containerPadding/2) + "px " + (containerPadding/2) + "px " + (containerPadding/2) + "px " + (containerPadding/2) + "px",
    }
}