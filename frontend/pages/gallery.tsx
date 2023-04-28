import {ReactElement} from "react";
import Navbar from "../components/Navbar";
import {navbarOptions} from "../common/variables";
import NavbarLinks from "../components/NavbarLinks";
import {GenericHead} from "../components/Heads";
import OverlayShadows from "../components/OverlayShadows";
import Basics from "../components/forEveryPage";
import {GalleryMain} from "../components/mains/Gallery";

function Gallery<NextPage>(): ReactElement{
    const {dispatch, navbarOpenOrClosed, setNavbarOpenOrClosed, screenOrientation, width, isUserMobile, setIsUserMobile} = Basics();

    return (
        <div className={'threeDimensionalContainer' + (navbarOpenOrClosed === navbarOptions.open ? " active" : "") }>
            <GenericHead
                content={"Stuff"}
                metaName={"Image Galleries"}
            />
            <Navbar
                navbarOpenOrClosed={navbarOpenOrClosed}
                setNavbarOpenOrClosed={setNavbarOpenOrClosed}
            />
            <GalleryMain
                isUserMobile={isUserMobile}
                width={width}
                screenOrientation={screenOrientation}
                navbarOpenOrClosed={navbarOpenOrClosed}
                setNavbarOpenOrClosed={setNavbarOpenOrClosed}
            />
            <OverlayShadows
                isUserMobile={isUserMobile}
                width={width}
            />
            <NavbarLinks
                setNavbarOpenOrClosed={setNavbarOpenOrClosed}
            />
        </div>
    );
}

export default Gallery;