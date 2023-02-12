import Image from "next/image";
import {orientations} from "../hooks/useOrientation";
import ThemeSlice, {darkTheme, lightTheme} from "../features/theme/themeSlice";
import {cc, isLoading, lipsum} from "../common/variables";
import NjGallery from "../njGallery/NjGallery";
import {GalleryInputs, ImageArrayData} from "../njGallery/types/njGallery";
import indexStyles from "../styles/Index.module.css";
import {OrientationOptions} from "../types/layout";
import httpClient from "../common/httpClient";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {images} from "next/dist/build/webpack/config/blocks/images";
import {CircularProgress, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {GalleryFolderSpans, IsLoading} from "../common/types";

export function GalleryMain({isUserMobile, width, screenOrientation}:
                            {isUserMobile: boolean, width: number, screenOrientation: OrientationOptions}){

    const [photos, setPhotos] = useState<ImageArrayData[]>([]);
    const [galleryFolders, setGalleryFolders] = useState<IsLoading | GalleryFolderSpans[]>(isLoading);

    useEffect(() => {
        if (galleryFolders === isLoading) return;
        if (!("key" in galleryFolders[0])) return;
        handleGalleryImages(setPhotos, galleryFolders[0].key);
    }, [galleryFolders]);

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
            <div className={"main" + (isUserMobile === true ? " mobile" : "") + (width < 920 ? " narrow" : "")}>
                <header>
                    <Image src={(screenOrientation === orientations.landscape ? '/backgrounds/hp.jpg' : '/backgrounds/mw.jpg')} layout={'fill'} objectFit={'cover'}
                           objectPosition={'center'} alt={'Cover Portrait'}/>
                    <div className={"main__overlay"}>
                        <div className={"main__content"}>
                            <div className={"main__content--headline"}>Gallery</div>
                            <hr/>
                            {galleryFolders === isLoading ? <CircularProgress/> : galleryFolders }
                            <hr/>
                            <NjGallery
                                {...galleryInputs}
                            />

                            {lipsum}
                            <br />
                            <br />

                            {lipsum}
                            <br />
                            <br />

                            {lipsum}
                            <br />
                            <br />

                            {lipsum}
                            <br />
                            <br />

                            {lipsum}
                            <br />
                            <br />

                            {lipsum}
                            <br />
                            <br />

                            {lipsum}
                            <br />
                            <br />

                            {lipsum}
                            <br />
                            <br />

                            {lipsum}
                            <br />
                            <br />
                        </div>
                    </div>
                </header>
            </div>
    );
}

export function IndexMain({isUserMobile, width, screenOrientation}:
                          {isUserMobile: boolean, width: number, screenOrientation: OrientationOptions}){
    return(
        <div className={"main-container"}>
            <div className={"main" + (isUserMobile === true ? " mobile" : "") + (width < 920 ? " narrow" : "")}>
                <header>
                    <Image src={(screenOrientation === orientations.landscape ? '/backgrounds/hp.jpg' : '/backgrounds/mw.jpg')} layout={'fill'} objectFit={'cover'}
                           objectPosition={'center'}/>
                    <div className={indexStyles.overlay + " homeOverlay"}>
                        <div className={indexStyles.inner}>
                            {/*<h2 className={"title"}>Promo video to come</h2>*/}
                            {/*<button className={"btn"}>Read more</button>*/}
                        </div>
                    </div>
                </header>
            </div>
        </div>
    );
}

export function GalleryMapMain({isUserMobile, width, screenOrientation, MapWithNoSSR}:
                               {isUserMobile: boolean, width: number, screenOrientation: OrientationOptions, MapWithNoSSR: React.ComponentType}){

    const [lens, setLens] = useState("");

    return (
        <div className={"main-container"}>
            <div className={"main" + (isUserMobile === true ? " mobile" : "") + (width < 920 ? " narrow" : "")}>
                <header>
                    <Image src={(screenOrientation === orientations.landscape ? '/backgrounds/hp.jpg' : '/backgrounds/mw.jpg')} layout={'fill'} objectFit={'cover'}
                           objectPosition={'center'} alt={'Cover Portrait'}/>
                    <div className={"main__overlay"}>
                        <div className={"main__content"}>
                            <div className={"main__content--headline"}></div>
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-standard-label">Lens</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={lens}
                                    onChange={(e) => {
                                        setLens(e.target.value);
                                    }}
                                    label="Lens"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Otus 55</MenuItem>
                                    <MenuItem value={20}>Otus 85</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-standard-label">Camera</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={lens}
                                    onChange={(e) => {
                                        setLens(e.target.value);
                                    }}
                                    label="Lens"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Otus 55</MenuItem>
                                    <MenuItem value={20}>Otus 85</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={lens}
                                    onChange={(e) => {
                                        setLens(e.target.value);
                                    }}
                                    label="Lens"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Otus 55</MenuItem>
                                    <MenuItem value={20}>Otus 85</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-standard-label">ISO</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={lens}
                                    onChange={(e) => {
                                        setLens(e.target.value);
                                    }}
                                    label="Lens"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Otus 55</MenuItem>
                                    <MenuItem value={20}>Otus 85</MenuItem>
                                </Select>
                            </FormControl>



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

export function AboutMain({isUserMobile, width, screenOrientation}: {isUserMobile: boolean, width: number, screenOrientation: OrientationOptions}){
    return (
        <div className={"main-container"}>
            <div className={"main" + (isUserMobile === true ? " mobile" : "") + (width < 920 ? " narrow" : "")}>
                <header>
                    <Image src={(screenOrientation === orientations.landscape ? '/backgrounds/hp.jpg' : '/backgrounds/mw.jpg')} layout={'fill'} objectFit={'cover'}
                           objectPosition={'center'} alt={'Cover Portrait'}/>
                    <div className={"main__overlay"}>
                        <div className={"main__content"}>
                            <div className={"main__content--headline"}>About</div>
                            {lipsum}
                            <br />
                            <br />

                            {lipsum}
                            <br />
                            <br />

                            {lipsum}
                            <br />
                            <br />

                            {lipsum}
                            <br />
                            <br />

                            {lipsum}
                            <br />
                            <br />

                            {lipsum}
                            <br />
                            <br />

                            {lipsum}
                            <br />
                            <br />
                        </div>
                    </div>
                </header>
            </div>
        </div>
    );
}

async function handleGalleryImages(setPhotos: Dispatch<SetStateAction<ImageArrayData[]>>, folder: string): Promise<void>{
    const results = await httpClient.post(`${process.env.SERVERURL}/gallery/getThisFolder`, {gallerySize: "sm", galleryName: folder});
    if (results?.data?.error === true || results.data === undefined) return;
    let imageData = results.data.data;
    if (imageData.length < 0) return;
    cc(imageData)

    let formattedImageData: ImageArrayData[] = [];
    for (let image of imageData){
        formattedImageData.push({src: image.url, height: +image.height, width: +image.width, blurSrc: image.base64url, alt: image["alt_text"], lg_img_url: image.lg_img_url})
    }

    setPhotos(formattedImageData);
}

async function getGalleryFolderNames(setGalleryFolders: Dispatch<GalleryFolderSpans[]>, setPhotos: Dispatch<SetStateAction<ImageArrayData[]>>){
    const folders = await httpClient.get(`${process.env.SERVERURL}/gallery/getGalleryFolders`);
    const elements = folders.data.data.map((elem: {folder: string}) => {
      return (
          <span key={elem.folder} className={"galleryFolderSelectors"} onClick={(event) => {
            handleFolderChange(elem.folder, setPhotos);
          }}>{elem.folder}</span>
      );
    });

    setGalleryFolders(elements);
}

function handleFolderChange(folder: string, setPhotos: Dispatch<SetStateAction<ImageArrayData[]>>){
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

