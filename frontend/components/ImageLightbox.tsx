import React, { Component } from 'react';
import {cc} from "../common/variables";
var layoutGeometry = require('justified-layout');





function MyImageGallery() {

    const result = layoutGeometry([1, 2, 1.2, 0.8]);
    cc(result)
    const gallery = result.boxes.map((e) => {
        cc(e);
    })
    return (
        <>

        </>
    );
}

export default MyImageGallery;
