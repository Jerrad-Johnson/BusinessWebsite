import type {ReactElement} from "react";
import {navbarOptions} from "../common/variables";
import NavbarLinks from "../components/NavbarLinks";
import Navbar from "../components/Navbar";
import {GenericHead} from "../components/Heads";
import OverlayShadows from "../components/OverlayShadows";
import Basics from "../components/forEveryPage";
import {ContactMain} from "../components/mains/Contact";
const cc = console.log;

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
            <ContactMain
                isUserMobile={isUserMobile}
                width={width}
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

export default Contact;
