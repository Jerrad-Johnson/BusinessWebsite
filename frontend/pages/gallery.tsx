import {NextPage} from "next";
import {ReactElement, useState} from "react";
import {businessName, cc} from "../common/variables";
import Head from "next/head";
import Image from "next/image";
import useScreenOrientation, {orientations} from "../hooks/useOrientation";
import {darkTheme, lightTheme} from "../features/theme/themeSlice";
import Link from "next/link";
import {AppDispatch} from "../app/store";
import {useDispatch} from "react-redux";
import Navbar from "../components/Navbar";
import {navbarOptions} from "../common/variables";
import NavbarLinks from "../components/NavbarLinks";
import {GalleryHead} from "../components/Heads";



function Gallery<NextPage>(): ReactElement{
    const dispatch: AppDispatch = useDispatch();
    const screenOrientation = useScreenOrientation();
    const [navbarOpenOrClosed, setNavbarOpenOrClosed] = useState(navbarOptions.closed);

    return (
        <div className={'container' + (navbarOpenOrClosed === navbarOptions.open ? " active" : "") }>
            <Navbar navbarOpenOrClosed={navbarOpenOrClosed} setNavbarOpenOrClosed={setNavbarOpenOrClosed}/>
            {GalleryHead}
            <div className={"main-container"}>
                <div className={"main"}>
                    <header>`
                        <Image src={(screenOrientation === orientations.landscape ? '/backgrounds/hp.jpg' : '/backgrounds/mw.jpg')} layout={'fill'} objectFit={'cover'}
                               objectPosition={'center'}/>
                        <div className={"overlay"}>
                            <div className={"inner"}>
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

                <div className={"shadow one"}></div>
                <div className={"shadow two"}></div>
            </div>

            <NavbarLinks/>
        </div>
    );
}

export default Gallery;