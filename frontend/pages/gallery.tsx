import {ReactElement, useState} from "react";
import {cc} from "../common/variables";
import Navbar from "../components/Navbar";
import {navbarOptions} from "../common/variables";
import NavbarLinks from "../components/NavbarLinks";
import {GenericHead} from "../components/Heads";
import OverlayShadows from "../components/OverlayShadows";
import {GalleryMain} from "../components/MainContents";
import {NavbarOptions} from "../types/layout";


function Gallery<NextPage>(): ReactElement{
    const [navbarOpenOrClosed, setNavbarOpenOrClosed] = useState<NavbarOptions>(navbarOptions.closed);

    return (
        <div className={'container' + (navbarOpenOrClosed === navbarOptions.open ? " active" : "") }>
            <Navbar
                navbarOpenOrClosed={navbarOpenOrClosed}
                setNavbarOpenOrClosed={setNavbarOpenOrClosed}
            />
            <GenericHead
                content={"Stuff"}
                metaName={"Image Galleries"}
            />
            <GalleryMain/>
            <OverlayShadows/>
            <NavbarLinks
                setNavbarOpenOrClosed={setNavbarOpenOrClosed}
            />
        </div>
    );
}

export default Gallery;