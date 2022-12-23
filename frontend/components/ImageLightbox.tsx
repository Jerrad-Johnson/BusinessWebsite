import React, {Component, useEffect, useState} from 'react';
import {cc} from "../common/variables";
var layoutGeometry = require('justified-layout');


function MyImageGallery(inputs) {
    handleErrorChecking(inputs);

    const padding = inputs.padding | 10;
    const userDefinedContainerWidth = inputs.userDefinedContainerWidth | undefined;
    const userDefinedTargetRowHeight = inputs.userDefinedTargetRowHeight | undefined;

    const [galleryElements, setGalleryElements] = useState((<></>));

    const itemsToPassToCalculator = {
        setGalleryElements,
        padding,
        userDefinedContainerWidth,
        userDefinedTargetRowHeight
    }

    if (typeof document !== "undefined") {

        useEffect(() => {
            setGalleryElements(calculateGalleryLayout(itemsToPassToCalculator));
            window.addEventListener('resize', () => setGalleryElements(calculateGalleryLayout(itemsToPassToCalculator)));
            return () => {
                window.removeEventListener('resize', () => setGalleryElements(calculateGalleryLayout(itemsToPassToCalculator)));
            }
        }, []);
    }

    return (
        <>
            <div className={"testingGallery"} style={{
                "paddingTop": (padding / 2),
                "paddingBottom": (padding /2),
                "width": "100%",
                "display": "flex",
                "flex-wrap": "wrap",
                "padding": "5px 5px 5px 5px",
            }}>
                {galleryElements}
            </div>
        </>
    );
}








function calculateGalleryLayout(items){
    const {setGalleryElements, padding, userDefinedContainerWidth, userDefinedTargetRowHeight} = items;
    const galleryContainer = document.querySelector(".testingGallery");
    const autoGeneratedWidth = galleryContainer.offsetWidth;
    const result = layoutGeometry(
        [
            {width: 200, height: 300},
            {width: 150, height: 300},
            {width: 300, height: 300},
            {width: 250, height: 250},
        ], {
            containerWidth: userDefinedContainerWidth | autoGeneratedWidth,
            targetRowHeight: userDefinedTargetRowHeight | 200,
        }
    );

    return result.boxes.map((e, k) => {
        e.height = Math.trunc(+e.height);
        e.width = Math.trunc(+e.width);

        return (
            <img
                style={{
                    "height": e.height,
                    "width": e.width,
                    "margin": (padding/2) + "px " + (padding/2) + "px " + (padding/2) + "px " + (padding/2) + "px",
                }}
                src={"http://localhost:3001/leaflet/thumbnails/macro/162A2078.jpg"}
                key={k}
                className={"njGalleryImage"}
            >

            </img>
        );
    });
}

function handleErrorChecking(inputs){
    const {padding} = inputs;

    if (padding && padding % 2 !== 0) throw new Error("Padding must be an even number");

}

export default MyImageGallery;
