import Image from "next/legacy/image";
import {orientations} from "../hooks/useOrientation";
import {themeOptions} from "../features/theme/themeSlice";
import {
    businessName,
    cc,
    isLoading,
    lipsum,
    photoBodies,
    photoLenses,
    photoLighting, videoBodies, videoOther
} from "../common/variables";
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
import {reviews} from "../common/reviews";
import useInterval from "beautiful-react-hooks/useInterval";
import portraitBackground from 'public/backgrounds/mw.jpg';
import landscapeBackground from 'public/backgrounds/hp.jpg';


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
                                <NjGallery
                                    {...galleryInputs}
                                />

                            </div>
                        </div>
                    </ThemeProvider>
                </header>
            </div>
    );
}

export function IndexMain({isUserMobile, width, screenOrientation}:
                          {isUserMobile: boolean, width: number, screenOrientation: OrientationOptions}){

    const animationStates = Array.from({length: 6}).map((e, i) => `animationInstance${i}`);
    const [reviewNumber, setReviewNumber] = useState(0);
    const [instances, setInstances] = useState(0);
    const changeReview = () => {
        if (instances === animationStates.length-1){
            reviews.length-1 > reviewNumber ? setReviewNumber((prev) => prev+1) : setReviewNumber(0);
            setInstances(1);
        } else {
            setInstances((prev) => prev+1)
        }
    }
    useInterval(changeReview, 1750);

    return(
        <div className={"main-container"}>
            <div className={"main" + (isUserMobile ? " mobile" : "") + (width < 920 ? " narrow" : "")}>
                <header>
                    <BackgroundImage screenOrientation={screenOrientation}/>
                    <div className={indexStyles.overlay + " homeOverlay"}>
                        <div className={indexStyles.inner}>
                            <div className={"review--container " + animationStates[instances]}>
                                <div className={"review--comment"}>
                                    {`"`}{reviews[reviewNumber].content}{`"`}
                                </div>

                                <div className={"review--name"}>
                                    - {reviews[reviewNumber].name}
                                </div>
                            </div>
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
                    <BackgroundImage screenOrientation={screenOrientation}/>
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
    const photoBodyElems = photoBodies.map((e, k) => (<li key={k}>{e}</li>));
    const photoLensesElems = photoLenses.map((e, k) => (<li key={k}>{e}</li>));
    const photoLightingElems = photoLighting.map((e, k) => (<li key={k}>{e}</li>));
    const videoBodyElems = videoBodies.map((e, k) => (<li key={k}>{e}</li>));
    const videoOtherElems = videoOther.map((e, k) => (<li key={k}>{e}</li>));

    return (
        <div className={"main-container"}>
            <div className={"main" + (isUserMobile ? " mobile" : "") + (width < 920 ? " narrow" : "")}>
                <header>
                    <BackgroundImage screenOrientation={screenOrientation}/>
                    <div className={"main__overlay"}>
                        <div className={"main__content"}>
                            <div className={"main__content--headline"}>Intro</div>
                            <p>
                                Welcome to the {businessName} website. My name is Jerrad Johnson, and my portraits normally have a very traditional style. My models are posed to accentuate their most flattering features, present personality or mood, and complement the scene. I rarely capture candids, I believe my models should have the privilege of intentional presentation.
                            </p>

                            <p>
                                While this may sound difficult for you, it’s not – except for a bit of muscle fatigue! Because I will guide your pose, it’s quite simple.
                            </p>

                            <p>
                                My photo edits are usually mild. I may remove some blemishes and clear your skin, but I want my models to look <i>human</i>. I’m not a fan of the cake-like-skin style.
                            </p>

                            <div className={"main__content--headline"}>Contact</div>
                            <p>
                                <a href={"mailto:jerrad.johnson3@gmail.com"}>jerrad.johnson3@gmail.com</a>
                            </p>
                            <p>
                                <a href={"tel:6056468941"}>(605) 646-8941</a> – Please text first, I do not answer for unknown numbers.
                            </p>

                            <div className={"main__content--headline"}>Photography Equipment</div>
                            <div className={"main__content--equipment--main-container"}>
                                <div className={"main__content--two-col-list--sub-container"}>
                                    <div className={"main__content--equipment--sub-left"}>
                                        <div className={"main__content--two-col-list--subheading"}>
                                            Cameras
                                        </div>
                                        <ul>
                                            {photoBodyElems}
                                        </ul>

                                        <div className={"main__content--two-col-list--subheading"}>
                                            Lighting
                                        </div>
                                        <ul>
                                            {photoLightingElems}
                                        </ul>
                                    </div>
                                    <div className={"main__content--equipment--sub-right"}>
                                        <div className={"main__content--two-col-list--subheading"}>
                                            Lenses
                                        </div>
                                        <ul>
                                            {photoLensesElems}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className={"main__content--headline"}>Videography Equipment</div>
                            <div className={"main__content--equipment--main-container"}>
                                <div className={"main__content--two-col-list--sub-container"}>
                                    <div className={"main__content--equipment--sub-left"}>
                                        <div className={"main__content--two-col-list--subheading"}>
                                            Cameras
                                        </div>
                                        <ul>
                                            {videoBodyElems}
                                        </ul>

                                    </div>
                                    <div className={"main__content--equipment--sub-right"}>
                                        <div className={"main__content--two-col-list--subheading"}>
                                            Other
                                        </div>
                                        <ul>
                                            {videoOtherElems}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        </div>
    );
}

export function SessionMain({isUserMobile, width, screenOrientation}: {isUserMobile: boolean, width: number, screenOrientation: OrientationOptions}){

    return (
        <div className={"main-container"}>
            <div className={"main" + (isUserMobile ? " mobile" : "") + (width < 920 ? " narrow" : "")}>
                <header>
                    <BackgroundImage screenOrientation={screenOrientation}/>
                    <div className={"main__overlay"}>
                        <div className={"main__content"}>

                            <div className={"main__content--equipment--main-container"}>
                                <div className={"main__content--headline"}>Sessions</div>
                                <div className={"main__content--subheading"}>Standard Portraits</div>
                                    <p>
                                        Senior portraits, business headshots, couples photos, etc.
                                    </p>

                                    <p>
                                        On-location only, I do not currently have a studio.
                                    </p>
                                    <p>
                                        Although you{"'"}re allowed to change your outfit as many times as you want, keep in mind that you could receive fewer than the quoted number of pictures if changing takes too long.
                                    </p>
                                    <p>
                                        I encourage you to bring props. They help show your personality, and add variety to your portraits.
                                    </p>
                                <div className={"main__content--two-col-list--sub-container"}>
                                    <li>Price: $435</li>
                                    <li>Time: 1.25hr</li>
                                </div>
                                <div className={"main__content--two-col-list--sub-container"}>
                                    <li>Digital Photos: 10-15</li>
                                    <li>Outfits: Unlimited</li>
                                </div>
                                <br/>

                                <div className={"main__content--subheading"}>Other Sessions</div>
                                    <div className={"main__content--equipment--sub-left"}>
                                        {/*<div className={"main__content--equipment-headline"}>
                                            About
                                        </div>*/}
                                            Wedding photography or videography, special events, large groups, etc.
                                            <br/><br/>
                                            Contact me to discuss details and pricing.
                                </div>
                            </div>

                            <br/>
                            <div className={"main__content--headline"}>Notes</div>
                            <p>Session fee includes sales tax.</p>

                            <p>Check or cash payment is due before your session begins. Refunds will be granted only if I lose your photos before delivering them to you, or if I am unhappy with the results and unwilling to deliver substandard photos.</p>

                            <p>If you{"'"}re unhappy with your portraits, please explain why and request a reshoot.</p>

                            <p>You (or your parent) will have to sign a model release, which allows me to use the photos e.g. in this website{"'"}s gallery.</p>

                            <p>Within two weeks, your portraits should be edited and ready for delivery. My watermark may be present on your pictures, but I believe you{"'"}ll agree that the way I use it is subtle.</p>

                            <div className={"main__content--headline"}>Preparation</div>
                            <div className={"main__content--subheading"}>Clothing</div>
                            <p>As a general rule, avoid articles of clothing that are all-white, all-black, or strongly-colored. This is especially true if you have white skin, because you{"'"}ll look washed-out. Pastels are good. Greens and yellows are generally bad.</p>
                            <p>Close-cut outfits look nicer than very loose-fit ones.</p>

                            <div className={"main__content--subheading"}>Makeup</div>
                            <p>If you do not wear makeup, please wash your face before your session to remove skin oils -- they{"'"}re glossy.</p>
                            <p>If you wear makeup, please be extremely careful to keep it smooth. If it{"'"}s blotchy, I may not be able to edit your photos enough to save them.</p>
                            <p>And I highly recommend that you bring your finishing powder. Even if your makeup stays smooth, your skin could be glossy, and your finishing powder should be able to solve that.</p>

                            <div className={"main__content--subheading"}>Skin</div>
                            <p>Remove tight-fit articles such as wrist watches in advance, as they may leave red skin marks.</p>
                            <p>If you have dry, flaky skin, a moisturizer such as those offered by CeraVe may be very beneficial. However it is glossy so do not apply it before your session. And similarly, consider using a lip moisturizer.</p>

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

function BackgroundImage({screenOrientation}){
    return (
        <Image src={(screenOrientation === orientations.landscape ? landscapeBackground : portraitBackground)}
               layout={'fill'} objectFit={'cover'} objectPosition={'center'} alt={'Website Background Portrait'}/>
    );
}