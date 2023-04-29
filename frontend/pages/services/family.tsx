import type {ReactElement} from "react";
import {GenericHead} from "../../components/Heads";
import React from "react";
import Navbar from "../../components/Navbar";
import {navbarOptions} from "../../common/variables";
import Basics from "../../components/forEveryPage";
import OverlayShadows from "../../components/OverlayShadows";
import NavbarLinks from "../../components/NavbarLinks";
import ServicesFamilyMain from "../../components/mains/services/Family";

function Contact<NextPage>(): ReactElement{
    const {dispatch, navbarOpenOrClosed, setNavbarOpenOrClosed, screenOrientation, width, isUserMobile, setIsUserMobile} = Basics();

    return (
        <div className={"threeDimensionalContainer" + (navbarOpenOrClosed === navbarOptions.open ? " active" : "")}>
            <GenericHead
                content={"About"}
                metaName={"About"}
            />
            <Navbar
                navbarOpenOrClosed={navbarOpenOrClosed}
                setNavbarOpenOrClosed={setNavbarOpenOrClosed}
            />
            <ServicesFamilyMain
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

export default Contact;
