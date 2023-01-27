import {ReactElement, useState} from "react";
import {cc} from "../common/variables";
import Navbar from "../components/Navbar";
import {navbarOptions} from "../common/variables";
import NavbarLinks from "../components/NavbarLinks";
import OverlayShadows from "../components/OverlayShadows";
import {GalleryMain} from "../components/MainContents";
import {GenericHead} from "./Heads";
import {NavbarOptions} from "../types/layout";
import Basics from "./forEveryPage";


function Gallery<NextPage>(): ReactElement{
    const {navbarOpenOrClosed, setNavbarOpenOrClosed, screenOrientation, width, isUserMobile} = Basics();

    return (
        <div className={'container' + (navbarOpenOrClosed === navbarOptions.open ? " active" : "") }>
            <Navbar
                navbarOpenOrClosed={navbarOpenOrClosed}
                setNavbarOpenOrClosed={setNavbarOpenOrClosed}
            />
            <GenericHead/>
            <GalleryMain
                isUserMobile = {isUserMobile}
                width = {width}
                screenOrientation = {screenOrientation}
            />
            <OverlayShadows
                isUserMobile = {isUserMobile}
                width = {width}
            />
            <NavbarLinks
                setNavbarOpenOrClosed = {setNavbarOpenOrClosed}
            />
        </div>
    );
}

export default Gallery;
