import {ReactElement, useState} from "react";
import {cc} from "../common/variables";
import Navbar from "../components/Navbar";
import {navbarOptions} from "../common/variables";
import NavbarLinks from "../components/NavbarLinks";
import {GalleryHead} from "../components/Heads";
import OverlayShadows from "../components/OverlayShadows";
import {GalleryMain} from "../components/MainContents";


function Gallery<NextPage>(): ReactElement{
    const [navbarOpenOrClosed, setNavbarOpenOrClosed] = useState(navbarOptions.closed);

    return (
        <div className={'container' + (navbarOpenOrClosed === navbarOptions.open ? " active" : "") }>
            <Navbar
                navbarOpenOrClosed={navbarOpenOrClosed}
                setNavbarOpenOrClosed={setNavbarOpenOrClosed}
            />
            {GalleryHead}
            <GalleryMain/>
            <OverlayShadows/>
            <NavbarLinks/>
        </div>
    );
}

export default Gallery;