import Image from "next/image";
import useScreenOrientation, {orientations} from "../hooks/useOrientation";
import {darkTheme, lightTheme} from "../features/theme/themeSlice";
import {AppDispatch} from "../app/store";
import {useDispatch} from "react-redux";
import PhotoLightbox from "./ReactSpringLightbox";
import ImageLightbox from "./ImageLightbox";

export function GalleryMain(){
    const dispatch: AppDispatch = useDispatch();
    const screenOrientation = useScreenOrientation();

    return (
        <div className={"main-container"}>
            <div className={"main"}>
                <header>
                    <Image src={(screenOrientation === orientations.landscape ? '/backgrounds/hp.jpg' : '/backgrounds/mw.jpg')} layout={'fill'} objectFit={'cover'}
                           objectPosition={'center'}/>
                    <div className={"overlay"}>
                        <div className={"inner"}>
                            <h2 className={"title"}>Future is here</h2>
                            <p>
                                <ImageLightbox/>
                                {/*<PhotoLightbox/>*/}
                            </p>
                            <button className={"btn"}>Read more</button>
                        </div>
                    </div>
                </header>
            </div>
        </div>
    );
}

