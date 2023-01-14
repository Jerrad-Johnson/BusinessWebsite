import {ReactElement} from "react";
import {cc} from "../common/variables";
import Navbar from "../components/Navbar";
import {navbarOptions} from "../common/variables";
import NavbarLinks from "../components/NavbarLinks";
import {GenericHead} from "../components/Heads";
import OverlayShadows from "../components/OverlayShadows";
import {GalleryMain} from "../components/MainContents";
import Basics from "../components/forEveryPage";


function Gallery<NextPage>(): ReactElement{
    const {dispatch, navbarOpenOrClosed, setNavbarOpenOrClosed, screenOrientation, width, isUserMobile, setIsUserMobile} = Basics();

    return (
        <div className={'container' + (navbarOpenOrClosed === navbarOptions.open ? " active" : "") }>
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
                dispatch={dispatch}
                screenOrientation={screenOrientation}
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