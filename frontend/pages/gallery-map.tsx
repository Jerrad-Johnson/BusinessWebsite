import Head from 'next/head'
import dynamic from "next/dynamic";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import httpClient from "../common/httpClient";
import {cc} from "../common/variables";
import {ReactElement} from "react";
import Navbar from "../components/Navbar";
import {navbarOptions} from "../common/variables";
import NavbarLinks from "../components/NavbarLinks";
import {GenericHead} from "../components/Heads";
import OverlayShadows from "../components/OverlayShadows";
import {GalleryMain, GalleryMapMain} from "../components/MainContents";
import Basics from "../components/forEveryPage";


function GalleryMap<NextPage>(){
    const {dispatch, navbarOpenOrClosed, setNavbarOpenOrClosed, screenOrientation, width, isUserMobile, setIsUserMobile} = Basics();
    const MapWithNoSSR = dynamic(() => import("../components/LeafletMap"), {
        ssr: false,
    });

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
            <GalleryMapMain
                isUserMobile={isUserMobile}
                width={width}
                dispatch={dispatch}
                screenOrientation={screenOrientation}
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
