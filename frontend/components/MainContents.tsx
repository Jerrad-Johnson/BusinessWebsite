import Image from "next/image";
import {orientations} from "../hooks/useOrientation";
import {darkTheme, lightTheme} from "../features/theme/themeSlice";
import {cc} from "../common/variables";
import NjGallery from "../njGallery/NjGallery";
import {GalleryInputs, ImageArrayData} from "../njGallery/types/njGallery";
import styles from "../styles/Index.module.css";
import {OrientationOptions} from "../types/layout";
import httpClient from "../common/httpClient";
import {useEffect, useState} from "react";
import {images} from "next/dist/build/webpack/config/blocks/images";

export function GalleryMain({isUserMobile, width, dispatch, screenOrientation}:
                            {isUserMobile: boolean, width: number, dispatch, screenOrientation: OrientationOptions}){

    const [photos, setPhotos]: ImageArrayData[] = useState([]);

    useEffect(() => {
        handleGalleryImages(setPhotos);
    }, []);



    /*[
        {
            src: "http://localhost:3001/temp/162A2061.jpg",
            blurSrc: "http://localhost:3001/leaflet/base64_thumbnails/macro/162A2078.jpg",
            height: 300,
            width: 300,
            alt: "Butterfly!",
        }, {
            src: "http://localhost:3001/temp/162A2061.jpg",
            blurSrc: "http://localhost:3001/leaflet/base64_thumbnails/macro/162A2078.jpg",
            height: 200,
            width: 300,
        }, {
            src: "http://localhost:3001/temp/162A2061.jpg",
            blurSrc: "http://localhost:3001/leaflet/base64_thumbnails/macro/162A2078.jpg",
            height: 300,
            width: 200,
        }
    ];*/

    const galleryInputs: GalleryInputs = {
        images: photos, // If you're loading the images from a backend, just pass an empty array until the data is retrieved.
        containerWidth: "100%",
        containerPadding: 10,
        imagePadding: {vertical: 10, horizontal: 10},
        targetRowHeight: 300,
        showIncompleteRows: true,
        targetRowHeightTolerance: .2,
    }

    return (
        <div className={"main-container"}>
            <div className={"main" + (isUserMobile === true ? " mobile" : "") + (width < 920 ? " narrow" : "")}>
                <header>
                    <Image src={(screenOrientation === orientations.landscape ? '/backgrounds/hp.jpg' : '/backgrounds/mw.jpg')} layout={'fill'} objectFit={'cover'}
                           objectPosition={'center'}/>
                    <div className={"overlay"}>
                        <div className={"main-container-content"}>
                            <div className={"main-container-headline"}>Gallery</div>
                            <hr/>
                            <NjGallery
                                {...galleryInputs}
                            />
                            lorem <br />
                        </div>
                    </div>
                </header>
            </div>
        </div>
    );
}

export function IndexMain({isUserMobile, width, dispatch, screenOrientation}:
                          {isUserMobile: boolean, width: number, dispatch, screenOrientation: OrientationOptions}){
    return(
        <div className={"main-container"}>
            <div className={"main" + (isUserMobile === true ? " mobile" : "") + (width < 920 ? " narrow" : "")}>
                <header>
                    <Image src={(screenOrientation === orientations.landscape ? '/backgrounds/hp.jpg' : '/backgrounds/mw.jpg')} layout={'fill'} objectFit={'cover'}
                           objectPosition={'center'}/>
                    <div className={styles.overlay + " homeOverlay"}>
                        <div className={styles.inner}>
                            <h2 className={"title"}>Future is here</h2>
                            <p>
                                <button onClick={() => { dispatch(lightTheme()); }}>Light </button>
                                <button onClick={() => { dispatch(darkTheme()); }}>Dark </button>
                            </p>
                            <button className={"btn"}>Read more</button>
                        </div>
                    </div>
                </header>
            </div>
        </div>
    );
}

async function handleGalleryImages(setPhotos): Promise<void>{
    const results = await httpClient.post("http://localhost:3001/gallery/getThisFolder", {gallerySize: "sm", galleryName: "macro"});
    if (results?.data?.error !== false) return;
    let imageData = results.data.data;
    let formattedImageData = [];

    if (imageData.length < 0) return;
    for (let image of imageData){
        formattedImageData.push({src: image.url, height: +image.height, width: +image.width, blurSrc: image.base64url, alt: image["alt_text"]})
    }

    cc(imageData)

    setPhotos(formattedImageData);
}