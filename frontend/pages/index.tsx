import type { NextPage } from 'next'
import type {AppDispatch} from "../app/store";
import type {ReactElement} from "react";
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Index.module.css'
import {darkTheme, lightTheme} from "../features/theme/themeSlice";
import {useDispatch} from "react-redux";
import Link from "next/link";
import {useEffect, useState} from "react";
import {businessName, navbarOptions} from "../common/variables";
import useScreenOrientation from "../hooks/useOrientation";
import {orientations} from "../hooks/useOrientation";
import {NavbarOptions} from "../types/layout";
import NavbarLinks from "../components/NavbarLinks";
import {isMobile} from 'react-device-detect';
import useScreenWidth from "../hooks/useScreenWidth";
import Navbar from "../components/Navbar";
import {GenericHead} from "../components/Heads";
import {GalleryMain, IndexMain} from "../components/MainContents";
import OverlayShadows from "../components/OverlayShadows";
import Basics from "../components/forEveryPage";
const cc = console.log;


function Home<NextPage>(): ReactElement{
    const {dispatch, navbarOpenOrClosed, setNavbarOpenOrClosed, screenOrientation, width, isUserMobile, setIsUserMobile} = Basics();

    return (
        <div className={"container" + (navbarOpenOrClosed === navbarOptions.open ? " active" : "")}>
            <GenericHead
                content={"Index"}
                metaName={"Home"}
            />
            <Navbar
                navbarOpenOrClosed={navbarOpenOrClosed}
                setNavbarOpenOrClosed={setNavbarOpenOrClosed}
            />
            <IndexMain
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

export default Home
