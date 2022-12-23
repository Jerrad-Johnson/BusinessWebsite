import React, {Component, useEffect, useState} from 'react';
import {cc} from "../common/variables";
import produce from "immer";
var layoutGeometry = require('justified-layout');


function MyImageGallery(inputs) {
    const delinkedInputsForErrorChecker = delinkObject(inputs);
    handleErrorChecking(delinkedInputsForErrorChecker);

    const [galleryElements, setGalleryElements] = useState((<></>));

    const delinkedInputs = delinkObject(inputs);
    const padding = delinkedInputs.padding || 10;
    const userDefinedContainerWidth = delinkedInputs.containerWidth || undefined;
    const userDefinedTargetRowHeight = delinkedInputs.containerWidth || undefined;
    const justifyFinalRow = delinkedInputs.justifyFinalRow || undefined;

    const calculatorInputs = {
        padding,
        userDefinedContainerWidth,
        userDefinedTargetRowHeight,
        justifyFinalRow,
    }

    if (typeof document !== "undefined") {
        useEffect(() => {
            setGalleryElements(calculateGalleryLayout(calculatorInputs));
            window.addEventListener('resize', () => setGalleryElements(calculateGalleryLayout(calculatorInputs)));
            return () => {
                window.removeEventListener('resize', () => setGalleryElements(calculateGalleryLayout(calculatorInputs)));
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
                "padding": (padding/2) + "px " + (padding/2) + "px " + (padding/2) + "px " + (padding/2) + "px",
            }}>
                {galleryElements}
            </div>
        </>
    );
}








function calculateGalleryLayout(calculatorInputs){
    const delinkCalculatorInputs = delinkObject(calculatorInputs)

    const {padding, userDefinedContainerWidth, userDefinedTargetRowHeight} = delinkCalculatorInputs;
    const galleryContainer = document.querySelector(".testingGallery");
    const autoGeneratedWidth = galleryContainer.offsetWidth;
    const imageLayout = layoutGeometry(
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

    return imageLayout.boxes.map((e, k) => {
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

function delinkObject(data){
    return JSON.parse(JSON.stringify(data));
}

export default MyImageGallery;
