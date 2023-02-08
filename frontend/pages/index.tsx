import type {ReactElement} from "react";
import {navbarOptions} from "../common/variables";
import NavbarLinks from "../components/NavbarLinks";
import Navbar, {HomeNavbar} from "../components/Navbar";
import {GenericHead} from "../components/Heads";
import {IndexMain} from "../components/MainContents";
import OverlayShadows from "../components/OverlayShadows";
import Basics from "../components/forEveryPage";
import HomeStyle from "../styles/Index.module.css";
const cc = console.log;

function Home<NextPage>(): ReactElement{
    const {dispatch, navbarOpenOrClosed, setNavbarOpenOrClosed, screenOrientation, width, isUserMobile, setIsUserMobile} = Basics();

    return (
        <div className={"threeDimensionalContainer" + (navbarOpenOrClosed === navbarOptions.open ? " active" : "")}>
            <GenericHead
                content={"Index"}
                metaName={"Home"}
            />
            <HomeNavbar
                navbarOpenOrClosed={navbarOpenOrClosed}
                setNavbarOpenOrClosed={setNavbarOpenOrClosed}
            />
            <IndexMain
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

export default Home
