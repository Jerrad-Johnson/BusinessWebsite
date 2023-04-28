import {OrientationOptions} from "../../types/layout";
import {BackgroundImage} from "../../utils/SharedBetweenPages";
import Image from "next/legacy/image";
import seniorPortrait from '../../photos/svc_cards/senior2.png';
import boudoirPortrait from '../../photos/svc_cards/boudoir.png';
import couplePortrait from '../../photos/svc_cards/couple2.png';
import familyPortrait from '../../photos/svc_cards/family2.png';
import headshotPortrait from '../../photos/svc_cards/headshot.png';
import themedPortrait from '../../photos/svc_cards/themed.png';
import otherPortrait from '../../photos/svc_cards/other.png';
import weddingPortrait from '../../photos/svc_cards/wedding.png';
import Navbar from "../Navbar";
import {businessName, isLoading, navbarOptions} from "../../common/variables";
import NavbarLinks from "../NavbarLinks";
import {orientations} from "../../hooks/useOrientation";
import landscapeBackground from "../../public/backgrounds/hp.jpg";
import portraitBackground from "../../public/backgrounds/mw.jpg";
import {Box} from "@mui/system";
import {CircularProgress, createTheme, Tabs, ThemeProvider} from "@mui/material";
import Link from "next/link";
import NjGallery from "../../njGallery/NjGallery";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {GalleryInputs, ImageData} from "../../njGallery/types/njGallery";
import {GalleryFolderSpans, IsLoading} from "../../common/types";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {themeOptions} from "../../features/theme/themeSlice";
import httpClient from "../../common/httpClient";
import Tab from "@mui/material/Tab";
const cc = console.log;

export function TestMain({isUserMobile, width, screenOrientation, navbarOpenOrClosed, setNavbarOpenOrClosed}: {isUserMobile: boolean, width: number, screenOrientation: OrientationOptions}){


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


    const standardCardBottomMessage = "Click for more info.";

    const svcCardData = [
        {
            cardTop: "Senior",
            cardMiddle: seniorPortrait,
            svcUrl: "services/senior_portraits",
        },{
            cardTop: "Family",
            cardMiddle: familyPortrait,
            svcUrl: "services/family_portraits",
        },{
            cardTop: "Couples",
            cardMiddle: couplePortrait,
            svcUrl: "services/couples_portraits",
        },{
            cardTop: "Themed",
            cardMiddle: themedPortrait,
            svcUrl: "services/themed_portraits",
        },{
/*            cardTop: "Headshot",
            cardMiddle: headshotPortrait,
            cardUrl: "/svc_cards/headshot.png",
        },{*/
            cardTop: "Other",
            cardMiddle: otherPortrait,
            svcUrl: "services/other_portraits",
        },{
            cardTop: "Wedding",
            cardMiddle: weddingPortrait,
            svcUrl: "services/wedding_sessions",
        }, {
            cardTop: "Boudoir & Erotic",
            cardMiddle: boudoirPortrait,
            svcUrl: "services/boudoir_portraits",
        },
    ];

    const svcCardElems = svcCardData.map((e, k) => {
        return (
                <div key={k} className={"services-card__container"}>
                    <div className={"services-card__top-row"}>
                        {e.cardTop}
                    </div>

                    <a href={e.svcUrl}><div className={"services-card__middle-row"} style={{cursor: "pointer"}}>
                        {/*<img src={e.cardUrl}/>*/}
                        <Image src={e.cardMiddle} alt={"test"} quality={100}  priority={true}

                               style={{boxShadow: "0px 0px 50px 15px rgba(0,0,0,0.58)"}}
                        />
                    </div>
                    </a>
                </div>

        );
    });

    return (
        <>
        <div className={"background"}>
            <Image src={(screenOrientation === orientations.landscape ? landscapeBackground : portraitBackground)}
                   placeholder={"blur"}
                   layout={'fill'}
                   objectFit={'cover'}
                   objectPosition={'center'}
                   alt={'Website Background Portrait'}
            />
        </div>
            <div className={"navigation-pane__container " +  (navbarOpenOrClosed === navbarOptions.open ? "active " : "")}
                onClick={(e) => {
                    setNavbarOpenOrClosed(navbarOptions.closed);
                }
            }>
                <div className={"navigation-pane__links"} onClick={(e) => e.stopPropagation()}>
                    <NavbarLinks
                        setNavbarOpenOrClosed={setNavbarOpenOrClosed}
                    />

                </div>
            </div>

            <div className={"main" + (isUserMobile ? " mobile" : "") + (width < 920 ? " narrow" : "")}>
                <header>
                    <div className={"main__content " + (navbarOpenOrClosed === navbarOptions.open ? "active " : "")}>
                        <Navbar
                            navbarOpenOrClosed={navbarOpenOrClosed}
                            setNavbarOpenOrClosed={setNavbarOpenOrClosed}
                        />
                        <div className={"main__content--main-body"}>
                            <div className={"main__content--headline"}>Welcome</div>

                                <div className={"main__content--subheading"}>About</div>
                                <p>Ideal Portraits provides photography and videography in Rapid City, SD. </p>
                                <p>My name is Jerrad Johnson and my portraiture style is traditional. I believe you deserve the opportunity for <b>intentional</b> self-presentation, and I will direct your poses. </p>

                                <br/>
                                <div className={"main__content--headline"} id={"services"}>Services</div>
                                <div className={"services-cards-spacer"}>
                                    {svcCardElems}
                                </div>

                                {/*<br/>
                                <div className={"main__content--headline"} id="gallery">Gallery</div>
                                <div className={"gallery__container"}>

                                    <hr/>
                                    <ThemeProvider theme={styledTab}>
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
                                    </ThemeProvider>
                                    <hr/>
                                    <br/>

                                    <NjGallery
                                        {...galleryInputs}
                                    />
                                </div>*/}

                                {/*<div className={"main__content--subheading"}>Standard Portraits</div>
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
                                    I encourage you to bring props. They help express your personality, and add variety to your portraits.
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
                                <p>
                                    Wedding photography or videography, special events, large groups, etc.
                                </p>
                                <p>
                                    Contact me to discuss details and pricing.
                                </p>*/}
                                <br/><br/><div className={"main__content--headline"} id="contact">Contact</div>
                                <p className={"list"}><a href={"mailto:jerrad.johnson3@gmail.com"}>jerrad.johnson3@gmail.com</a></p>
                                <p className={"list"}><a href={"tel:6056468941"}>(605) 646-8941</a> – Please text first, I do not answer for unknown numbers.</p>


    {/*                        <div className={"main__content--headline"}>Notes</div>

                            <p>Session fee includes sales tax.</p>

                            <p>Check or cash payment is due before your session begins. Refunds will be granted only if I lose your photos before delivering them to you, or if I am unhappy with the results and unwilling to deliver substandard photos.</p>

                            <p>If you{"'"}re unhappy with your portraits, please explain why and request a reshoot.</p>

                            <p>You (or your parent) will have to sign a model release, which allows me to use the photos e.g. in this website{"'"}s gallery.</p>

                            <p>Within two weeks, your portraits should be edited and ready for delivery. My watermark may be present, but I believe you{"'"}ll agree that it{"'"}s subtle.</p>

                            <div className={"main__content--headline"}>Preparation</div>
                            <div className={"main__content--subheading"}>Clothing</div>
                            <p>As a general rule, avoid articles of clothing that are all-white, all-black, or strongly-colored. This is especially true if you have white skin, because you may look washed-out. Pastels are good. Greens and yellows are usually bad.</p>
                            <p>Close-cut outfits look nicer than very loose-fit ones.</p>

                            <div className={"main__content--subheading"}>Makeup</div>
                            <p>If you do not wear makeup, please wash your face before your session to remove skin oils -- they{"'"}re shiny.</p>
                            <p>If you wear makeup, please be extremely careful to keep it smooth. If it{"'"}s blotchy, I may not be able to edit your photos enough to save them.</p>
                            <p>And I highly recommend that you bring your finishing powder. Even if you protect your makeup, your skin could be glossy, and your finishing powder should be able to solve that.</p>

                            <div className={"main__content--subheading"}>Skin</div>
                            <p>Remove in advance tight-fit articles such as wrist watches, as they may leave red skin marks.</p>
                            <p>If you have dry, flaky skin, moisturizers such as those offered by CeraVe may be very beneficial. But moisturizers are glossy, so do not apply any before your session.</p>*/}

                        </div>
                    </div>
                </header>
            </div>
        </>
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