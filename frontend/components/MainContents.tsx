import Image from "next/image";
import useScreenOrientation, {orientations} from "../hooks/useOrientation";
import {darkTheme, lightTheme} from "../features/theme/themeSlice";
import {AppDispatch} from "../app/store";
import {useDispatch} from "react-redux";
import PhotoLightbox from "./ReactSpringLightbox";
import ImageLightbox from "./ImageLightbox";
import MyImageGallery from "./ImageLightbox";
import {cc} from "../common/variables";
import dynamic from "next/dynamic";

export function GalleryMain(){
    const dispatch: AppDispatch = useDispatch();
    const screenOrientation = useScreenOrientation();

    const photos = [
        {
            src: "http://localhost:3001/temp/162A2061.jpg",
            blurSrc: "http://localhost:3001/leaflet/base64_thumbnails/macro/162A2078.jpg",
            height: 300,
            width: 300,
            blur: true,
        }, {
            src: "http://localhost:3001/temp/162A2061.jpg",
            blurSrc: "http://localhost:3001/leaflet/base64_thumbnails/macro/162A2078.jpg",
            height: 200,
            width: 300,
            blur: true,
        }, {
            src: "http://localhost:3001/temp/162A2061.jpg",
            blurSrc: "http://localhost:3001/leaflet/base64_thumbnails/macro/162A2078.jpg",
            height: 300,
            width: 200,
            blur: true,
        }
    ];

    return (
        <div className={"main-container"}>
            <div className={"main"}>
                <header>
                    <div className={"overlay"}>
                        <MyImageGallery
                            images={photos}
                            containerWidth={"100%"}
                            containerPadding={10}
                            imagePadding={{vertical: 10, horizontal: 10}}
                        />

                        <br/>

                        <h2 className={"title"}>Future is here</h2>
                            {/*<PhotoLightbox/>*/}
                        <button className={"btn"}>Read more</button>
                    </div>
                </header>
            </div>
        </div>
    );
}

