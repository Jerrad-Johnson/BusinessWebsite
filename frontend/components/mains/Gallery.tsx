import {NavbarOptions, OrientationOptions} from "../../types/layout";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {GalleryInputs, ImageData} from "../../njGallery/types/njGallery";
import {GalleryFolderSpans, IsLoading} from "../../common/types";
import {isLoading} from "../../common/variables";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {themeOptions} from "../../features/theme/themeSlice";
import {CircularProgress, createTheme, Tabs, ThemeProvider} from "@mui/material";
import {Box} from "@mui/system";
import NjGallery from "../../njGallery/NjGallery";
import {BackgroundImage} from "../../utils/SharedBetweenPages";
import httpClient from "../../common/httpClient";
import Tab from "@mui/material/Tab";
import Link from "next/link";
import MainDiv from "../MainDiv";

export function GalleryMain({isUserMobile, width, screenOrientation, navbarOpenOrClosed, setNavbarOpenOrClosed}:{
    isUserMobile: boolean,
    width: number,
    screenOrientation: OrientationOptions
    navbarOpenOrClosed: NavbarOptions,
    setNavbarOpenOrClosed: Dispatch<SetStateAction<NavbarOptions>>
}){

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
/*        image.tooltip_left = (
            <ul>
                {image.alt && (<li>Title: {image.alt}</li>)}
                {image.date && (<li>Date: {image.date.slice(0, 10)}</li>)}
            </ul>
        )*/
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
        <MainDiv isUserMobile={isUserMobile} width={width} navbarOpenOrClosed={navbarOpenOrClosed} setNavbarOpenOrClosed={setNavbarOpenOrClosed}>
            <header>
                <ThemeProvider theme={styledTab}>
                    <BackgroundImage screenOrientation={screenOrientation}/>
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

                            <br/>

                            <NjGallery
                                {...galleryInputs}
                            />
                        </div>
                    </div>
                </ThemeProvider>
            </header>
        </MainDiv>
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
            <Tab label={elem.folder} key={elem.folder} value={key} style={{fontFamily: "EB Garamond"}}
                 onClick={(event) => {
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