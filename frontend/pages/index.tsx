import type { NextPage } from 'next'
import type {AppDispatch} from "../app/store";
import type {ReactElement} from "react";
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {darkTheme, lightTheme} from "../features/theme/themeSlice";
import {useDispatch} from "react-redux";
import Link from "next/link";
import {useEffect, useState} from "react";
import {businessName} from "../common/variables";
import dynamic from "next/dynamic";
import useScreenOrientation from "../hooks/useOrientation";
import {orientations} from "../hooks/useOrientation";
const cc = console.log;

function Home<NextPage>(): ReactElement{
   const dispatch: AppDispatch = useDispatch();
   const [navOpenOrClosed, setNavOpenOrClosed] = useState(false);
   const screenOrientation = useScreenOrientation();


  return (
    <div className={'container' + (navOpenOrClosed ? " active" : "" + " ")}>
      <Head>
        <title>{businessName}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <div className={"navbar"}>
            <div className={"menu"}>
                <h3 className={"logo"}>Ideal<span>Portraits</span></h3>
                <div className={"hamburger-menu"} onClick={(e) => {
                    navOpenOrClosed ? setNavOpenOrClosed(0) : setNavOpenOrClosed(1);
                }}>
                    <div className={"bar"}></div>
                </div>
            </div>
        </div>

        <div className={"main-container"}>
            <div className={"main"}>
                <header>
                    <Image src={(screenOrientation === orientations.landscape ? '/backgrounds/hp.jpg' : '/backgrounds/mw.jpg')} layout={'fill'} objectFit={'cover'}
                           objectPosition={'center'}/>
                    <div className={"overlay"}>
                        <div className={"inner"}>
                            <h2 className={"title"}>Future is here</h2>
                            <p>
                                <button onClick={() => { dispatch(lightTheme()); }}>Light </button>
                                <button onClick={() => { dispatch(darkTheme()); }}>Dark </button>
                                <button onClick={() => { cc(screen.orientation) }}>Get Orientation </button>
                                <button onClick={() => { cc(screenOrientation) }}>Get Orientation </button>

                            </p>
                            <button className={"btn"}>Read more</button>
                        </div>
                    </div>
                </header>
            </div>

            <div className={"shadow one"}></div>
            <div className={"shadow two"}></div>
        </div>

        <div className={"links"}>
            <ul>
                <li>
                    <a href="#" style={{"--i": "0.05s"}}>Home</a>
                </li>
                <li>
                    <a href="#" style={{"--i": "0.1s"}}>Services</a>
                </li>
                <li>
                    <a href="#" style={{"--i": "0.15s"}}>Portfolio</a>
                </li>
                <li>
                    <a href="#" style={{"--i": "0.2s"}}>Testimonials</a>
                </li>
                <li>
                    <a href="#" style={{"--i": "0.25s"}}>About</a>
                </li>
                <li>
                    <a href="#" style={{"--i": "0.3s"}}>Contact</a>
                </li>
            </ul>
        </div>
    </div>
  );
}


/*      <main className={styles.main}>
        <button onClick={() => { dispatch(lightTheme()); }}>Light</button>
        <button onClick={() => { dispatch(darkTheme()); }}>Dark</button>
        <Link href={"/test"}>Test page</Link>
      </main>

      <footer className={styles.footer}>
      </footer>*/

export default Home
