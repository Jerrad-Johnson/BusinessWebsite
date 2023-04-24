import type {ReactElement} from "react";
import {navbarOptions} from "../common/variables";
import NavbarLinks from "../components/NavbarLinks";
import Navbar from "../components/Navbar";
import {GenericHead} from "../components/Heads";
import {SessionMain} from "../components/MainContents";
import OverlayShadows from "../components/OverlayShadows";
import Basics from "../components/forEveryPage";
const cc = console.log;

function Sessions<NextPage>(): ReactElement{
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
            <SessionMain
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

export default Sessions;