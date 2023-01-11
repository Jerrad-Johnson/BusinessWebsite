import {ReactElement, useState} from "react";
import {cc} from "../common/variables";
import Navbar from "../components/Navbar";
import {navbarOptions} from "../common/variables";
import NavbarLinks from "../components/NavbarLinks";
import OverlayShadows from "../components/OverlayShadows";
import {GalleryMain} from "../components/MainContents";
import {GenericHead} from "./Heads";
import {NavbarOptions} from "../types/layout";


function Gallery<NextPage>(): ReactElement{
    const [navbarOpenOrClosed, setNavbarOpenOrClosed] = useState<NavbarOptions>(navbarOptions.closed);

    return (
        <div className={'container' + (navbarOpenOrClosed === navbarOptions.open ? " active" : "") }>
            <Navbar
                navbarOpenOrClosed={navbarOpenOrClosed}
                setNavbarOpenOrClosed={setNavbarOpenOrClosed}
            />
            <GenericHead/>
            <GalleryMain/>
            <OverlayShadows/> {/*@ts-ignore*/}
            <NavbarLinks/>
        </div>
    );
}

export default Gallery;
