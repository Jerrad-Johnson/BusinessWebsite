import Image from "next/image";
import useScreenOrientation, {orientations} from "../hooks/useOrientation";
import {darkTheme, lightTheme} from "../features/theme/themeSlice";
import {AppDispatch} from "../app/store";
import {useDispatch} from "react-redux";
import {cc} from "../common/variables";
import dynamic from "next/dynamic";
import NjGallery from "../njGallery/NjGallery";
import {GalleryInputs, ImageArrayData} from "../njGallery/types/njGallery";

export function GalleryMain(){
    const dispatch: AppDispatch = useDispatch();
    const screenOrientation = useScreenOrientation();

    const photos: ImageArrayData[] = [
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
    ];

    const galleryInputs: GalleryInputs = {
        images: photos, // If you're loading the images from a backend, just pass an empty array until the data is retrieved.
        containerWidth: "100%",
        containerPadding: 10,
        imagePadding: {vertical: 10, horizontal: 10},
        targetRowHeight: 300,
        showIncompleteRows: false,
        targetRowHeightTolerance: .2,
        maxRows: 1,
    }

    return (
        <div className={"main-container"}>
            <div className={"main"}>
                <header>
                    {/*<Image src={(screenOrientation === orientations.landscape ? '/backgrounds/hp.jpg' : '/backgrounds/mw.jpg')} layout={'fill'} objectFit={'cover'}
                           objectPosition={'center'}/> Replace with a good image*/}
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

