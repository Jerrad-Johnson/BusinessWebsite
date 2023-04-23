import Image from "next/legacy/image";
import {orientations} from "../hooks/useOrientation";
import {themeOptions} from "../features/theme/themeSlice";
import {cc, isLoading, lipsum} from "../common/variables";
/*import {NjGallery} from 'njGallery'*/
/*import "njgallery/styles/lightbox.css";*/
import NjGallery from "../njGallery/NjGallery";
import {GalleryInputs, ImageData} from "../njGallery/types/njGallery";
import indexStyles from "../styles/Index.module.css";
import {OrientationOptions} from "../types/layout";
import httpClient from "../common/httpClient";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {
    CircularProgress,
    createTheme,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Tabs,
    ThemeProvider
} from "@mui/material";
import {GalleryFolderSpans, IsLoading} from "../common/types";
import {Box} from "@mui/system";
import Tab from '@mui/material/Tab';
import {useSelector} from "react-redux";
import {RootState} from "../app/store";

export function GalleryMain({isUserMobile, width, screenOrientation}:
                                {isUserMobile: boolean, width: number, screenOrientation: OrientationOptions}){

    const [photos, setPhotos] = useState<ImageData[]>([]);
    const [galleryFolders, setGalleryFolders] = useState<IsLoading | GalleryFolderSpans[]>(isLoading);
    const themeType: string = useSelector((state: RootState) => state.theme.value);

    useEffect(() => {
        if (galleryFolders === isLoading) return;
        if (!("key" in galleryFolders[0])) return; //TODO This causes the script to crash if the server doesn't respond.
        handleGalleryImages(setPhotos, galleryFolders[0].key);
    }, [galleryFolders]);

    const [galleryTabSelected, setGalleryTabSelected] = useState(0);
    useEffect(() => {
        getGalleryFolderNames(setGalleryFolders, setPhotos, setGalleryTabSelected);
        //handleGalleryImages(setPhotos);
    }, []);


    let lightboxMuiButtonsTheme;
    if (themeType === themeOptions.dark) {
        lightboxMuiButtonsTheme = {
            palette: {
                primary: {
                    main: '#dddddd',
                },
                secondary: {
                    main: '#555555',
                },
            },
        }
    } else if (themeType === themeOptions.light) {
        lightboxMuiButtonsTheme = {
            palette: {
                primary: {
                    main: '#555555',
                },
                secondary: {
                    main: '#cccccc',
                },
            },
        }
    }

    const galleryInputs: GalleryInputs = {
        images: photos,
        containerWidth: "100%",
        containerPadding: 10,
        imagePadding: {vertical: 10, horizontal: 10},
        targetRowHeight: 300,
        showIncompleteRows: true,
        targetRowHeightTolerance: .2,
        lightboxMuiButtonTheme: lightboxMuiButtonsTheme,
    }

    for (let image of galleryInputs.images){
        image.tooltip_left = (
            <ul>
                {image.alt && (<li>Title: {image.alt}</li>)}
                {image.date && (<li>Date: {image.date.slice(0, 10)}</li>)}
            </ul>
        )
        image.tooltip_right = (
            <ul>
                {image.camera_model && (<li>Camera: {image.camera_model}</li>)}
                {image.lens !== image.focal && (<li>Lens: {image.lens}</li>)}
                {image.focal && (<li>Focal Length: {image.focal}</li>)}
                {image.aperture && (<li>Aperture: f/{image.aperture}</li>)}
                {image.iso && (<li>ISO: {image.iso}</li>)}
                {image.exposure && (<li>Shutter Speed: {image.exposure}</li>)}
            </ul>
        )
    }

    let styledTab = null;
    if (themeType === themeOptions.dark){
        styledTab = createTheme({
            components: {
                MuiTab: {
                    styleOverrides: {
                        root: {
                            color: "#ffffff",
                        }
                    }
                }
            }
         });
    } else if (themeType === themeOptions.light){
        styledTab = createTheme({
            components: {
                MuiTab: {
                    styleOverrides: {
                        root: {
                            color: "#000000",
                        }
                    }
                }
            }
        });
    } else { // default case, if theme not set.
        styledTab = createTheme({
            components: {
                MuiTab: {
                    styleOverrides: {
                        root: {
                            color: "#ffffff",
                        }
                    }
                }
            }
        });
    }

    return (
            <div className={"main" + (isUserMobile ? " mobile" : "") + (width < 920 ? " narrow" : "")}>
                <header>
                    <ThemeProvider theme={styledTab}>
                        <Image src={(screenOrientation === orientations.landscape ? '/backgrounds/hp.jpg' : '/backgrounds/mw.jpg')} layout={'fill'} objectFit={'cover'}
                               objectPosition={'center'} alt={'Cover Portrait'}/>
                        <div className={"main__overlay"}>
                            <div className={"main__content"}>
                                <div className={"main__content--headline"}>Gallery</div>
                                <hr/>
                                <Box>
                                    <Tabs
                                        value={galleryTabSelected}
                                        TabIndicatorProps={{ sx: { display: 'none' } }}
                                        sx={{
                                            '& .MuiTabs-flexContainer': {
                                                flexWrap: 'wrap',
                                            },
                                        }}>
                                        {galleryFolders !== isLoading && galleryFolders }
                                    </Tabs>
                                        {galleryFolders === isLoading && <CircularProgress/> }
                                </Box>
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

                            </div>
                        </div>
                    </ThemeProvider>
                </header>
            </div>
    );
}

export function IndexMain({isUserMobile, width, screenOrientation}:
                          {isUserMobile: boolean, width: number, screenOrientation: OrientationOptions}){
    return(
        <div className={"main-container"}>
            <div className={"main" + (isUserMobile ? " mobile" : "") + (width < 920 ? " narrow" : "")}>
                <header>
                    <Image src={(screenOrientation === orientations.landscape ? '/backgrounds/hp.jpg' : '/backgrounds/mw.jpg')}
                           layout={'fill'} objectFit={'cover'} objectPosition={'center'} alt={'Website Background Portrait'}/>
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
            <div className={"main" + (isUserMobile ? " mobile" : "") + (width < 920 ? " narrow" : "")}>
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
            <div className={"main" + (isUserMobile ? " mobile" : "") + (width < 920 ? " narrow" : "")}>
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

async function handleGalleryImages(setPhotos: Dispatch<SetStateAction<ImageData[]>>, folder: string): Promise<void>{
    const results = await httpClient.post(`${process.env.SERVERURL}/gallery/getThisFolder`, {gallerySize: "sm", galleryName: folder});
    if (results?.data?.error === true || results.data === undefined) return;
    let imageData = results.data.data;
    if (imageData.length < 0) return;

    let formattedImageData: ImageData[] = [];
    for (let image of imageData){
        formattedImageData.push(
            {
                src: image.url,
                height: +image.height,
                width: +image.width,
                blurSrc: image.base64url,
                lg_img_url: image.lg_img_url,
                alt: image["alt_text"] || null,
                camera_model: image.camera_model || null,
                exposure: image.exposure_time || null,
                focal: image.focal_length || null,
                iso: image.iso || null,
                lens: image.lens_model || null,
                date: image.photo_capture || null,
                aperture: image.aperture || null,
            }
        )
    }

    setPhotos(formattedImageData);
}

async function getGalleryFolderNames(setGalleryFolders: Dispatch<GalleryFolderSpans[]>, setPhotos: Dispatch<SetStateAction<ImageData[]>>, setGalleryTabSelected: Dispatch<SetStateAction<number>>){
    const folders = await httpClient.get(`${process.env.SERVERURL}/gallery/getGalleryFolders`);
    const tabElements = folders.data.data.map((elem: {folder: string}, key: number) => {
      return (
          <Tab label={elem.folder} key={elem.folder} value={key} onClick={(event) => {
              handleFolderChange(elem.folder, setPhotos);
              setGalleryTabSelected(key);
          }}/>
      );
    });

    const elements = (
        <Box>
            <Tabs>
                {tabElements}
            </Tabs>
        </Box>
    );

    setGalleryFolders(tabElements);
}

function handleFolderChange(folder: string, setPhotos: Dispatch<SetStateAction<ImageData[]>>){
    handleGalleryImages(setPhotos, folder);
}


/*<span key={elem.folder} className={"galleryFolderSelectors"}
      onClick={(event) => {
          handleFolderChange(elem.folder, setPhotos);
      }}>{elem.folder}</span>*/


/**/





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

