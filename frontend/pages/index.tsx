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
import dynamic from "next/dynamic";
import useScreenOrientation from "../hooks/useOrientation";
import {orientations} from "../hooks/useOrientation";
import {NavbarOptions} from "../types/layout";
import NavbarLinks from "../components/NavbarLinks";
import {isMobile} from 'react-device-detect';
const cc = console.log;


function Home<NextPage>(): ReactElement{
   const dispatch: AppDispatch = useDispatch();
   const [navOpenOrClosed, setNavOpenOrClosed] = useState<NavbarOptions>(navbarOptions.closed);
   const screenOrientation = useScreenOrientation();
   const [isUserMobile, setIsUserMobile] = useState(false);

   useEffect(() => {
       setIsUserMobile(isMobile);
   }, []);

   cc(isUserMobile)

  return (
    <div className={"container" + (navOpenOrClosed === navbarOptions.open ? " active" : "")}>
      <Head>
        <title>{businessName}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <div className={"navbar"}>
            <div className={"menu"}>
                <h3 className={"logo"}>Ideal<span>Portraits</span></h3>
                <div className={"hamburger-menu"} onClick={(e) => {
                    navOpenOrClosed === navbarOptions.open ? setNavOpenOrClosed(navbarOptions.closed) : setNavOpenOrClosed(navbarOptions.open);
                }}>
                    <div className={"bar"}></div>
                </div>
            </div>
        </div>

        <div className={"main-container"}>
            <div className={"main" + (isUserMobile === true ? " mobile" : " ")}>
                <header>
                    <Image src={(screenOrientation === orientations.landscape ? '/backgrounds/hp.jpg' : '/backgrounds/mw.jpg')} layout={'fill'} objectFit={'cover'}
                           objectPosition={'center'}/>
                    <div className={styles.overlay + " homeOverlay"}>
                        <div className={styles.inner}>
                            <h2 className={"title"}>Future is here</h2>
                            <p>
                                <button onClick={() => { dispatch(lightTheme()); }}>Light </button>
                                <button onClick={() => { dispatch(darkTheme()); }}>Dark </button>

                            </p>
                            <button className={"btn"}>Read more</button>
                        </div>
                    </div>
                </header>
            </div>

            <div className={"shadow one" + (isUserMobile === true ? " mobile" : "")}></div>
            <div className={"shadow two" + (isUserMobile === true ? " mobile" : "")}></div>
        </div>

        <NavbarLinks setNavbarOpenOrClosed={setNavOpenOrClosed}/>
    </div>
  );
}


/*      <main className={styles.main}>
        <button onClick={() => { dispatch(lightTheme()); }}>Light</button>
        <button onClick={() => { dispatch(darkTheme()); }}>Dark</button>
        <Link href={"/test"}>GalleryMap page</Link>
      </main>

      <footer className={styles.footer}>
      </footer>*/

export default Home
