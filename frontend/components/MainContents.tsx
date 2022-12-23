import Image from "next/image";
import useScreenOrientation, {orientations} from "../hooks/useOrientation";
import {darkTheme, lightTheme} from "../features/theme/themeSlice";
import {AppDispatch} from "../app/store";
import {useDispatch} from "react-redux";
import PhotoLightbox from "./ReactSpringLightbox";
import ImageLightbox from "./ImageLightbox";
import MyImageGallery from "./ImageLightbox";
import {cc} from "../common/variables";

export function GalleryMain(){
    const dispatch: AppDispatch = useDispatch();
    const screenOrientation = useScreenOrientation();

    return (
        <div className={"main-container"}>
            <div className={"main"}>
                <header>
                    <div className={"overlay"}>
                        <MyImageGallery
                            containerWidth={"60%"}
                            containerPadding={0}
                            imagePadding={{vertical: 10, horizontal: 10}}
                        />

                            <h2 className={"title"}>Future is here</h2>
                                {/*<PhotoLightbox/>*/}
                            <button className={"btn"}>Read more</button>
                    </div>
                </header>
            </div>
        </div>
    );
}

