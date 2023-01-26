import Image from "next/image";
import {orientations} from "../hooks/useOrientation";
import {darkTheme, lightTheme} from "../features/theme/themeSlice";
import {cc, isLoading} from "../common/variables";
import NjGallery from "../njGallery/NjGallery";
import {GalleryInputs, ImageArrayData} from "../njGallery/types/njGallery";
import styles from "../styles/Index.module.css";
import {OrientationOptions} from "../types/layout";
import httpClient from "../common/httpClient";
import {useEffect, useState} from "react";
import {images} from "next/dist/build/webpack/config/blocks/images";
import {CircularProgress} from "@mui/material";

export function GalleryMain({isUserMobile, width, dispatch, screenOrientation}:
                            {isUserMobile: boolean, width: number, dispatch, screenOrientation: OrientationOptions}){

    const [photos, setPhotos]: ImageArrayData[] = useState([]);
    const [galleryFolders, setGalleryFolders] = useState(isLoading);

    useEffect(() => {
        getGalleryFolderNames(setGalleryFolders, setPhotos);
        //handleGalleryImages(setPhotos);
    }, []);

    const galleryInputs: GalleryInputs = {
        images: photos,
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
                           objectPosition={'center'} alt={'Cover Portrait'}/>
                    <div className={"overlay"}>
                        <div className={"main-container-content"}>
                            <div className={"main-container-headline"}>Gallery</div>
                            <hr/>
                            {galleryFolders === isLoading ? <CircularProgress/> : galleryFolders }
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

export function GalleryMapMain({isUserMobile, width, dispatch, screenOrientation, MapWithNoSSR}){
    return (
        <div className={"main-container"}>
            <div className={"main" + (isUserMobile === true ? " mobile" : "") + (width < 920 ? " narrow" : "")}>
                <header>
                    <Image src={(screenOrientation === orientations.landscape ? '/backgrounds/hp.jpg' : '/backgrounds/mw.jpg')} layout={'fill'} objectFit={'cover'}
                           objectPosition={'center'} alt={'Cover Portrait'}/>
                    <div className={"overlay"}>
                        <div className={"main-container-content"}>
                            <div id={"map"} className={"height: 100px;"}>
                                <MapWithNoSSR />
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        </div>
    );
}

async function handleGalleryImages(setPhotos, folder): Promise<void>{
    const results = await httpClient.post("http://localhost:3001/gallery/getThisFolder", {gallerySize: "lg", galleryName: folder});
    if (results?.data?.error === true || results.data === undefined) return;
    let imageData = results.data.data;
    if (imageData.length < 0) return;

    let formattedImageData = [];
    for (let image of imageData){
        formattedImageData.push({src: image.url, height: +image.height, width: +image.width, blurSrc: image.base64url, alt: image["alt_text"]})
    }

    setPhotos(formattedImageData);
}

async function getGalleryFolderNames(setGalleryFolders, setPhotos){
    const folders = await httpClient.get(`${process.env.SERVERURL}/gallery/getGalleryFolders`)
    const elements = folders.data.data.map((elem) => {
      return (
          <span key={elem.folder} onClick={(event) => {
            handleFolderChange(elem.folder, setPhotos);
          }}>{elem.folder}</span>
      );
    });

    setGalleryFolders(elements);
}

function handleFolderChange(folder, setPhotos){
    handleGalleryImages(setPhotos, folder);
}










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

