import dynamic from "next/dynamic";
import Navbar from "../components/Navbar";
import {navbarOptions} from "../common/variables";
import NavbarLinks from "../components/NavbarLinks";
import {GenericHead} from "../components/Heads";
import OverlayShadows from "../components/OverlayShadows";
import Basics from "../components/forEveryPage";
import {GalleryMapMain} from "../components/mains/Gallery-Map";


function GalleryMap<NextPage>(){
    const {dispatch, navbarOpenOrClosed, setNavbarOpenOrClosed, screenOrientation, width, isUserMobile, setIsUserMobile} = Basics();
    const MapWithNoSSR: React.ComponentType = dynamic(() => import("../components/LeafletMap"), {
        ssr: false,
    });

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
            <GalleryMapMain
                isUserMobile={isUserMobile}
                width={width}
                screenOrientation={screenOrientation}
                navbarOpenOrClosed={navbarOpenOrClosed}
                setNavbarOpenOrClosed={setNavbarOpenOrClosed}
                MapWithNoSSR={MapWithNoSSR}
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





export default GalleryMap;
